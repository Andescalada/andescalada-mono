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
import { FC, useCallback, useMemo, useState } from "react";

type Topo = inferRouterOutputs<AppRouter>["topos"]["byId"];

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.MultiPitchDrawer>;

const MultiPitchDrawerScreen: FC<Props> = ({
  route: {
    params: { wallId, route: routeParams, topoId, zoneId, previousPitchId },
  },
  navigation,
}) => {
  const theme = useAppTheme();

  const previousPitch =
    !!previousPitchId &&
    trpc.multiPitch.pitchById.useQuery({
      pitchId: previousPitchId,
      zoneId,
      topoId,
    });

  const previousPitchStart = useMemo(() => {
    if (!previousPitch) return undefined;

    const prevPath = previousPitch?.data?.Route.RoutePath[0]?.path;

    if (prevPath) {
      const arrayPath = pathToArray(prevPath).pop();
      if (!arrayPath) return undefined;
      return `${arrayPath[0]},${arrayPath[1]}`;
    }
    return undefined;
  }, [previousPitch]);

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

  const [startDisconnected, setDisconnectedStart] = useState(
    !!topos?.selectedRoute?.path && !previousPitchStart,
  );

  const onReset = () => {
    if (startDisconnected || !previousPitchStart) {
      routeRef?.current?.reset();
    } else {
      routeRef?.current?.softReset(previousPitchStart);
    }
    setCanSave(false);
  };

  const disconnectStart = () => {
    routeRef?.current?.reset();
    setCanSave(false);
    setDisconnectedStart(true);
  };

  const connectStart = () => {
    if (!previousPitchStart) return;
    routeRef?.current?.softReset(previousPitchStart);
    setCanSave(false);
    setDisconnectedStart(false);
  };

  if (route && isImageLoaded && (!previousPitchId || !!previousPitchStart))
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
                color={
                  route.routeId === previousPitchId
                    ? theme.colors.drawingRoutePath
                    : theme.colors.routePath
                }
                strokeWidth={routeStrokeWidth}
              />
            ))}
          <SkiaRoutePathDrawer
            coords={coords}
            ref={routeRef}
            path={topos?.selectedRoute?.path || previousPitchStart}
            label={routeParams?.position.toString()}
            color={theme.colors.drawingRoutePath}
            withStart={!startDisconnected}
            withEnd={!!topos?.selectedRoute?.path}
            scale={fitted.scale}
            strokeWidth={routeStrokeWidth}
          />
        </SkiaRouteCanvas>
        <BackButton.Transparent
          iconProps={{ color: "grayscale.black" }}
          onPress={navigation.goBack}
        />
        <Instructions>
          Comienza a dibujar el siguiente largo, empezará desde el punto donde
          termina el largo anterior.
        </Instructions>
        <RoutePathDrawConfig
          show={showConfig}
          setShow={setShowConfig}
          defaultRouteStrokeWidth={topos?.routeStrokeWidth}
        />
        <DrawingTools
          isMultiPitch
          canSave={canSave}
          onFinishOrSave={onFinishOrSave}
          isLoading={isLoading}
          setShowConfig={setShowConfig}
          showConfig={showConfig}
          onUndo={onUndo}
          onReset={onReset}
          canDisconnect={!!previousPitchStart}
          isDisconnected={startDisconnected}
          onDisconnect={() => {
            startDisconnected ? connectStart() : disconnectStart();
          }}
        />
      </Screen>
    );

  return (
    <Screen justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Screen>
  );
};

export default MultiPitchDrawerScreen;
