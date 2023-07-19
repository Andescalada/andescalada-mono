import { AppRouter } from "@andescalada/api/src/routers/_app";
import { SkiaRoutePath, StaticTopoImage } from "@andescalada/climbs-drawer";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { ThemeProvider } from "@andescalada/ui";
import { useAppTheme } from "@hooks/useAppTheme";
import { inferProcedureOutput } from "@trpc/server";
import { FC, useMemo } from "react";

type Data = inferProcedureOutput<AppRouter["topos"]["byId"]>;

type RoutePaths = Data["RoutePath"];

type PathItem = Data["RoutePath"][0];

interface Props {
  x?: number;
  y?: number;
  height: number;
  width: number;
  strokeWidth?: number;
  imageUrl: string;
  routes?: RoutePaths;
}

const StaticTopoViewer: FC<Props> = ({
  height,
  width,
  strokeWidth = 1,
  imageUrl,
  routes,
  x = 0,
  y = 0,
}) => {
  return (
    <StaticTopoImage
      imageUrl={imageUrl}
      x={x}
      y={y}
      height={height}
      width={width}
    >
      <ThemeProvider>
        {routes &&
          routes.map((path) => (
            <ColoredRoute
              key={path.id}
              path={path}
              pitchLabelPoint={path.pitchLabelPoint || undefined}
              pitchLabelTitle={String(path.Route.Pitch?.number)}
              scale={1}
              selectedRoute={undefined}
              strokeWidth={strokeWidth}
              withSimpleStartPoint={!!path.Route.variantRouteId}
            />
          ))}
      </ThemeProvider>
    </StaticTopoImage>
  );
};

export default StaticTopoViewer;

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
