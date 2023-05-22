import {
  ActivityIndicator,
  BackButton,
  Box,
  Image,
  MapTypeToolbar,
  Screen,
  Text,
  TextButton,
  useMapType,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { images } from "@assets/images";
import {
  ZoneLocationRoutes,
  ZoneLocationScreenProps,
} from "@features/zoneLocation/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import Mapbox from "@rnmapbox/maps";
import Env from "@utils/env";
import { FC, useCallback, useRef, useState } from "react";
import { Dimensions } from "react-native";

Mapbox.setAccessToken(Env.MAPBOX_ACCESS_TOKEN);

type Props = ZoneLocationScreenProps<ZoneLocationRoutes.ZoneMap>;

const ARROW_SIZE = 10;

const ZoneMapScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const { data, isLoading } = trpc.zones.location.useQuery({ zoneId });

  const theme = useAppTheme();

  const rootNavigation = useRootNavigation();

  const mapTypeProps = useMapType();

  const { permission } = usePermissions({ zoneId });

  const [isPointerSelected, setIsPointerSelected] = useState(true);

  const pointAnnotation = useRef<Mapbox.PointAnnotation>(null);

  const onPointSelected = useCallback(() => {
    setIsPointerSelected((prev) => !prev);
    pointAnnotation.current?.refresh();
  }, []);

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Screen>
    );

  if (!data?.Location?.latitude || !data?.Location?.longitude)
    return (
      <Screen justifyContent="center" alignItems="center">
        <BackButton.Transparent onPress={navigation.goBack} />
        <Text variant="p3R">No tenemos la ubicación de esta zona aún ☹️</Text>
        {permission?.has("EditZoneInfo") && (
          <TextButton
            variant="info"
            marginTop="m"
            onPress={() => {
              rootNavigation.replace(RootNavigationRoutes.ZoneManager, {
                screen: ZoneManagerRoutes.SelectZoneLocation,
                params: { zoneId, zoneName, skipOnboarding: true },
              });
            }}
          >
            Agregar ubicación
          </TextButton>
        )}
      </Screen>
    );

  return (
    <Screen safeAreaDisabled>
      <Mapbox.MapView
        styleURL={
          mapTypeProps.mapType === "satellite"
            ? Mapbox.StyleURL.SatelliteStreet
            : Mapbox.StyleURL.Street
        }
        style={{ flex: 1 }}
        logoEnabled={false}
        scaleBarPosition={{ bottom: 8, left: 10 }}
        compassEnabled
        attributionEnabled={false}
        compassPosition={{ top: 110, right: 16 }}
      >
        <Mapbox.Camera
          zoomLevel={14}
          animationMode="none"
          defaultSettings={{
            zoomLevel: 10,
            centerCoordinate: [
              Number(data?.Location?.longitude),
              Number(data?.Location?.latitude),
            ],
          }}
        />

        <Mapbox.PointAnnotation
          id="main-marker"
          coordinate={[
            Number(data?.Location?.longitude),
            Number(data?.Location?.latitude),
          ]}
          onSelected={onPointSelected}
          ref={pointAnnotation}
          anchor={{ x: 0.5, y: 1 }}
        >
          <Box justifyContent="center" alignItems="center">
            <Box
              bg="brand.primaryA"
              p="s"
              borderRadius={16}
              mb="m"
              opacity={isPointerSelected ? 1 : 0}
            >
              <Text>{data?.name}</Text>
              <Box
                position="absolute"
                bottom={-ARROW_SIZE}
                left={"50%"}
                alignItems="center"
                borderLeftWidth={ARROW_SIZE}
                borderLeftColor="transparent"
                borderStyle="solid"
                borderRightWidth={ARROW_SIZE}
                borderRightColor="transparent"
                borderTopColor="brand.primaryA"
                borderTopWidth={ARROW_SIZE}
                style={{
                  transform: [
                    { translateX: -(ARROW_SIZE - theme.spacing.s / 2) / 2 },
                  ],
                }}
              />
            </Box>
            <Image
              source={images.marker.file}
              onLoad={() => pointAnnotation.current?.refresh()}
            />
          </Box>
        </Mapbox.PointAnnotation>
      </Mapbox.MapView>
      <BackButton.Transparent
        onPress={navigation.goBack}
        iconProps={{ color: mapTypeProps.mapTypeIconsColor }}
      />
      <MapTypeToolbar {...mapTypeProps} />
    </Screen>
  );
};

export default ZoneMapScreen;
