import {
  SkiaRouteCanvas,
  SkiaRoutePath,
  SkiaRoutePathDrawer,
} from "@andescalada/climbs-drawer";
import { pathToArray } from "@andescalada/climbs-drawer/utils";
import { BackButton, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import DrawingTools from "@features/routesManager/components/DrawingTools";
import Instructions from "@features/routesManager/components/Instructions";
import RouteStrokeWidth from "@features/routesManager/components/RouteStrokeWidth";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerRouteProps,
} from "@features/routesManager/Navigation/types";
import { ParsedTopo } from "@features/routesManager/utils/parsedTopos";
import { useAppSelector } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import useRouteDrawer from "@hooks/useRouteDrawer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FC, useMemo, useState } from "react";

interface Props {
  topos: Exclude<ParsedTopo, null>;
  fileUrl: string;
  height: number;
  width: number;
  scale: number;
}
const RouteExtensionDrawer: FC<Props> = ({
  topos,
  fileUrl,
  height,
  width,
  scale,
}) => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const {
    params: { wallId, route: routeParams, topoId, zoneId },
  } =
    useRoute<
      RoutesManagerRouteProps<RoutesManagerNavigationRoutes.RouteExtensionDrawer>
    >();

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

  const { showRoutes } = useAppSelector((state) => state.localConfig);

  const [routeStrokeWidth, setRouteStrokeWidth] = useState(
    topos.routeStrokeWidth,
  );

  const {
    canSave,
    coords,
    isLoading,
    onFinishOrSave,
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
    hideStart: true,
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

  return (
    <Screen safeAreaDisabled justifyContent="center">
      <SkiaRouteCanvas
        coords={coords}
        imageUrl={fileUrl}
        height={height}
        width={width}
      >
        <SkiaRoutePathDrawer
          coords={coords}
          ref={routeRef}
          path={topos?.selectedRoute?.path || extendedRouteStart}
          label={routeParams?.position.toString()}
          color={theme.colors.drawingRoutePath}
          defaultStart={false}
          defaultEnd={!!topos?.selectedRoute?.path}
          scale={scale}
          strokeWidth={routeStrokeWidth}
          hideStart
        />
        {showRoutes &&
          topos?.otherRoutes?.map((route) => (
            <SkiaRoutePath
              key={route.id}
              label={route.Route.position.toString()}
              path={route.path}
              scale={scale}
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
};

export default RouteExtensionDrawer;
