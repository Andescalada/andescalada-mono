import Mapbox from "@andescalada/maps/mapbox";
import {
  Box,
  Button,
  MapTypeToolbar,
  Screen,
  Text,
  useMapType,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { images } from "@assets/images";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import useLocation from "@hooks/useLocation";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC, useState } from "react";
import { Image } from "react-native";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.SelectZoneLocation>;

const LATITUDE = 37.78825;
const LONGITUDE = -122.4555;

const SelectZoneLocationScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, skipOnboarding, zoneName },
  },
}) => {
  const { location } = useLocation();

  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const rootNavigation = useRootNavigation();

  const mapTypeProps = useMapType();

  const utils = trpc.useContext();

  const editZone = trpc.zones.edit.useMutation({
    onSuccess: () => {
      if (skipOnboarding) {
        rootNavigation.replace(RootNavigationRoutes.Climbs, {
          screen: ClimbsNavigationRoutes.Zone,
          params: { zoneId, zoneName },
        });
        utils.zones.location.invalidate({ zoneId });
        return;
      }
      navigation.navigate(ZoneManagerRoutes.ZoneOnboarding, {
        zoneId,
        zoneName,
      });
    },
  });

  const handleContinue = () => {
    if (region) {
      editZone.mutate({
        zoneId,
        coordinates: { latitude: region.latitude, longitude: region.longitude },
      });
    }
  };

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
        compassPosition={{ top: 210, right: 16 }}
        onCameraChanged={({
          properties: { center },
          gestures: { isGestureActive },
        }) => {
          if (!isGestureActive) return;
          setRegion({ latitude: center[1], longitude: center[0] });
        }}
      >
        <Mapbox.Camera
          zoomLevel={14}
          animationMode="none"
          centerCoordinate={[
            location?.coords.longitude || LONGITUDE,
            location?.coords.latitude || LATITUDE,
          ]}
          defaultSettings={{
            zoomLevel: 10,
            centerCoordinate: [
              location?.coords.longitude || LONGITUDE,
              location?.coords.latitude || LATITUDE,
            ],
          }}
        />
      </Mapbox.MapView>
      <Box
        position="absolute"
        bottom="50%"
        left="50%"
        height={images.marker.height}
        width={images.marker.width}
      >
        <Image
          source={images.marker.file}
          style={{
            height: images.marker.height,
            width: images.marker.width,
            marginLeft: -images.marker.width / 2,
          }}
        />
      </Box>
      <Box
        position="absolute"
        top={50}
        left={0}
        right={0}
        margin="m"
        justifyContent="center"
        alignItems="center"
        height={100}
        borderRadius={10}
        backgroundColor="transparentButtonBackground"
      >
        <Text variant="p1R" color={mapTypeProps.mapTypeIconsColor}>
          Selecciona la ubicación de la zona de escalada
        </Text>
      </Box>

      <Box
        position="absolute"
        bottom={50}
        left={0}
        right={0}
        paddingHorizontal="xxl"
      >
        <Button
          variant={region ? "success" : "transparent"}
          title="Continuar"
          disabled={!region}
          onPress={handleContinue}
          isLoading={editZone.isLoading}
        />
      </Box>
      <MapTypeToolbar {...mapTypeProps} top={150} />
    </Screen>
  );
};

export default SelectZoneLocationScreen;
