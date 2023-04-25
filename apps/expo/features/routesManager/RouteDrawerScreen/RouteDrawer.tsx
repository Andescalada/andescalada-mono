import {
  SkiaRouteCanvas,
  SkiaRoutePath,
  SkiaRoutePathDrawer,
} from "@andescalada/climbs-drawer";
import { BackButton, Screen } from "@andescalada/ui";
import DrawingTools from "@features/routesManager/components/DrawingTools";
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
import { FC, useState } from "react";

interface Props {
  topos: ParsedTopo;
  fileUrl: string;
  height: number;
  width: number;
  scale: number;
}

const RouteDrawer: FC<Props> = ({ topos, fileUrl, height, width, scale }) => {
  const {
    params: { route: routeParams, topoId, wallId, zoneId },
  } =
    useRoute<
      RoutesManagerRouteProps<RoutesManagerNavigationRoutes.RouteDrawer>
    >();

  const navigation = useNavigation();

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

  const onUndo = () => {
    routeRef?.current?.undo();
    setCanSave(false);
  };

  const onReset = () => {
    routeRef?.current?.reset();
    setCanSave(false);
  };

  const theme = useAppTheme();

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
          scale={scale}
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
};

export default RouteDrawer;
