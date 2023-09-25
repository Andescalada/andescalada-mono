import { AppRouter } from "@andescalada/api/src/routers/_app";
import { ThemeProvider } from "@andescalada/ui";
import ColoredRoute from "@features/routesManager/components/ColoredRoute";
import { Canvas, FitBox, rect } from "@shopify/react-native-skia";
import { inferProcedureOutput } from "@trpc/server";
import { memo } from "react";
import { Dimensions } from "react-native";

type Data = inferProcedureOutput<AppRouter["topos"]["byId"]>;

type RoutePaths = Data["RoutePath"];

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

interface Props {
  height: number;
  width: number;
  imageHeight: number;
  imageWidth: number;
  routes?: RoutePaths;
  x?: number;
  y?: number;
  strokeWidth?: number;
}

const StaticRoutePath: React.FC<Props> = ({
  height,
  width,
  imageHeight,
  imageWidth,
  routes,
  strokeWidth = 1,
  x = 0,
  y = 0,
}) => {
  return (
    <Canvas style={{ height, width }}>
      <FitBox
        fit="cover"
        src={rect(0, 0, imageHeight, imageWidth)}
        dst={rect(x, y, height, width)}
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
      </FitBox>
    </Canvas>
  );

  return null;
};

export default memo(StaticRoutePath);
