import { AppRouter } from "@andescalada/api/src/routers/_app";
import { SkiaRoutePath } from "@andescalada/climbs-drawer";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { useAppTheme } from "@hooks/useAppTheme";
import { inferProcedureOutput } from "@trpc/server";
import { useMemo } from "react";

type Data = inferProcedureOutput<AppRouter["topos"]["byId"]>;

type PathItem = Data["RoutePath"][0];

interface ColoredRouteProps {
  path: PathItem;
  selectedRoute: string | undefined;
  scale: number;
  strokeWidth: number;
  pitchLabelPoint?: string;
  pitchLabelTitle?: string;
  withSimpleStartPoint?: boolean;
}

const ColoredRoute = ({
  path,
  selectedRoute,
  scale,
  strokeWidth,
  pitchLabelPoint,
  pitchLabelTitle,
  withSimpleStartPoint = false,
}: ColoredRouteProps) => {
  const theme = useAppTheme();

  const color = useMemo(() => {
    if (path.routeId === selectedRoute)
      return theme.colors["contrast.bright.green"];
    if (!!selectedRoute && path.routeId !== selectedRoute)
      return theme.colors["grayscale.transparent.80.600"];
    return theme.colors[routeKindLabel(path.Route.kind).color];
  }, [path.Route.kind, path.routeId, selectedRoute, theme.colors]);

  return (
    <SkiaRoutePath
      withSimpleStartPoint={withSimpleStartPoint}
      label={path.Route.position.toString()}
      path={path.path}
      key={path.id}
      color={color}
      scale={scale}
      pitchLabelPoint={pitchLabelPoint}
      pitchLabelTitle={pitchLabelTitle}
      routeFromTheGround={!path.Route.extendedRouteId}
      strokeWidth={strokeWidth}
    />
  );
};

export default ColoredRoute;
