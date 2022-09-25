import { RouteCanvas, RoutePath } from "@andescalada/climbs-drawer";
import { Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { fitContent } from "@utils/Dimensions";
import { FC } from "react";

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoViewer>;

const TopoViewer: FC<Props> = ({ route: navRoute }) => {
  const { topoId } = navRoute.params;
  const { data } = trpc.topos.byId.useQuery(topoId);
  if (!data) return null;

  const { height, url, width } = data.image;

  const fitted = fitContent({ height, width }, "height");

  return (
    <Screen>
      <RouteCanvas
        imageUri={url}
        zoomProps={{
          zoomEnabled: true,
          minZoom: 0.1,
          initialZoom: fitted.ratioToOriginal,
        }}
        height={fitted.height}
        width={fitted.width}
      >
        {data.RoutePath.map((route) => (
          <RoutePath
            disableDrawing
            key={route.id}
            finished
            label={route.route.position}
            value={route.path}
          />
        ))}
      </RouteCanvas>
    </Screen>
  );
};

export default TopoViewer;
