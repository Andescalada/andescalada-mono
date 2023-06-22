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

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.AddOrEditSectorLocation>;

const SANTIAGO_LAT_LONG = {
  latitude: -33.4372,
  longitude: -70.6506,
};

const AddOrEditSectorLocationScreen: FC<Props> = ({
  route: {
    params: { zoneId, sectorId, sectorName, latitude, longitude },
  },
}) => {
  const { location } = useLocation();

  const { data: zoneData } = trpc.zones.allSectors.useQuery({ zoneId });

  const zoneLocation = zoneData?.Location;

  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const rootNavigation = useRootNavigation();

  const mapTypeProps = useMapType();

  const utils = trpc.useContext();

  const editSector = trpc.sectors.edit.useMutation({
    onSuccess: () => {
      utils.zones.allSectors.invalidate({ zoneId });
      utils.zones.location.invalidate({ zoneId });
      rootNavigation.navigate(RootNavigationRoutes.Climbs, {
        screen: ClimbsNavigationRoutes.Sector,
        params: { zoneId, sectorId, sectorName },
      });
    },
  });

  const handleContinue = () => {
    if (region) {
      editSector.mutate({
        zoneId,
        sectorId,
        coordinates: { latitude: region.latitude, longitude: region.longitude },
      });
    }
  };

  console.log({
    latitude:
      Number(latitude) ??
      Number(zoneLocation?.latitude) ??
      location?.coords.latitude,
    longitude:
      Number(longitude) ??
      Number(zoneLocation?.longitude) ??
      location?.coords.longitude,
  });

  const sectorLatitude = latitude ? Number(latitude) : undefined;
  const sectorLongitude = longitude ? Number(longitude) : undefined;

  const zoneLatitude = zoneLocation?.latitude
    ? Number(zoneLocation?.latitude)
    : undefined;
  const zoneLongitude = zoneLocation?.longitude
    ? Number(zoneLocation?.longitude)
    : undefined;

  return (
    <MapLocationSelector
      defaultValues={{
        latitude:
          sectorLatitude ??
          zoneLatitude ??
          location?.coords.latitude ??
          SANTIAGO_LAT_LONG.latitude,
        longitude:
          sectorLongitude ??
          zoneLongitude ??
          location?.coords.longitude ??
          SANTIAGO_LAT_LONG.longitude,
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
            {`Selecciona la ubicación de ${sectorName}`}
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
          isLoading={editSector.isLoading}
        />
      </Box>
    </MapLocationSelector>
  );
};

export default AddOrEditSectorLocationScreen;
