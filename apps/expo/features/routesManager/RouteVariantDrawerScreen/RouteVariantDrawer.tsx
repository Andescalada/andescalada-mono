import {
  SkiaRouteCanvas,
  SkiaRoutePath,
  SkiaRoutePathDrawer,
} from "@andescalada/climbs-drawer";
import { pathToVector } from "@andescalada/climbs-drawer/usePathToPoints/usePathToPoints";
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
import { useAppTheme } from "@hooks/useAppTheme";
import useRouteDrawer from "@hooks/useRouteDrawer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useComputedValue, useValueEffect } from "@shopify/react-native-skia";
import selectRouteByPoint from "@utils/selectRouteByPoint";
import { FC, useState } from "react";

interface Props {
  topos: Exclude<ParsedTopo, null>;
  fileUrl: string;
  height: number;
  width: number;
  scale: number;
}
const RouteVariantDrawer: FC<Props> = ({
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
      RoutesManagerRouteProps<RoutesManagerNavigationRoutes.RouteVariantDrawer>
    >();

  const extendedRoute = trpc.routes.byId.useQuery(routeParams.variantRouteId);

  const [showRoutes, setShowRoutes] = useState(true);

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
    hideStart: false,
  });

  const vectorRoutes = useComputedValue(() => {
    return topos?.otherRoutes?.map((path) => ({
      ...path,
      pitchLabelPoint: path.pitchLabelPoint,
      routeId: path.routeId,
      pathToVector: pathToVector(path.path, scale),
      start: pathToVector(path.path, scale)[0],
      end: pathToVector(path.path, scale).pop(),
    }));
  }, [topos]);

  useValueEffect(coords, (point) => {
    if (routeRef.current?.hasStarted) return;

    const selectedRoute = selectRouteByPoint(vectorRoutes, point);

    if (selectedRoute === routeParams.variantRouteId) {
      routeRef?.current?.setStart(`${point.x / scale},${point.y / scale}`);
    } else {
      routeRef?.current?.blockStart();
    }
  });

  const onUndo = () => {
    routeRef?.current?.undo(true);
    setCanSave(false);
  };

  const onReset = () => {
    routeRef?.current?.blockStart();
    routeRef?.current?.reset();
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
        {showRoutes &&
          topos?.otherRoutes?.map((route) => (
            <SkiaRoutePath
              key={route.id}
              label={route.Route.position.toString()}
              path={route.path}
              scale={scale}
              color={
                route.routeId === routeParams.variantRouteId
                  ? theme.colors["contrast.bright.blue"]
                  : theme.colors.routePath
              }
              strokeWidth={routeStrokeWidth}
              withSimpleStartPoint={!!route.Route.variantRouteId}
            />
          ))}
        <SkiaRoutePathDrawer
          coords={coords}
          ref={routeRef}
          path={topos?.selectedRoute?.path}
          label={`${
            extendedRoute.data?.position
          }.${routeParams?.position.toString()}`}
          color={theme.colors.drawingRoutePath}
          defaultStart={!!topos?.selectedRoute?.path}
          defaultEnd={!!topos?.selectedRoute?.path}
          scale={scale}
          strokeWidth={routeStrokeWidth}
          withSimpleStartPoint
        />
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
        showRoutes={showRoutes}
        setShowRoutes={setShowRoutes}
      />
    </Screen>
  );
};

export default RouteVariantDrawer;
