import { AppRouter } from "@andescalada/api/src/routers/_app";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { A, ScrollView, Text, TextButton } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import RouteItem from "@features/climbs/components/RouteItem";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { ListItemRef } from "@features/climbs/WallScreen/ListItem";
import useRouteOptions from "@features/climbs/WallScreen/useRouteOptions";
import useGradeSystem from "@hooks/useGradeSystem";
import useOfflineMode from "@hooks/useOfflineMode";
import useOwnInfo from "@hooks/useOwnInfo";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { inferProcedureOutput } from "@trpc/server";
import {
  createRef,
  FC,
  RefObject,
  useCallback,
  useMemo,
  useState,
} from "react";

type Wall = inferProcedureOutput<AppRouter["walls"]["byId"]>;

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

type ParsedExtension = Wall["routes"][0]["Extension"][0] & {
  kindStringify: string;
  gradeStringify: string;
  routeRef: RefObject<ListItemRef>;
};
const RoutesList: FC = () => {
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
    data,
    refetch,
    isFetching,
    isLoading: isLoadingWall,
  } = trpc.walls.byId.useQuery(
    { wallId, zoneId },
    {
      select: useCallback(
        (wall: Wall) => {
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
            Extension: [] as ParsedExtension[],
          }));
          const routesWithRef = wall.routes.map((route) => ({
            ...route,
            isMultiPitch: false,
            kindStringify: routeKindLabel(route.kind).long,
            gradeStringify: gradeLabel(
              {
                grade: route.RouteGrade?.grade ?? null,
                project: !!route.RouteGrade?.project,
              },
              route.kind,
            ),
            routeRef: createRef<ListItemRef>(),
            Extension: route.Extension.map((extension) => ({
              ...extension,
              kindStringify: routeKindLabel(extension.kind).long,
              gradeStringify: gradeLabel(
                {
                  grade: extension.RouteGrade?.grade ?? null,
                  project: !!extension.RouteGrade?.project,
                },
                extension.kind,
              ),
              routeRef: createRef<ListItemRef>(),
            })),
          }));
          return {
            ...wall,
            routes: [...routesWithRef, ...multiPitch].sort(
              (a, b) => a.position - b.position,
            ),
          };
        },
        [gradeLabel],
      ),
    },
  );

  const mainTopo = useMemo(() => data?.topos[0], [data?.topos]);

  const routesCount = useMemo(
    () => data?.routes.length || 0,
    [data?.routes.length],
  );

  const reset = useCallback(() => {
    data?.routes.forEach((route) => {
      route.routeRef?.current?.reset();
      route.Extension.forEach((extension) => {
        extension.routeRef?.current?.reset();
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

  if (isLoadingWall) return null;
  if (!data?.routes || routesCount === 0)
    return (
      <ScrollView
        refreshControl={refresh}
        backgroundColor="background"
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
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
      </ScrollView>
    );

  return (
    <ScrollView.Gesture
      flex={1}
      onScrollBeginDrag={reset}
      refreshControl={refresh}
      paddingHorizontal="m"
      paddingTop="m"
      borderTopLeftRadius={10}
      borderTopRightRadius={10}
      backgroundColor="background"
    >
      {data?.routes.map((item, index) => {
        const maxIndex = item.Extension.length - 1;
        return (
          <A.Box
            key={item.id}
            marginBottom={index === routesCount - 1 ? "xl" : "none"}
            flex={1}
            marginVertical="s"
          >
            <RouteItem
              title={item.name}
              grade={item.gradeStringify}
              position={item.position}
              kind={item.kindStringify}
              ref={item.routeRef}
              allowEdit={
                (permission?.has("Update") ||
                  item.Author.email === user?.email) &&
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
                onPress({ routeId: item.id, zoneId, topoId: mainTopo?.id });
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
                  onMultiPitchOptions({ id: item.id, zoneId, name: item.name });
                  return;
                }
                onRouteOptions({ routeId: item.id, zoneId });
              }}
            />
            {item.Extension.map((extension, extensionIndex) => (
              <RouteItem
                title={extension.name}
                kind={extension.kindStringify}
                grade={extension.gradeStringify}
                onPress={() => {
                  onPress({
                    routeId: extension.id,
                    zoneId,
                    topoId: mainTopo?.id,
                  });
                }}
                allowEdit={
                  (permission?.has("Update") ||
                    extension.Author.email === user?.email) &&
                  !isOfflineMode
                }
                onDelete={() => {
                  onDeleteTry({
                    id: extension.id,
                    zoneId,
                    isExtension: true,
                  });
                }}
                onOptions={() => {
                  onRouteOptions({ routeId: extension.id, zoneId });
                }}
                key={extension.id}
                index={index + extensionIndex}
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
                borderBottomLeftRadius={extensionIndex === maxIndex ? 5 : 0}
                borderBottomRightRadius={extensionIndex === maxIndex ? 5 : 0}
                borderBottomWidth={extensionIndex === maxIndex ? 3 : 1}
              />
            ))}
          </A.Box>
        );
      })}
    </ScrollView.Gesture>
  );
};

export default RoutesList;
