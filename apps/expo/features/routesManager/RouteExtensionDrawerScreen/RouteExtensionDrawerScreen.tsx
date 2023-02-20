import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  SkiaRouteCanvas,
  SkiaRoutePath,
  SkiaRoutePathDrawer,
} from "@andescalada/climbs-drawer";
import { pathToArray } from "@andescalada/climbs-drawer/utils";
import { ActivityIndicator, BackButton, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import DrawingTools from "@features/routesManager/components/DrawingTools";
import Instructions from "@features/routesManager/components/Instructions";
import RoutePathDrawConfig from "@features/routesManager/components/RoutePathDrawConfig";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { useAppSelector } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import useRouteDrawer from "@hooks/useRouteDrawer";
import useTopoImage from "@hooks/useTopoImage";
import { inferRouterOutputs } from "@trpc/server";
import { FC, useCallback, useMemo } from "react";

type Topo = inferRouterOutputs<AppRouter>["topos"]["byId"];

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.RouteExtensionDrawer>;

const DrawRoute: FC<Props> = ({
  route: {
    params: { wallId, route: routeParams, topoId, zoneId },
  },
  navigation,
}) => {
  const theme = useAppTheme();

  const extendedRoute =
    !!routeParams.extendedRouteId &&
    trpc.routes.byId.useQuery(routeParams.extendedRouteId);

  const extendedRouteStart = useMemo(() => {
    if (!extendedRoute) return undefined;

    const prevPath = extendedRoute?.data?.Wall.topos.find(
      (t) => t.id === topoId,
    )?.RoutePath[0].path;

    if (prevPath) {
      const arrayPath = pathToArray(prevPath).pop();
      if (!arrayPath) return undefined;
      return `${arrayPath[0]},${arrayPath[1]}`;
    }
    return undefined;
  }, [extendedRoute, topoId]);

  const { routeStrokeWidth, showRoutes } = useAppSelector(
    (state) => state.localConfig,
  );

  const { data: topos } = trpc.topos.byId.useQuery(
    { topoId, zoneId },
    {
      select: useCallback(
        (topo: Topo) => {
          const otherRoutes = topo?.RoutePath.filter(
            (r) => r.Route.id !== routeParams.id,
          );

          const selectedRoute = topo?.RoutePath?.find(
            (r) => r.Route.id === routeParams.id,
          );

          return {
            otherRoutes,
            selectedRoute,
            routeStrokeWidth: Number(topo.routeStrokeWidth),
          };
        },
        [routeParams.id],
      ),
    },
  );

  const {
    canSave,
    coords,
    isLoading,
    onFinishOrSave,
    route,
    routeRef,
    setCanSave,
    setShowConfig,
    showConfig,
  } = useRouteDrawer({
    position: routeParams.position,
    routeId: routeParams.id,
    topoId,
    wallId,
    routePathId: topos?.selectedRoute?.id,
    routeStrokeWidth,
    zoneId,
  });

  const { fileUrl, isImageLoaded, fitted } = useTopoImage({
    wallId,
    zoneId,
  });

  const onUndo = () => {
    routeRef?.current?.undo(true);
    setCanSave(false);
  };

  const onReset = () => {
    if (!extendedRouteStart) return;
    routeRef?.current?.softReset(extendedRouteStart);
    setCanSave(false);
  };

  if (
    route &&
    isImageLoaded &&
    (!routeParams.extendedRouteId || !!extendedRouteStart)
  )
    return (
      <Screen safeAreaDisabled justifyContent="center">
        <SkiaRouteCanvas
          coords={coords}
          imageUrl={fileUrl}
          height={fitted.height}
          width={fitted.width}
        >
          <SkiaRoutePathDrawer
            coords={coords}
            ref={routeRef}
            path={topos?.selectedRoute?.path || extendedRouteStart}
            label={routeParams?.position.toString()}
            color={theme.colors.drawingRoutePath}
            withStart={false}
            withEnd={!!topos?.selectedRoute?.path}
            scale={fitted.scale}
            strokeWidth={routeStrokeWidth}
          />
          {showRoutes &&
            topos?.otherRoutes?.map((route) => (
              <SkiaRoutePath
                key={route.id}
                label={route.Route.position.toString()}
                path={route.path}
                scale={fitted.scale}
                color={
                  route.routeId === routeParams.extendedRouteId
                    ? theme.colors.drawingRoutePath
                    : theme.colors.routePath
                }
                strokeWidth={routeStrokeWidth}
              />
            ))}
        </SkiaRouteCanvas>
        <BackButton.Transparent onPress={navigation.goBack} />
        <Instructions>
          Comienza a dibujar la extensión de la ruta, comenzará desde el punto
          donde termina la ruta anterior.
        </Instructions>
        <RoutePathDrawConfig
          show={showConfig}
          setShow={setShowConfig}
          defaultRouteStrokeWidth={topos?.routeStrokeWidth}
        />
        <DrawingTools
          canSave={canSave}
          onFinishOrSave={onFinishOrSave}
          isLoading={isLoading}
          setShowConfig={setShowConfig}
          showConfig={showConfig}
          onUndo={onUndo}
          onReset={onReset}
        />
      </Screen>
    );

  return (
    <Screen justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Screen>
  );
};

export default DrawRoute;
