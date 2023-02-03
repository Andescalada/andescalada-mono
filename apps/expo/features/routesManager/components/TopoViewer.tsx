import { AppRouter } from "@andescalada/api/src/routers/_app";
import { SkiaRouteCanvas, SkiaRoutePath } from "@andescalada/climbs-drawer";
import { pathToVector } from "@andescalada/climbs-drawer/utils";
import { ThemeProvider } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { useAppTheme } from "@hooks/useAppTheme";
import useCachedImage from "@hooks/useCachedImage";
import { Zone } from "@prisma/client";
import {
  dist,
  useComputedValue,
  useValue,
  useValueEffect,
} from "@shopify/react-native-skia";
import { inferProcedureOutput } from "@trpc/server";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { routeKindLabel } from "@utils/routeKind";
import { FC, memo, useMemo, useState } from "react";

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
}

const MIN_TOUCH_DISTANCE = 10;

const TopoViewer: FC<Props> = ({
  routeId,
  topoId,
  center,
  disableGesture,
  strokeWidth = 1,
  hide = false,
  zoneId,
  onSelectedRoute,
}) => {
  const { data } = trpc.topos.byId.useQuery({ topoId, zoneId });

  const image = optimizedImage(data?.image.publicId || undefined);

  const { fileUrl } = useCachedImage(image);

  const coords = useValue({ x: 0, y: 0 });

  const { height, width } = data?.image || {};
  const fitted = fitContent(
    { height: height ? height : 0, width: width ? width : 0 },
    "width",
  );

  const routeStarts = useComputedValue(() => {
    if (data?.RoutePath) {
      return data.RoutePath.map((path) => ({
        ...path,
        start: pathToVector(path.path, fitted.scale)[0],
        end: pathToVector(path.path, fitted.scale).pop(),
      }));
    }
    return [];
  }, [data?.RoutePath]);

  const [selectedRoute, setSelectedRoute] = useState<string | undefined>(
    routeId || "",
  );

  useValueEffect(coords, (coords) => {
    const d = routeStarts.current.find(
      (route) =>
        dist(route.start, coords) < MIN_TOUCH_DISTANCE ||
        (route.end && dist(route.end, coords) < MIN_TOUCH_DISTANCE),
    );
    setSelectedRoute(d?.routeId);
    onSelectedRoute?.(d?.routeId);
  });

  if (data) {
    const { height, width } = data?.image;
    const fitted = fitContent({ height, width }, "width");

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
}

const ColoredRoute = ({
  path,
  selectedRoute,
  scale,
  strokeWidth,
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
      routeFromTheGround={!path.Route.extendedRouteId}
      strokeWidth={strokeWidth}
    />
  );
};
