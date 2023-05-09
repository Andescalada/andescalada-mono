import { pathToArray } from "@andescalada/climbs-drawer/utils";
import { ActivityIndicator, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import RouteExtensionDrawer from "@features/routesManager/RouteExtensionDrawerScreen/RouteExtensionDrawer";
import parsedTopo from "@features/routesManager/utils/parsedTopos";
import useToposById from "@hooks/offlineQueries/useToposById";
import useTopoImage from "@hooks/useTopoImage";
import { FC, useMemo } from "react";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.RouteExtensionDrawer>;

const DrawRoute: FC<Props> = ({
  route: {
    params: { wallId, route: routeParams, topoId, zoneId },
  },
}) => {
  const extendedRoute =
    !!routeParams.extendedRouteId &&
    trpc.routes.byId.useQuery(routeParams.extendedRouteId);

  const extendedRouteStart = useMemo(() => {
    if (!extendedRoute) return undefined;

    const prevPath = extendedRoute?.data?.Wall.topos.find(
      (t) => t.id === topoId,
    )?.RoutePath[0].path;

    if (prevPath) {
      const arrayPath = pathToArray(prevPath).pop();
      if (!arrayPath) return undefined;
      return `${arrayPath[0]},${arrayPath[1]}`;
    }
    return undefined;
  }, [extendedRoute, topoId]);

  const { data } = useToposById({ topoId, zoneId }, {});

  const topos = useMemo(
    () => parsedTopo(data, routeParams.id),
    [routeParams.id, data],
  );

  const { fileUrl, isImageLoaded, fitted } = useTopoImage({
    wallId,
    zoneId,
  });

  if (
    topos &&
    isImageLoaded &&
    (!routeParams.extendedRouteId || !!extendedRouteStart)
  ) {
    return (
      <RouteExtensionDrawer
        topos={topos}
        fileUrl={fileUrl}
        height={fitted.height}
        width={fitted.width}
        scale={fitted.scale}
      />
    );
  }

  return (
    <Screen justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Screen>
  );
};

export default DrawRoute;
