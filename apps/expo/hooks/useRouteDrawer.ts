import { SkiaRouteRef } from "@andescalada/climbs-drawer/SkiaRoutePathDrawer/SkiaRoutePathDrawer";
import {
  DEFAULT_POSITION,
  pointToVector,
} from "@andescalada/climbs-drawer/utils";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import type { Route, RoutePath, Topo, Wall, Zone } from "@prisma/client";
import { SkPoint, useValue } from "@shopify/react-native-skia";
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
  zoneId: Zone["id"];
  position: number;
  routeStrokeWidth: number;
  routePathId?: RoutePath["id"];
  pitchLabelPoint?: string;
  scale?: number;
  withLabel?: boolean;
}

const useRouteDrawer = ({
  routeId,
  position,
  topoId,
  wallId,
  zoneId,
  routePathId,
  routeStrokeWidth,
  pitchLabelPoint,
  scale,
  withLabel = false,
}: Args) => {
  const movement = useValue<SkPoint>(
    pointToVector(pitchLabelPoint, scale || 1),
  );

  const [disableMovement, setDisableMovement] = useState(true);
  const handleLabelMovement = () => {
    setDisableMovement((prev) => !prev);
  };

  const { mutate, isLoading } = trpc.routes.updateOrCreatePath.useMutation({
    onSuccess: () => {
      utils.topos.byId.invalidate({ topoId, zoneId });
      utils.walls.byId.invalidate({ wallId, zoneId });
      setTimeout(
        () =>
          data
            ? rootNavigation.navigate(RootNavigationRoutes.Climbs, {
                screen: ClimbsNavigationRoutes.Wall,
                params: {
                  wallId,
                  wallName: data.name,
                  sectorId: data.sectorId,
                  zoneId: data.Sector.zoneId,
                  sectorKind: data.Sector.sectorKind,
                },
              })
            : undefined,
        500,
      );
    },
  });

  const utils = trpc.useContext();

  const [showConfig, setShowConfig] = useState(false);

  const { data } = trpc.walls.byId.useQuery({ wallId, zoneId });

  const modifyStrokeWidth = trpc.topos.modifyStrokeWidth.useMutation({
    onSuccess: () => {
      utils.topos.byId.invalidate({ topoId, zoneId });
      utils.walls.byId.invalidate({ wallId, zoneId });
    },
  });

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
      if (withLabel) {
        movement.current = routeRef?.current?.getLabelPosition({
          toString: false,
        }) as SkPoint;
      }
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
            sectorKind: data.Sector.sectorKind,
          },
        });
        return;
      }
      const pitchLabelPoint =
        movement.current !== DEFAULT_POSITION
          ? `${movement.current.x},${movement.current.y}`
          : undefined;

      mutate({
        path: route.path,
        routeId: route.id,
        topoId,
        routePathId,
        pitchLabelPoint,
      });
      modifyStrokeWidth.mutate({
        zoneId,
        topoId,
        routeStrokeWidth,
      });
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
    showConfig,
    setShowConfig,
    movement,
    handleLabelMovement,
    disableMovement,
  };
};

export default useRouteDrawer;
