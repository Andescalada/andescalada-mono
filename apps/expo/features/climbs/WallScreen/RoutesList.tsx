import { AppRouter } from "@andescalada/api/src/routers/_app";
import { A, ScrollView, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { ListItemRef } from "@features/climbs/WallScreen/ListItem";
import RouteItem from "@features/climbs/WallScreen/RouteItem";
import useRefresh from "@hooks/useRefresh";
import { useRoute } from "@react-navigation/native";
import type { inferProcedureOutput } from "@trpc/server";
import { createRef, FC, useCallback, useMemo } from "react";

type Wall = inferProcedureOutput<AppRouter["walls"]["byId"]>;

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

const RoutesList: FC = () => {
  const route = useRoute<NavigationRoute>();
  const { zoneId, wallId } = route.params;

  const {
    data,
    refetch,
    isFetching,
    isLoading: isLoadingWall,
  } = trpc.walls.byId.useQuery(
    { wallId },
    {
      select: useCallback((wall: Wall) => {
        const routesWithRef = wall.routes.map((route) => ({
          ...route,
          routeRef: createRef<ListItemRef>(),
          Extension: route.Extension.map((extension) => ({
            ...extension,
            routeRef: createRef<ListItemRef>(),
          })),
        }));
        return {
          ...wall,
          routes: routesWithRef,
        };
      }, []),
    },
  );

  const refresh = useRefresh(refetch, isFetching);

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

  if (isLoadingWall) return null;
  if (!data?.routes || routesCount === 0)
    return (
      <ScrollView
        refreshControl={refresh}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text variant="h3">Sin rutas</Text>
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
              item={item}
              zoneId={zoneId}
              topoId={mainTopo?.id}
              index={index}
              resetOthers={reset}
            />
            {item.Extension.map((extension, extensionIndex) => (
              <RouteItem
                hidePosition
                isExtension
                key={extension.id}
                item={extension}
                zoneId={zoneId}
                topoId={mainTopo?.id}
                index={index + extensionIndex}
                resetOthers={reset}
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
