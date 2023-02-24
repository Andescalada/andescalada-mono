import { AppRouter } from "@andescalada/api/src/routers/_app";
import { SkiaRouteCanvas, SkiaRoutePath } from "@andescalada/climbs-drawer";
import { pathToVector } from "@andescalada/climbs-drawer/usePathToPoints/usePathToPoints";
import { ActivityIndicator, Box, ThemeProvider } from "@andescalada/ui";
import { routeKindLabel } from "@andescalada/utils/routeKind";
import { trpc } from "@andescalada/utils/trpc";
import { useAppTheme } from "@hooks/useAppTheme";
import useCachedImage from "@hooks/useCachedImage";
import { Zone } from "@prisma/client";
import {
  useComputedValue,
  useValue,
  useValueEffect,
} from "@shopify/react-native-skia";
import { inferProcedureOutput } from "@trpc/server";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import selectRouteByPoint from "@utils/selectRouteByPoint";
import { FC, memo, useMemo, useState } from "react";
import { Dimensions } from "react-native";

type PathItem = inferProcedureOutput<
  AppRouter["topos"]["byId"]
>["RoutePath"][0];
interface Props {
  topoId: string;
  routeId?: string | undefined;
  height?: number;
  width?: number;
  center?: boolean;
  disableGesture?: boolean;
  strokeWidth?: number;
  hide?: boolean;
  onSelectedRoute?: (id: string | undefined) => void;
  zoneId: Zone["id"];
  imageQuality?: number;
}

const TopoViewer: FC<Props> = ({
  routeId,
  topoId,
  center,
  disableGesture,
  strokeWidth = 1,
  hide = false,
  zoneId,
  onSelectedRoute,
  imageQuality,
}) => {
  const { data } = trpc.topos.byId.useQuery({ topoId, zoneId });

  const image = optimizedImage(data?.image.publicId || undefined, imageQuality);

  const { fileUrl } = useCachedImage(image);

  const coords = useValue({ x: 0, y: 0 });

  const { height, width } = data?.image || {};

  const fitted = fitContent(
    { height: height ? height : 0, width: width ? width : 0 },
    "width",
    !!imageQuality && width
      ? Math.min(1024, width)
      : Dimensions.get("window").width,
  );

  const paths = data?.RoutePath || [];

  const routeStarts = useComputedValue(() => {
    return paths.map((path) => ({
      ...path,
      pitchLabelPoint: path.pitchLabelPoint,
      routeId: path.routeId,
      pathToVector: pathToVector(path.path, fitted.scale),
      start: pathToVector(path.path, fitted.scale)[0],
      end: pathToVector(path.path, fitted.scale).pop(),
    }));
  }, [paths]);

  const [selectedRoute, setSelectedRoute] = useState<string | undefined>(
    routeId || "",
  );

  useValueEffect(coords, (point) => {
    const selectedRoute = selectRouteByPoint(routeStarts, point);
    setSelectedRoute(selectedRoute);
    onSelectedRoute?.(selectedRoute);
  });

  if (!data || !fileUrl)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );

  if (data) {
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
            paths.map((path) => (
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
  }
  return null;
};

export default memo(TopoViewer);

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
