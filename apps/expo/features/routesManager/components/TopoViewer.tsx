import { SkiaRouteCanvas, SkiaRoutePath } from "@andescalada/climbs-drawer";
import { trpc } from "@andescalada/utils/trpc";
import { useAppTheme } from "@hooks/useAppTheme";
import useCachedImage from "@hooks/useCachedImage";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { FC } from "react";

interface Props {
  topoId: string;
  routeId?: string | undefined;
  height?: number;
  width?: number;
  center?: boolean;
  disableGesture?: boolean;
}

const TopoViewer: FC<Props> = ({ routeId, topoId, center, disableGesture }) => {
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
        {data.RoutePath.map((path) => {
          return (
            <SkiaRoutePath
              label={path.Route.position.toString()}
              path={path.path}
              key={path.id}
              color={
                path.Route.id === routeId
                  ? theme.colors["contrast.green"]
                  : theme.colors.routePath
              }
              scale={fitted.scale}
            />
          );
        })}
      </SkiaRouteCanvas>
    );
  }
  return null;
};

export default TopoViewer;
