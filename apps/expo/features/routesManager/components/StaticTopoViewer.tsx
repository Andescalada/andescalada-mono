import { AppRouter } from "@andescalada/api/src/routers/_app";
import { StaticTopoImage } from "@andescalada/climbs-drawer";
import { ThemeProvider } from "@andescalada/ui";
import ColoredRoute from "@features/routesManager/components/ColoredRoute";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";

type Data = inferProcedureOutput<AppRouter["topos"]["byId"]>;

type RoutePaths = Data["RoutePath"];

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
