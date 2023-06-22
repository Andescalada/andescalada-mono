import { isDefined } from "@andescalada/api/src/utils/filterGuards";
import Mapbox from "@andescalada/maps/mapbox";
import {
  A,
  ActivityIndicator,
  BackButton,
  Box,
  Colors,
  MapTypeToolbar,
  Screen,
  Text,
  TextButton,
  useMapType,
} from "@andescalada/ui";
import { images } from "@assets/images";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import {
  ZoneLocationRoutes,
  ZoneLocationScreenProps,
} from "@features/zoneLocation/Navigation/types";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import useZonesAllSectors from "@hooks/offlineQueries/useZonesAllSectors";
import { useAppTheme } from "@hooks/useAppTheme";
import useOfflineMode from "@hooks/useOfflineMode";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import Env from "@utils/env";
import {
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image } from "react-native";

Mapbox.setAccessToken(Env.MAPBOX_ACCESS_TOKEN);

type Props = ZoneLocationScreenProps<ZoneLocationRoutes.ZoneMap>;

const ARROW_SIZE = 10;

const ZoneMapScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, zoneName },
  },
}) => {
  const { data, isLoading } = useZonesAllSectors({ zoneId });

  const { isOfflineMode } = useOfflineMode();

  const rootNavigation = useRootNavigation();

  const mapTypeProps = useMapType();

  const { permission } = usePermissions({ zoneId });

  const [selectedPin, setSelectedPin] = useState<
    | {
        id: string;
        latitude: number;
        longitude: number;
        name: string;
        count: {
          wall: number;
          routes: number;
        };
      }
    | undefined
  >(undefined);

  const onPinSelected: OnPinSelected = ({ id, isSelected }) => {
    const selectedSector = sectors?.find((sector) => sector.id === id);
    setSelectedPin((prev) => {
      if (prev?.id === id) return undefined;
      if (!isSelected) return prev;
      return selectedSector;
    });
  };

  const sectors = useMemo(
    () =>
      data?.sectors
        ?.map((sector) => {
          if (!sector?.Location) return undefined;
          const wall = sector?._count.walls;

          const routes = sector.walls.reduce(
            (acc, wall) => acc + wall._count.routes,
            0,
          );
          return {
            id: sector.id,
            latitude: Number(sector.Location.latitude),
            longitude: Number(sector.Location.longitude),
            name: sector.name,
            count: { wall, routes },
          };
        })
        .filter(isDefined),
    [data?.sectors],
  );

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

  if (sectors)
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
              zoomLevel: 13,
              centerCoordinate: [
                Number(data?.Location?.longitude),
                Number(data?.Location?.latitude),
              ],
            }}
          />
          <Pin
            id="zonePin"
            calloutText={data.name}
            latitude={Number(data.Location.latitude)}
            longitude={Number(data.Location.longitude)}
            startsOpen
            onPinSelected={onPinSelected}
          />
          {sectors?.map((sector) => (
            <Pin
              key={sector.id}
              id={sector.id}
              calloutText={sector.name}
              latitude={sector.latitude}
              longitude={sector.longitude}
              variant="orange"
              onPinSelected={onPinSelected}
            />
          ))}
        </Mapbox.MapView>
        <BackButton.Transparent
          onPress={navigation.goBack}
          iconProps={{ color: mapTypeProps.mapTypeIconsColor }}
        />
        {!isOfflineMode && <MapTypeToolbar {...mapTypeProps} />}
        {selectedPin && (
          <A.Pressable
            position="absolute"
            backgroundColor={"grayscale.transparent.50.black"}
            borderWidth={3}
            borderColor="listItemBackground"
            bottom="5%"
            marginHorizontal="m"
            padding="s"
            borderRadius={5}
            left={0}
            right={0}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            onPress={() => {
              rootNavigation.navigate(RootNavigationRoutes.Climbs, {
                screen: ClimbsNavigationRoutes.Sector,
                params: {
                  sectorId: selectedPin.id,
                  sectorName: selectedPin.name,
                  zoneId,
                },
              });
            }}
          >
            <Box>
              <Text variant="h3">{selectedPin.name}</Text>
              <Text variant="p2R" color="grayscale.200">
                {`${selectedPin.count.wall} ${
                  selectedPin.count.wall !== 1 ? "paredes" : "pared"
                } • ${selectedPin.count.routes} ${
                  selectedPin.count.routes !== 1 ? "rutas" : "ruta"
                }`}
              </Text>
            </Box>
          </A.Pressable>
        )}
      </Screen>
    );

  return null;
};

export default ZoneMapScreen;

type OnPinSelected = (params: {
  id: string;
  latitude: number;
  longitude: number;
  isSelected: boolean;
}) => void;

type PinProps = {
  latitude: number;
  longitude: number;
  calloutText: string;
  startsOpen?: boolean;
  variant?: "main" | "orange";
  onPinSelected?: OnPinSelected;
} & Omit<
  ComponentProps<typeof Mapbox.PointAnnotation>,
  "children" | "coordinate" | "onSelected"
>;

const Pin = ({
  latitude,
  longitude,
  calloutText,
  startsOpen = false,
  variant = "main",
  ...props
}: PinProps) => {
  const [isPointerSelected, setIsPointerSelected] = useState(startsOpen);

  const variantInfo = useMemo(() => {
    switch (variant) {
      case "main":
        return {
          image: images.marker.file,
          backgroundColor: "brand.primaryA" as Colors,
        };
      case "orange":
        return {
          image: images.markerOrange.file,
          backgroundColor: "grayscale.800" as Colors,
        };
    }
  }, [variant]);

  const theme = useAppTheme();

  useEffect(() => {
    pointAnnotation?.current?.refresh();
  }, []);

  const pointAnnotation = useRef<Mapbox.PointAnnotation>(null);

  const onPointSelected = useCallback(() => {
    setIsPointerSelected((prev) => !prev);
    pointAnnotation.current?.refresh();
  }, []);

  return (
    <Mapbox.PointAnnotation
      ref={pointAnnotation}
      anchor={{ x: 0.5, y: 1 }}
      coordinate={[longitude, latitude]}
      onSelected={() => {
        if (props.onPinSelected)
          props?.onPinSelected({
            id: props.id,
            latitude,
            longitude,
            isSelected: isPointerSelected,
          });
        onPointSelected();
      }}
      {...props}
    >
      <Box justifyContent="center" alignItems="center">
        <Box
          bg={variantInfo.backgroundColor}
          p="s"
          borderRadius={16}
          mb="m"
          opacity={isPointerSelected ? 1 : 0}
        >
          <Text>{calloutText}</Text>
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
            borderTopColor={variantInfo.backgroundColor}
            borderTopWidth={ARROW_SIZE}
            style={{
              transform: [
                { translateX: -(ARROW_SIZE - theme.spacing.s / 2) / 2 },
              ],
            }}
          />
        </Box>
        <Image
          source={variantInfo.image}
          onLoad={() => pointAnnotation.current?.refresh()}
        />
      </Box>
    </Mapbox.PointAnnotation>
  );
};
