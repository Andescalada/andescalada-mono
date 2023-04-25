import { AppRouter } from "@andescalada/api/src/routers/_app";
import { ActivityIndicator, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import RouteDrawer from "@features/routesManager/RouteDrawerScreen/RouteDrawer";
import parsedTopo from "@features/routesManager/utils/parsedTopos";
import useTopoImage from "@hooks/useTopoImage";
import { inferRouterOutputs } from "@trpc/server";
import { FC, useCallback } from "react";

type Topo = inferRouterOutputs<AppRouter>["topos"]["byId"];

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.RouteDrawer>;

const DrawRoute: FC<Props> = ({
  route: {
    params: { wallId, route: routeParams, topoId, zoneId },
  },
}) => {
  const { data: topos } = trpc.topos.byId.useQuery(
    { topoId, zoneId },
    {
      select: useCallback(
        (topo: Topo) => parsedTopo(topo, routeParams.id),
        [routeParams.id],
      ),
    },
  );

  const { fileUrl, isImageLoaded, fitted } = useTopoImage({
    wallId,
    zoneId,
  });

  if (topos && isImageLoaded) {
    <RouteDrawer
      fileUrl={fileUrl}
      height={fitted.height}
      width={fitted.width}
      scale={fitted.scale}
      topos={topos}
    />;
  }

  return (
    <Screen justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Screen>
  );
};

export default DrawRoute;
