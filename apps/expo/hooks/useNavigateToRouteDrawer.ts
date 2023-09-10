import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";

interface Args {
  id: string;
  wallId: string;
  topoId: string;
  zoneId: string;
  position: number;
  variantRouteId: string | null;
  extendedRouteId: string | null;
  singleEdition?: true;
  goBackOnSuccess?: true;
}

const useNavigateToRouteDrawer = ({
  id,
  position,
  topoId,
  wallId,
  zoneId,
  extendedRouteId,
  variantRouteId,
  singleEdition,
  goBackOnSuccess,
}: Args) => {
  const rootNavigation = useRootNavigation();
  const navigateToDrawRoute = () => {
    if (!!extendedRouteId) {
      rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
        screen: RoutesManagerNavigationRoutes.RouteExtensionDrawer,
        params: {
          route: { id, position, extendedRouteId },
          wallId,
          topoId,
          zoneId,
          goBackOnSuccess,
        },
      });
      return;
    }
    if (!!variantRouteId) {
      rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
        screen: RoutesManagerNavigationRoutes.RouteVariantDrawer,
        params: {
          route: { id, position, variantRouteId },
          wallId,
          topoId,
          zoneId,
          goBackOnSuccess,
        },
      });
      return;
    }
    rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
      screen: RoutesManagerNavigationRoutes.RouteDrawer,
      params: {
        route: { id, position },
        wallId,
        topoId,
        zoneId,
        singleEdition,
        goBackOnSuccess,
      },
    });
  };

  return { navigateToDrawRoute };
};

export default useNavigateToRouteDrawer;
