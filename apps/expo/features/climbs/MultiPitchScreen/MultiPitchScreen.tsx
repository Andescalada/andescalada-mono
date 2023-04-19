import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import {
  A,
  ActivityIndicator,
  Box,
  Header,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import RouteItem from "@features/climbs/components/RouteItem";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { MultiPitchManagerRoutes } from "@features/multiPitchManager/Navigation/types";
import TopoViewer from "@features/routesManager/components/TopoViewer";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import { FC, useCallback } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.MultiPitch>;

const MultiPitchScreen: FC<Props> = ({
  navigation,
  route: {
    params: { multiPitchName, wallId, zoneId, multiPitchId },
  },
}) => {
  const { data: wallData, isLoading: isLoadingWall } = trpc.walls.byId.useQuery(
    {
      wallId,
      zoneId,
    },
  );

  const { data, isLoading } = trpc.multiPitch.byId.useQuery({
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
        showOptions={permission.has("Create")}
        onOptions={() => {
          onOptions({
            id: multiPitchId,
            name: multiPitchName,
            zoneId,
          });
        }}
        padding="m"
      />
      <Box flex={0.5}>
        {mainTopo?.image.publicId && (
          <A.Pressable
            flex={1}
            height={100}
            width={SCREEN_WIDTH}
            entering={FadeIn}
            exiting={FadeOut}
            justifyContent="center"
            alignItems={"center"}
            onPress={() => {
              rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
                screen: RoutesManagerNavigationRoutes.TopoViewer,
                params: {
                  topoId: mainTopo.id,
                  zoneId,
                },
              });
            }}
          >
            <TopoViewer
              topoId={mainTopo.id}
              zoneId={zoneId}
              center={false}
              disableGesture
              strokeWidth={Number(mainTopo.routeStrokeWidth)}
            />
          </A.Pressable>
        )}
        {!mainTopo?.image.publicId && (
          <A.Pressable
            flex={1}
            height={100}
            width={SCREEN_WIDTH}
            entering={FadeIn}
            exiting={FadeOut}
            justifyContent="center"
            alignItems={"center"}
          >
            <Text variant="p1R">Pared sin topo</Text>
          </A.Pressable>
        )}
      </Box>
      <ScrollView
        flex={1}
        overflow="hidden"
        backgroundColor="background"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
        padding="m"
      >
        <Text variant="p1R" marginBottom="m">
          {data?.description}
        </Text>
        {data?.Pitches.map((pitch, index) => (
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
      </ScrollView>
    </Screen>
  );
};

export default MultiPitchScreen;
