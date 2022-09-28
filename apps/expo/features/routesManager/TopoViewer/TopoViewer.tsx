import { SkiaRouteCanvas, SkiaRoutePath } from "@andescalada/climbs-drawer";
import { Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { FC } from "react";

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoViewer>;

const TopoViewer: FC<Props> = ({ route: navRoute }) => {
  const { topoId } = navRoute.params;
  const { data } = trpc.topos.byId.useQuery(topoId);

  const theme = useAppTheme();

  if (data) {
    const { height, width, publicId } = data.image;

    const topoImage = publicId ? optimizedImage(publicId) : "";

    const fitted = fitContent({ height, width }, "width");

    return (
      <Screen>
        <SkiaRouteCanvas
          imageUrl={topoImage}
          height={fitted.height}
          width={fitted.width}
        >
          {data.RoutePath.map((route) => (
            <SkiaRoutePath
              label={route.route.position.toString()}
              path={route.path}
              key={route.id}
              color={theme.colors.routePath}
              scale={fitted.scale}
            />
          ))}
        </SkiaRouteCanvas>
      </Screen>
    );
  }
  return null;
};

export default TopoViewer;
