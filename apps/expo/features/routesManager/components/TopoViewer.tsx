import { SkiaRouteCanvas, SkiaRoutePath } from "@andescalada/climbs-drawer";
import { trpc } from "@andescalada/utils/trpc";
import { useAppTheme } from "@hooks/useAppTheme";
import useCachedImage from "@hooks/useCachedImage";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { routeKindLabel } from "@utils/routeKind";
import { FC, memo } from "react";

interface Props {
  topoId: string;
  routeId?: string | undefined;
  height?: number;
  width?: number;
  center?: boolean;
  disableGesture?: boolean;
  strokeWidth?: number;
  hide?: boolean;
}

const TopoViewer: FC<Props> = ({
  routeId,
  topoId,
  center,
  disableGesture,
  strokeWidth = 1,
  hide = false,
}) => {
  const { data } = trpc.topos.byId.useQuery({ topoId });

  const theme = useAppTheme();

  const image = optimizedImage(data?.image.publicId || undefined);

  const { fileUrl } = useCachedImage(image);

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
      >
        {!hide &&
          data.RoutePath.map((path) => {
            const color = () => {
              if (path.routeId === routeId)
                return theme.colors["contrast.bright.green"];
              if (!!routeId && path.routeId !== routeId)
                return theme.colors["grayscale.transparent.80.600"];
              return theme.colors[routeKindLabel(path.Route.kind).color];
            };

            return (
              <SkiaRoutePath
                label={path.Route.position.toString()}
                path={path.path}
                key={path.id}
                color={color()}
                scale={fitted.scale}
                routeFromTheGround={!path.Route.extendedRouteId}
                strokeWidth={strokeWidth}
              />
            );
          })}
      </SkiaRouteCanvas>
    );
  }
  return null;
};

export default memo(TopoViewer);
