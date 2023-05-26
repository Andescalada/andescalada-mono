import Mapbox from "@andescalada/maps/mapbox";
import {
  BackButton,
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

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.EditZoneLocation>;

const LATITUDE = 37.78825;
const LONGITUDE = -122.4555;

const EditZoneLocationScreen: FC<Props> = ({
  route: {
    params: { zoneId, zoneName, latitude, longitude },
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
      utils.zones.allSectors.invalidate({ zoneId });
      utils.zones.location.invalidate({ zoneId });
      rootNavigation.navigate(RootNavigationRoutes.Climbs, {
        screen: ClimbsNavigationRoutes.Zone,
        params: { zoneId, zoneName },
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
          defaultSettings={{
            zoomLevel: 10,
            centerCoordinate: [
              Number(longitude) || location?.coords.longitude || LONGITUDE,
              Number(latitude) || location?.coords.latitude || LATITUDE,
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
        flex={1}
        flexDirection="row"
      >
        <BackButton.Transparent
          containerProps={{
            position: "relative",
            margin: "none",
            marginLeft: "none",
            top: 0,
            marginRight: "s",
          }}
          onPress={rootNavigation.goBack}
        />
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          height={100}
          padding="s"
          borderRadius={10}
          backgroundColor="transparentButtonBackground"
        >
          <Text variant="p1R" color={mapTypeProps.mapTypeIconsColor}>
            Modifica la ubicación de la zona de escalada
          </Text>
        </Box>
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

export default EditZoneLocationScreen;
