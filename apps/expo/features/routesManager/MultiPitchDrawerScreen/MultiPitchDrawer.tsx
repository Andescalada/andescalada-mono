import {
  SkiaRouteCanvas,
  SkiaRoutePath,
  SkiaRoutePathDrawer,
} from "@andescalada/climbs-drawer";
import StartPointer from "@andescalada/climbs-drawer/SkiaRoutePathDrawer/StartPointer";
import {
  DEFAULT_POSITION,
  pathToArray,
} from "@andescalada/climbs-drawer/utils";
import { BackButton, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { MultiPitchManagerRoutes } from "@features/multiPitchManager/Navigation/types";
import DrawingTools from "@features/routesManager/components/DrawingTools";
import Instructions from "@features/routesManager/components/Instructions";
import RouteStrokeWidth from "@features/routesManager/components/RouteStrokeWidth";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerRouteProps,
} from "@features/routesManager/Navigation/types";
import { ParsedTopo } from "@features/routesManager/utils/parsedTopos";
import { useAppTheme } from "@hooks/useAppTheme";
import useRootNavigation from "@hooks/useRootNavigation";
import useRouteDrawer from "@hooks/useRouteDrawer";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FC, useMemo, useState } from "react";

interface Props {
  topos: Exclude<ParsedTopo, null>;
  fileUrl: string;
  height: number;
  width: number;
  scale: number;
}
const MultiPitchDrawer: FC<Props> = ({
  topos,
  fileUrl,
  height,
  scale,
  width,
}) => {
  const theme = useAppTheme();

  const navigation = useNavigation();
  const {
    params: {
      wallId,
      route: routeParams,
      topoId,
      zoneId,
      previousPitchId,
      newPitch,
      pitchNumber,
      multiPitchId,
      multiPitchName,
      goBackOnSuccess,
    },
  } =
    useRoute<
      RoutesManagerRouteProps<RoutesManagerNavigationRoutes.MultiPitchDrawer>
    >();

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

  const [showRoutes, setShowRoutes] = useState(true);

  const [routeStrokeWidth, setRouteStrokeWidth] = useState(
    topos.routeStrokeWidth,
  );

  const [hideStart, setHideStart] = useState(
    !!topos?.selectedRoute?.hideStart && !newPitch,
  );

  const rootNavigation = useRootNavigation();

  const {
    canSave,
    coords,
    isLoading,
    onFinishOrSave,
    routeRef,
    setCanSave,
    setShowConfig,
    showConfig,
    movement,
    handleLabelMovement,
    disableMovement,
  } = useRouteDrawer({
    position: routeParams.position,
    routeId: routeParams.id,
    topoId,
    wallId,
    routePathId: topos?.selectedRoute?.id,
    routeStrokeWidth,
    zoneId,
    pitchLabelPoint: topos?.selectedRoute?.pitchLabelPoint || undefined,
    scale: scale,
    withLabel: true,
    hideStart,
    goBackOnSuccess,
    navigateOnSuccess: () => {
      rootNavigation.replace(RootNavigationRoutes.MultiPitchManager, {
        screen: MultiPitchManagerRoutes.MultiPitchManager,
        params: {
          wallId,
          zoneId,
          topoId,
          multiPitchId: multiPitchId,
          multiPitchName: multiPitchName,
        },
      });
    },
  });

  const onUndo = () => {
    routeRef?.current?.undo(true);
    setCanSave(false);
  };

  const onReset = () => {
    movement.current = DEFAULT_POSITION;
    if (!hideStart || !previousPitchStart) {
      routeRef?.current?.reset();
    } else {
      routeRef?.current?.softReset(previousPitchStart);
    }
    setCanSave(false);
  };

  const handleConnection = () => {
    setHideStart((prev) => {
      if (prev) {
        connectStart();
      } else {
        disconnectStart();
      }
      return !prev;
    });
  };

  const disconnectStart = () => {
    routeRef?.current?.reset();
    setCanSave(false);
  };

  const connectStart = () => {
    if (!previousPitchStart) return;
    routeRef?.current?.softReset(previousPitchStart);
    setCanSave(false);
  };

  return (
    <Screen safeAreaDisabled justifyContent="center">
      <SkiaRouteCanvas
        coords={coords}
        movement={movement}
        imageUrl={fileUrl}
        height={height}
        width={width}
        disableGesture={!disableMovement}
        disableMovement={disableMovement}
      >
        {showRoutes &&
          topos?.otherRoutes?.map((route) => (
            <SkiaRoutePath
              key={route.id}
              label={route.Route.position.toString()}
              path={route.path}
              pitchLabelPoint={route.pitchLabelPoint || undefined}
              pitchLabelTitle={String(route.Route.Pitch?.number)}
              scale={scale}
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
          defaultStart={!!topos?.selectedRoute?.path || !!previousPitchStart}
          defaultEnd={!!topos?.selectedRoute?.path}
          scale={scale}
          strokeWidth={routeStrokeWidth}
          hideStart={hideStart}
        />
        {movement.current !== DEFAULT_POSITION && (
          <StartPointer
            color="transparent"
            backgroundColor={theme.colors["contrast.bright.green"]}
            label={String(
              pitchNumber ?? topos?.selectedRoute?.Route.Pitch?.number,
            )}
            scale={scale * routeStrokeWidth}
            c={movement}
          />
        )}
      </SkiaRouteCanvas>
      <BackButton.Transparent
        iconProps={{ color: "grayscale.black" }}
        onPress={navigation.goBack}
      />
      <Instructions>
        Comienza a dibujar el siguiente largo, empezará desde el punto donde
        termina el largo anterior.
      </Instructions>
      <RouteStrokeWidth
        show={showConfig}
        setShow={setShowConfig}
        value={routeStrokeWidth}
        onChange={setRouteStrokeWidth}
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
        canDisconnect={!!previousPitchStart && !newPitch}
        isDisconnected={hideStart}
        onDisconnect={handleConnection}
        onLabelMovement={handleLabelMovement}
        labelCanMove={!disableMovement}
        labelOnScreen={movement.current !== DEFAULT_POSITION}
        showRoutes={showRoutes}
        setShowRoutes={setShowRoutes}
      />
    </Screen>
  );
};

export default MultiPitchDrawer;
