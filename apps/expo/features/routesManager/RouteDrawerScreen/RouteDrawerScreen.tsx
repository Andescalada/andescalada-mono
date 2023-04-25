import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  SkiaRouteCanvas,
  SkiaRoutePath,
  SkiaRoutePathDrawer,
} from "@andescalada/climbs-drawer";
import { ActivityIndicator, BackButton, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import DrawingTools from "@features/routesManager/components/DrawingTools";
import RouteStrokeWidth from "@features/routesManager/components/RouteStrokeWidth";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { useAppSelector } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import useRouteDrawer from "@hooks/useRouteDrawer";
import useTopoImage from "@hooks/useTopoImage";
import { inferRouterOutputs } from "@trpc/server";
import { FC, useCallback, useState } from "react";

type Topo = inferRouterOutputs<AppRouter>["topos"]["byId"];

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.RouteDrawer>;

const DrawRoute: FC<Props> = ({
  route: {
    params: { wallId, route: routeParams, topoId, zoneId },
  },
  navigation,
}) => {
  const theme = useAppTheme();

  const { showRoutes } = useAppSelector((state) => state.localConfig);

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

          setRouteStrokeWidth(Number(topo.routeStrokeWidth));

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

  const [routeStrokeWidth, setRouteStrokeWidth] = useState(1);

  const {
    canSave,
    coords,
    isLoading,
    onFinishOrSave,
    route,
    routeRef,
    setCanSave,
    showConfig,
    setShowConfig,
  } = useRouteDrawer({
    position: routeParams.position,
    routeId: routeParams.id,
    topoId,
    wallId,
    routePathId: topos?.selectedRoute?.id,
    zoneId,
    routeStrokeWidth,
  });

  const { fileUrl, isImageLoaded, fitted } = useTopoImage({
    wallId,
    zoneId,
  });

  const onUndo = () => {
    routeRef?.current?.undo();
    setCanSave(false);
  };

  const onReset = () => {
    routeRef?.current?.reset();
    setCanSave(false);
  };

  if (route && isImageLoaded)
    return (
      <Screen safeAreaDisabled justifyContent="center">
        <SkiaRouteCanvas
          coords={coords}
          imageUrl={fileUrl}
          height={fitted.height}
          width={fitted.width}
        >
          {showRoutes &&
            topos?.otherRoutes?.map((route) => (
              <SkiaRoutePath
                key={route.id}
                label={route.Route.position.toString()}
                path={route.path}
                scale={fitted.scale}
                color={theme.colors.routePath}
                strokeWidth={routeStrokeWidth}
              />
            ))}
          <SkiaRoutePathDrawer
            coords={coords}
            ref={routeRef}
            path={topos?.selectedRoute?.path}
            label={routeParams?.position.toString()}
            color={theme.colors.drawingRoutePath}
            defaultStart={!!topos?.selectedRoute?.path}
            defaultEnd={!!topos?.selectedRoute?.path}
            scale={fitted.scale}
            strokeWidth={routeStrokeWidth}
          />
        </SkiaRouteCanvas>
        <BackButton.Transparent
          iconProps={{ color: "grayscale.black" }}
          onPress={navigation.goBack}
        />
        <RouteStrokeWidth
          show={showConfig}
          setShow={setShowConfig}
          value={routeStrokeWidth}
          onChange={setRouteStrokeWidth}
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
