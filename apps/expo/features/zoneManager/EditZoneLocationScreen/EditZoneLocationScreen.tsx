import { BackButton, Box, Button, Text, useMapType } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { images } from "@assets/images";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import MapLocationSelector from "@features/zoneManager/components/SelectLocation";
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
    <MapLocationSelector
      defaultValues={{
        latitude: Number(latitude) || location?.coords.latitude || LATITUDE,
        longitude: Number(longitude) || location?.coords.longitude || LONGITUDE,
      }}
      onChange={(coordinates) => {
        setRegion(coordinates);
      }}
    >
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
          padding="m"
          title="Continuar"
          disabled={!region}
          onPress={handleContinue}
          isLoading={editZone.isLoading}
        />
      </Box>
    </MapLocationSelector>
  );
};

export default EditZoneLocationScreen;
