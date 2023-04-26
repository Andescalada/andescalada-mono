import { AppRouter } from "@andescalada/api/src/routers/_app";
import { SkiaRouteCanvas, SkiaRoutePath } from "@andescalada/climbs-drawer";
import { pathToVector } from "@andescalada/climbs-drawer/usePathToPoints/usePathToPoints";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { ThemeProvider } from "@andescalada/ui";
import { useAppTheme } from "@hooks/useAppTheme";
import useCachedImage from "@hooks/useCachedImage";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import {
  useComputedValue,
  useValue,
  useValueEffect,
} from "@shopify/react-native-skia";
import { inferProcedureOutput } from "@trpc/server";
import { fitContent } from "@utils/Dimensions";
import selectRouteByPoint from "@utils/selectRouteByPoint";
import { FC, useMemo, useState } from "react";
import { Dimensions } from "react-native";

type Data = inferProcedureOutput<AppRouter["topos"]["byId"]>;

type PathItem = Data["RoutePath"][0];

interface Props {
  routeId?: string | undefined;
  height?: number;
  width?: number;
  center?: boolean;
  disableGesture?: boolean;
  strokeWidth?: number;
  hide?: boolean;
  onSelectedRoute?: (id: string | undefined) => void;
  imageQuality?: number;
  data: Data;
}

const TopoViewer: FC<Props> = ({
  routeId,
  center,
  disableGesture,
  strokeWidth = 1,
  hide = false,
  onSelectedRoute,
  imageQuality,
  data,
}) => {
  const image = useCloudinaryUrl("optimizedImage", {
    publicId: data?.image.publicId,
    quality: imageQuality,
  });

  const { fileUrl } = useCachedImage(image);

  const coords = useValue({ x: 0, y: 0 });

  const { height, width } = data.image;

  const fitted = fitContent(
    { height: height ? height : 0, width: width ? width : 0 },
    "width",
    Dimensions.get("window").width,
  );

  const vectorRoutes = useComputedValue(() => {
    return data.RoutePath.map((path) => ({
      ...path,
      pitchLabelPoint: path.pitchLabelPoint,
      routeId: path.routeId,
      pathToVector: pathToVector(path.path, fitted.scale),
      start: pathToVector(path.path, fitted.scale)[0],
      end: pathToVector(path.path, fitted.scale).pop(),
    }));
  }, [data.RoutePath]);

  const [selectedRoute, setSelectedRoute] = useState<string | undefined>(
    routeId || "",
  );

  useValueEffect(coords, (point) => {
    const selectedRoute = selectRouteByPoint(vectorRoutes, point);
    setSelectedRoute(selectedRoute);
    onSelectedRoute?.(selectedRoute);
  });

  return (
    <SkiaRouteCanvas
      imageUrl={fileUrl}
      height={fitted.height}
      width={fitted.width}
      center={center}
      disableGesture={disableGesture}
      coords={coords}
    >
      <ThemeProvider>
        {!hide &&
          data.RoutePath.map((path) => (
            <ColoredRoute
              key={path.id}
              path={path}
              pitchLabelPoint={path.pitchLabelPoint || undefined}
              pitchLabelTitle={String(path.Route.Pitch?.number)}
              scale={fitted.scale}
              selectedRoute={selectedRoute}
              strokeWidth={strokeWidth}
            />
          ))}
      </ThemeProvider>
    </SkiaRouteCanvas>
  );
};

export default TopoViewer;

interface ColoredRouteProps {
  path: PathItem;
  selectedRoute: string | undefined;
  scale: number;
  strokeWidth: number;
  pitchLabelPoint?: string;
  pitchLabelTitle?: string;
}

const ColoredRoute = ({
  path,
  selectedRoute,
  scale,
  strokeWidth,
  pitchLabelPoint,
  pitchLabelTitle,
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
