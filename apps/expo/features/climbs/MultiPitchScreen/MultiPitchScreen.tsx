import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import {
  ActivityIndicator,
  Box,
  Header,
  Screen,
  ScrollView,
  Text,
  TextButton,
} from "@andescalada/ui";
import RouteItem from "@features/climbs/components/RouteItem";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { MultiPitchManagerRoutes } from "@features/multiPitchManager/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useMultiPitchById from "@hooks/offlineQueries/useMultiPitchById";
import useWallsById from "@hooks/offlineQueries/useWallsById";
import useGradeSystem from "@hooks/useGradeSystem";
import useOfflineMode from "@hooks/useOfflineMode";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC, useCallback } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.MultiPitch>;

const MultiPitchScreen: FC<Props> = ({
  navigation,
  route: {
    params: { multiPitchName, wallId, zoneId, multiPitchId },
  },
}) => {
  const { isOfflineMode } = useOfflineMode();

  const { data: wallData, isLoading: isLoadingWall } = useWallsById({
    wallId,
    zoneId,
  });

  const { data, isLoading } = useMultiPitchById({
    multiPitchId,
    zoneId,
  });

  const { gradeLabel } = useGradeSystem();

  const mainTopo = wallData?.topos[0];

  const rootNavigation = useRootNavigation();

  const { permission } = usePermissions({ zoneId });

  const onPressHandler = useCallback(
    ({
      routeId,
      zoneId,
      topoId,
    }: {
      topoId?: string;
      routeId: string;
      zoneId: string;
    }) => {
      if (!topoId) return;
      rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
        screen: RoutesManagerNavigationRoutes.TopoViewer,
        params: {
          topoId,
          routeId,
          zoneId,
        },
      });
    },
    [rootNavigation],
  );

  const onOptions = ({
    id,
    name,
    zoneId,
  }: {
    id: string;
    zoneId: string;
    name: string;
  }) => {
    rootNavigation.navigate(RootNavigationRoutes.MultiPitchManager, {
      screen: MultiPitchManagerRoutes.MultiPitchManager,
      params: {
        multiPitchId: id,
        multiPitchName: name,
        zoneId,
        topoId: mainTopo?.id,
        wallId,
      },
    });
  };

  if (isLoadingWall || isLoading)
    return (
      <Screen padding="m">
        <Header
          title={multiPitchName}
          onGoBack={navigation.goBack}
          showOptions={false}
        />
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Screen>
    );

  return (
    <Screen>
      <Header
        title={multiPitchName}
        onGoBack={navigation.goBack}
        showOptions={permission.has("Create") && !isOfflineMode}
        onOptions={() => {
          onOptions({
            id: multiPitchId,
            name: multiPitchName,
            zoneId,
          });
        }}
        padding="m"
      />
      <ScrollView flex={1} padding="m">
        <Text variant="p1R" marginBottom="m">
          {data?.description}
        </Text>

        {!!data &&
          data?.Pitches.length > 0 &&
          data?.Pitches.map((pitch, index) => (
            <RouteItem
              key={pitch.id}
              grade={gradeLabel(
                {
                  grade: pitch.Route.RouteGrade?.grade || null,
                  project: !!pitch.Route.RouteGrade?.project,
                },
                pitch.Route.kind,
              )}
              kind={routeKindLabel(pitch.Route.kind).long}
              title={`Largo ${pitch.number}`}
              index={index}
              marginBottom="s"
              onPress={() => {
                onPressHandler({
                  routeId: pitch.Route.id,
                  zoneId,
                  topoId: mainTopo?.id,
                });
              }}
            />
          ))}
        {data?.Pitches.length === 0 && (
          <Box
            marginTop="xxxl"
            padding="m"
            justifyContent="center"
            alignItems="center"
          >
            <Text variant="p2R">Sin información 🫤</Text>
            {permission.has("Create") && (
              <TextButton
                variant="info"
                onPress={() =>
                  rootNavigation.navigate(
                    RootNavigationRoutes.MultiPitchManager,
                    {
                      screen: MultiPitchManagerRoutes.AddPitch,
                      params: {
                        multiPitchId,
                        multiPitchName,
                        zoneId,
                        topoId: mainTopo?.id,
                        wallId,
                        previousPitchKind: undefined,
                      },
                    },
                  )
                }
              >
                Agregar largo
              </TextButton>
            )}
          </Box>
        )}
      </ScrollView>
    </Screen>
  );
};

export default MultiPitchScreen;
