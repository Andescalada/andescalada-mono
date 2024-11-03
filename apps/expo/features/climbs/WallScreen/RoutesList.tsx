import { AppRouter } from "@andescalada/api/src/routers/_app";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { A, Box, Text, TextButton } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import RouteItem from "@features/climbs/components/RouteItem";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { ListItemRef } from "@features/climbs/WallScreen/ListItem";
import useRouteOptions from "@features/climbs/WallScreen/useRouteOptions";
import useWallsById from "@hooks/offlineQueries/useWallsById";
import useGradeSystem from "@hooks/useGradeSystem";
import useOfflineMode from "@hooks/useOfflineMode";
import useOwnInfo from "@hooks/useOwnInfo";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { inferProcedureOutput } from "@trpc/server";
import {
  ComponentProps,
  createRef,
  FC,
  RefObject,
  useCallback,
  useMemo,
  useState,
} from "react";
import { FlatList, useWindowDimensions } from "react-native";

type Wall = inferProcedureOutput<AppRouter["walls"]["byId"]>;

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

type ParsedChildrenRoute = Wall["routes"][0]["Extension"][0] & {
  kindStringify: string;
  gradeStringify: string;
  routeRef: RefObject<ListItemRef>;
};

interface Props {
  ListHeaderComponent?: ComponentProps<typeof FlatList>["ListHeaderComponent"];
}

const RoutesList: FC<Props> = ({ ListHeaderComponent = null }) => {
  const route = useRoute<NavigationRoute>();
  const { zoneId, wallId } = route.params;

  const utils = trpc.useContext();

  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Wall>
    >();

  const { permission } = usePermissions({ zoneId });
  const { gradeLabel } = useGradeSystem();

  const {
    data: wall,
    refetch,
    isFetching,
    isLoading: isLoadingWall,
  } = useWallsById({ wallId, zoneId });

  const data = useMemo(() => {
    if (!wall) return null;
    const multiPitch = wall.MultiPitch.map((multiPitch) => ({
      ...multiPitch,
      id: multiPitch.id,
      position: multiPitch.position,
      routeRef: createRef<ListItemRef>(),
      kindStringify: `Multi largo, ${multiPitch.numberOfPitches} ${
        multiPitch.numberOfPitches > 1 || multiPitch.numberOfPitches === 0
          ? "largos"
          : "largo"
      } `,
      gradeStringify: gradeLabel(
        {
          grade: multiPitch.grade,
          project: multiPitch.project,
        },
        multiPitch.gradeRouteKind,
      ),
      isMultiPitch: true,
      ChildrenRoutes: [] as ParsedChildrenRoute[],
    }));
    const routesWithRef = wall?.routes.map((route) => ({
      ...route,
      isMultiPitch: false,
      kindStringify: routeKindLabel(route.kind).long,
      gradeStringify: gradeLabel(
        {
          grade: route.RouteGrade?.grade ?? null,
          project: !!route.RouteGrade?.project,
        },
        route.kind,
        route.RouteGrade?.originalGradeSystem,
      ),
      routeRef: createRef<ListItemRef>(),
      ChildrenRoutes: [...route.Extension, ...route.Variant].map(
        (childrenRoute) => ({
          ...childrenRoute,
          kindStringify: routeKindLabel(childrenRoute.kind).long,
          gradeStringify: gradeLabel(
            {
              grade: childrenRoute.RouteGrade?.grade ?? null,
              project: !!childrenRoute.RouteGrade?.project,
            },
            childrenRoute.kind,
            childrenRoute.RouteGrade?.originalGradeSystem,
          ),
          routeRef: createRef<ListItemRef>(),
        }),
      ),
    }));

    return {
      ...wall,
      routes: [...routesWithRef, ...multiPitch].sort(
        (a, b) => a.position - b.position,
      ),
    };
  }, [gradeLabel, wall]);

  const mainTopo = useMemo(() => data?.topos[0], [data?.topos]);

  const routesCount = useMemo(
    () => data?.routes.length || 0,
    [data?.routes.length],
  );

  const reset = useCallback(() => {
    data?.routes.forEach((route) => {
      route.routeRef?.current?.reset();
      route.ChildrenRoutes.forEach((childrenRoute) => {
        childrenRoute.routeRef?.current?.reset();
      });
    });
  }, [data?.routes]);

  const { onDeleteTry, onRouteOptions, onMultiPitchOptions, onPress } =
    useRouteOptions({
      topoId: mainTopo?.id,
      wallId,
      reset,
    });

  const refresh = useRefresh(() => {
    refetch();
    utils.topos.byId.invalidate({
      topoId: mainTopo?.id,
      zoneId,
    });
  }, isFetching);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setTouchRouteId] = useState<string | null>(null);
  const { data: user } = useOwnInfo();
  const { isOfflineMode } = useOfflineMode();

  const screen = useWindowDimensions();

  if (isLoadingWall) return null;

  return (
    <Box flex={1}>
      <FlatList
        refreshControl={refresh}
        onScrollBeginDrag={reset}
        showsVerticalScrollIndicator={false}
        data={data?.routes}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={() => (
          <Box
            width={screen.width}
            flex={1}
            justifyContent="center"
            alignItems="center"
            marginTop="xl"
          >
            <Text variant="h3">Sin rutas</Text>
            {permission.has("Create") && (
              <TextButton
                variant="info"
                onPress={() => {
                  navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
                    zoneId,
                    wallId,
                  });
                }}
              >
                Agregar ruta
              </TextButton>
            )}
          </Box>
        )}
        renderItem={({ item, index }) => {
          const maxIndex = item.ChildrenRoutes.length - 1;
          return (
            <A.Box
              key={item.id}
              marginBottom={index === routesCount - 1 ? "xl" : "none"}
              flex={1}
              marginVertical="s"
              paddingHorizontal="m"
            >
              <RouteItem
                title={item.name}
                grade={item.gradeStringify}
                position={item.position}
                kind={item.kindStringify}
                ref={item.routeRef}
                allowEdit={
                  (permission?.has("Update") || item.Author.id === user?.id) &&
                  !isOfflineMode
                }
                onPress={() => {
                  if (item.isMultiPitch) {
                    navigation.navigate(ClimbsNavigationRoutes.MultiPitch, {
                      multiPitchId: item.id,
                      multiPitchName: item.name,
                      wallId,
                      zoneId,
                    });
                    return;
                  }
                  onPress({ routeId: item.id, zoneId, routeName: item.name });
                }}
                onTouch={() => {
                  setTouchRouteId((prev) => {
                    if (prev !== item.id) {
                      reset();
                    }
                    return item.id;
                  });
                  if (item.isMultiPitch) {
                    utils.multiPitch.byId.prefetch({
                      multiPitchId: item.id,
                      zoneId,
                    });
                    return;
                  }
                  utils.routes.byId.prefetch(item.id);
                }}
                index={index}
                onDelete={() => {
                  onDeleteTry({
                    id: item.id,
                    zoneId,
                    isMultiPitch: item.isMultiPitch,
                  });
                }}
                onOptions={() => {
                  item.routeRef.current?.reset();
                  if (item.isMultiPitch) {
                    onMultiPitchOptions({
                      id: item.id,
                      zoneId,
                      name: item.name,
                    });
                    return;
                  }
                  onRouteOptions({ routeId: item.id, zoneId });
                }}
              />

              {item.ChildrenRoutes.map((childrenRoute, childrenRouteIndex) => (
                <RouteItem
                  title={childrenRoute.name}
                  kind={childrenRoute.kindStringify}
                  grade={childrenRoute.gradeStringify}
                  onPress={() => {
                    onPress({
                      routeId: childrenRoute.id,
                      zoneId,
                      routeName: childrenRoute.name,
                    });
                  }}
                  allowEdit={
                    (permission?.has("Update") ||
                      childrenRoute.Author.id === user?.id) &&
                    !isOfflineMode
                  }
                  onDelete={() => {
                    onDeleteTry({
                      id: childrenRoute.id,
                      zoneId,
                      isExtension: true,
                    });
                  }}
                  onOptions={() => {
                    onRouteOptions({
                      routeId: childrenRoute.id,
                      zoneId,
                      isChildrenRoute: true,
                    });
                  }}
                  key={childrenRoute.id}
                  index={index + childrenRouteIndex}
                  variant="plain"
                  containerProps={{
                    width: "90%",
                    alignSelf: "center",
                  }}
                  borderLeftWidth={3}
                  borderRightWidth={3}
                  borderColor="grayscale.900"
                  borderTopEndRadius={0}
                  borderTopLeftRadius={0}
                  borderBottomLeftRadius={
                    childrenRouteIndex === maxIndex ? 5 : 0
                  }
                  borderBottomRightRadius={
                    childrenRouteIndex === maxIndex ? 5 : 0
                  }
                  borderBottomWidth={childrenRouteIndex === maxIndex ? 3 : 1}
                />
              ))}
            </A.Box>
          );
        }}
      />
    </Box>
  );
};

export default RoutesList;
