import { isDefined } from "@andescalada/api/src/utils/filterGuards";
import { BackButton, Box, Button, Text, useMapType } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { images } from "@assets/images";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import MapLocationSelector from "@features/zoneManager/components/SelectLocation";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useLocation from "@hooks/useLocation";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC, useMemo, useState } from "react";
import { Image } from "react-native";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.AddOrEditSectorLocation>;

const SANTIAGO_LAT_LONG = {
  latitude: -33.4372,
  longitude: -70.6506,
};

const ARROW_SIZE = 10;

const CALLOUT_HEIGHT = 32;

const AddOrEditSectorLocationScreen: FC<Props> = ({
  route: {
    params: { zoneId, sectorId, sectorName, latitude, longitude },
  },
}) => {
  const { location } = useLocation();

  const { data: zoneData } = trpc.zones.location.useQuery({ zoneId });

  const zoneLocation = zoneData?.Location;

  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const rootNavigation = useRootNavigation();

  const theme = useAppTheme();

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

  const sectorLatitude = latitude ? Number(latitude) : undefined;
  const sectorLongitude = longitude ? Number(longitude) : undefined;

  const zoneLatitude = zoneLocation?.latitude
    ? Number(zoneLocation?.latitude)
    : undefined;
  const zoneLongitude = zoneLocation?.longitude
    ? Number(zoneLocation?.longitude)
    : undefined;

  const otherSectorsPin = useMemo(
    () =>
      zoneData?.sectors
        .filter((sector) => sector.id !== sectorId)
        .map((sector) =>
          sector.Location
            ? {
                longitude: Number(sector.Location?.longitude),
                latitude: Number(sector.Location?.latitude),

                id: sector.id,
                name: sector.name,
              }
            : undefined,
        )
        .filter(isDefined),
    [zoneData?.sectors, sectorId],
  );

  return (
    <MapLocationSelector
      sectorsPin={otherSectorsPin}
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
        height={images.marker.height + CALLOUT_HEIGHT + ARROW_SIZE}
        width={images.marker.width}
        justifyContent="center"
        alignItems="center"
      >
        <Box justifyContent="center" alignItems="center">
          <Box
            bg={"brand.primaryA"}
            height={CALLOUT_HEIGHT}
            width={100}
            borderRadius={16}
            mb="m"
            opacity={1}
            justifyContent="center"
            style={{ marginLeft: -images.marker.width }}
          >
            <Text ellipsizeMode="tail" numberOfLines={2} textAlign="center">
              {sectorName}
            </Text>
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
              borderTopColor={"brand.primaryA"}
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
            style={{
              height: images.marker.height,
              width: images.marker.width,
              marginLeft: -images.marker.width / 2,
            }}
          />
        </Box>
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
