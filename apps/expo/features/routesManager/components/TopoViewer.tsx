import { AppRouter } from "@andescalada/api/src/routers/_app";
import { SkiaRouteCanvas, SkiaRoutePath } from "@andescalada/climbs-drawer";
import { pathToVector } from "@andescalada/climbs-drawer/usePathToPoints/usePathToPoints";
import { ThemeProvider } from "@andescalada/ui";
import theme from "@andescalada/ui/Theme/theme";
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
import roundPoint from "@utils/roundPoint";
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
const THRESHOLD = 1;

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

  const paths = data?.RoutePath || [];

  const routeStarts = useComputedValue(() => {
    return paths.map((path) => ({
      ...path,
      pitchlabelPoint: path.pitchlabelPoint,
      routeId: path.routeId,
      pathToVector: pathToVector(path.path, fitted.scale),
      start: pathToVector(path.path, fitted.scale)[0],
      end: pathToVector(path.path, fitted.scale).pop(),
    }));
  }, [paths]);

  const [selectedRoute, setSelectedRoute] = useState<string | undefined>(
    routeId || "",
  );

  const color = useValue(theme.colors["contrast.bright.red"]);

  useValueEffect(coords, (pto3) => {
    const touchingPath = routeStarts.current.map((route) => {
      const length = route.pathToVector.length;
      const inInSection = route.pathToVector.map((pto1, index, arr) => {
        if (index === length - 1) return false;

        const pt1 = roundPoint(pto1);
        const pt2 = roundPoint(arr[index + 1]);
        const pt3 = roundPoint(pto3);

        const dx = (pt3.x - pt1.x) / (pt2.x - pt1.x);
        const dy = (pt3.y - pt1.y) / (pt2.y - pt1.y);

        const betweenX = -THRESHOLD <= dx && dx <= THRESHOLD;
        const betweenY = -THRESHOLD <= dy && dy <= THRESHOLD;

        return betweenX && betweenY;
      });
      return { isIn: inInSection, routeId: route.routeId };
    });

    const d = touchingPath.find((t) => t.isIn.some((tt) => tt));
    setSelectedRoute(d?.routeId);
    onSelectedRoute?.(d?.routeId);
    if (!!d?.routeId) {
      color.current = theme.colors["contrast.bright.green"];
    } else {
      color.current = theme.colors["contrast.bright.red"];
    }
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
            paths.map((path) => (
              <ColoredRoute
                key={path.id}
                path={path}
                pitchLabelPoint={path.pitchlabelPoint || undefined}
                pitchLabelTitle="1"
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
