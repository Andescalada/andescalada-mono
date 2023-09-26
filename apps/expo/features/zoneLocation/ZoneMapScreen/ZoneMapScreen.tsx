import { isDefined } from "@andescalada/api/src/utils/filterGuards";
import Mapbox from "@andescalada/maps/mapbox";
import {
  A,
  ActivityIndicator,
  BackButton,
  Box,
  MapTypeToolbar,
  Screen,
  Text,
  TextButton,
  useMapType,
} from "@andescalada/ui";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import {
  ZoneLocationRoutes,
  ZoneLocationScreenProps,
} from "@features/zoneLocation/Navigation/types";
import Pin from "@features/zoneManager/components/Pin";
import { ZoneManagerRoutes } from "@features/zoneManager/Navigation/types";
import useZonesAllSectors from "@hooks/offlineQueries/useZonesAllSectors";
import useOfflineMode from "@hooks/useOfflineMode";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { UserLocation } from "@rnmapbox/maps";
import Env from "@utils/env";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

Mapbox.setAccessToken(Env.MAPBOX_ACCESS_TOKEN);

type Props = ZoneLocationScreenProps<ZoneLocationRoutes.ZoneMap>;

const ZoneMapScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId, sectorId },
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

  const [expandZoneCallout, setExpandZoneCallout] = useState(!sectorId);

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

  const onPinSelected = useCallback(
    ({ id, disabled }: { id: string; disabled: boolean }) => {
      if (disabled) return;
      const selectedSector = sectors?.find((sector) => sector.id === id);
      setSelectedPin((prev) => {
        if (prev?.id === id) return undefined;
        return selectedSector;
      });
      return selectedSector;
    },
    [sectors],
  );

  const camera = useRef<Mapbox.Camera>(null);

  useEffect(() => {
    if (sectorId) {
      onPinSelected({ id: sectorId, disabled: false });
    }
  }, [onPinSelected, sectorId, camera]);

  useEffect(() => {
    if (!selectedPin) return;

    camera.current?.flyTo(
      [Number(selectedPin.longitude), Number(selectedPin.latitude)],
      500,
    );
  }, [selectedPin]);

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Screen>
    );

  if (
    data?.name &&
    (!data?.Location?.latitude || !data?.Location?.longitude) &&
    camera &&
    sectorId &&
    selectedPin
  )
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
                params: { zoneId, zoneName: data.name, skipOnboarding: true },
              });
            }}
          >
            Agregar ubicación
          </TextButton>
        )}
      </Screen>
    );

  if (data && data.Location && sectors)
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
          <UserLocation
            androidRenderMode={"gps"}
            showsUserHeadingIndicator={true}
          />
          <Mapbox.Camera
            ref={camera}
            zoomLevel={sectorId ? 18 : 14}
            animationMode="flyTo"
            triggerKey={selectedPin?.id}
            centerCoordinate={
              sectorId && selectedPin
                ? [Number(selectedPin.longitude), Number(selectedPin.latitude)]
                : [
                    Number(data?.Location?.longitude),
                    Number(data?.Location?.latitude),
                  ]
            }
            defaultSettings={{
              zoomLevel: 13,
              centerCoordinate:
                sectorId && selectedPin
                  ? [
                      Number(selectedPin.longitude),
                      Number(selectedPin.latitude),
                    ]
                  : [
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
            isSelected={expandZoneCallout}
            onPinSelected={() => {
              setExpandZoneCallout((prev) => !prev);
            }}
          />
          {sectors?.map((sector) => (
            <Pin
              key={sector.id}
              id={sector.id}
              isSelected={selectedPin?.id === sector.id}
              calloutText={sector.name}
              latitude={sector.latitude}
              longitude={sector.longitude}
              variant="orange"
              onPinSelected={({ id }) =>
                onPinSelected({ id, disabled: !!sectorId })
              }
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
