import { SkiaRouteRef } from "@andescalada/climbs-drawer/SkiaRoutePathDrawer/SkiaRoutePathDrawer";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import type { Route, RoutePath, Topo, Wall } from "@prisma/client";
import { useValue } from "@shopify/react-native-skia";
import { useRef, useState } from "react";

interface SelectedRoute {
  id: Route["id"];
  label: string;
  pathId?: RoutePath["id"];
  path?: RoutePath["path"];
}

interface Args {
  routeId: Route["id"];
  topoId: Topo["id"];
  wallId: Wall["id"];
  position: number;
}

const useRouteDrawer = ({ routeId, position, topoId, wallId }: Args) => {
  const { mutate, isLoading } = trpc.routes.updateOrCreatePath.useMutation();

  const utils = trpc.useContext();

  const { data } = trpc.walls.byId.useQuery({ wallId });

  const [route, setRoute] = useState<SelectedRoute>({
    id: routeId,
    label: position.toString(),
  });

  const [canSave, setCanSave] = useState(false);

  const routeRef = useRef<SkiaRouteRef>(null);

  const rootNavigation = useRootNavigation();

  const onFinishOrSave = () => {
    if (!canSave) {
      routeRef?.current?.finishRoute();

      setRoute((prev) => ({
        ...prev,
        id: routeId,
        path: routeRef?.current?.pointsToString(),
      }));
      setCanSave(true);
      return;
    }
    if (route.path && data) {
      if (route.path.length <= 1) {
        rootNavigation.navigate(RootNavigationRoutes.Climbs, {
          screen: ClimbsNavigationRoutes.Wall,
          params: {
            wallId,
            sectorId: data.sectorId,
            wallName: data.name,
            zoneId: data.Sector.zoneId,
          },
        });
        return;
      }
      mutate(
        {
          path: route.path,
          routeId: route.id,
          topoId,
          routePathId: route.pathId,
        },
        {
          onSuccess: () => {
            utils.topos.byId.invalidate({ topoId });
            setTimeout(
              () =>
                rootNavigation.navigate(RootNavigationRoutes.Climbs, {
                  screen: ClimbsNavigationRoutes.Wall,
                  params: {
                    wallId,
                    wallName: data?.name || "",
                    sectorId: data?.sectorId || "",
                    zoneId: data?.Sector.zoneId || "",
                  },
                }),
              500,
            );
          },
        },
      );
    }
  };

  const coords = useValue({ x: 0, y: 0 });

  return {
    canSave,
    setCanSave,
    coords,
    isLoading,
    onFinishOrSave,
    route,
    routeRef,
  };
};

export default useRouteDrawer;
