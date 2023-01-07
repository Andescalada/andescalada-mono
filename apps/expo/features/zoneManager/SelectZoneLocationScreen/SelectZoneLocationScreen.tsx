import { MapView } from "@andescalada/maps";
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
import { FC, useEffect, useRef, useState } from "react";
import { Dimensions, Image } from "react-native";
import MapRefType, { Details, Region } from "react-native-maps";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.SelectZoneLocation>;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4555;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SelectZoneLocationScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, skipOnboarding, zoneName },
  },
}) => {
  const { location } = useLocation();
  const mapRef = useRef<MapRefType | null>(null);

  const [region, setRegion] = useState<Region>();

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

  useEffect(() => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  }, [location]);

  const onRegionChangeComplete = (region: Region, details: Details) => {
    if (details.isGesture) {
      setRegion(region);
    }
  };

  return (
    <Screen safeAreaDisabled justifyContent={"center"} alignItems="center">
      <MapView
        mapType={mapTypeProps.mapType}
        ref={mapRef}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <Box
        position="absolute"
        bottom="50%"
        left="50%"
        height={images.marker.height / 2}
        width={images.marker.width / 2}
      >
        <Image
          source={images.marker.file}
          style={{
            height: images.marker.height / 2,
            width: images.marker.width / 2,
            marginLeft: -images.marker.width / 4,
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
