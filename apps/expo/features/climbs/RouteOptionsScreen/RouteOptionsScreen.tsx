import {
  ActivityIndicator,
  ListItemOption,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import featureFlags from "@utils/featureFlags";
import parseGrade from "@utils/parseGrade";
import { FC } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.RouteOptions>;

const EditOptions: FC<Props> = ({
  route: {
    params: { routeId, wallId, zoneId },
  },
  navigation,
}) => {
  const route = trpc.routes.byId.useQuery(routeId, {
    staleTime: 0,
    cacheTime: 0,
  });

  const { permission } = usePermissions({ zoneId });

  const rootNavigation = useRootNavigation();

  if (!route.data) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    );
  }

  const {
    name,
    id,
    kind,
    RouteGrade,
    unknownName,
    position,
    Wall,
    extendedRouteId,
  } = route.data;

  const navigateToDrawRoute = () => {
    if (!!extendedRouteId) {
      rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
        screen: RoutesManagerNavigationRoutes.RouteExtensionDrawer,
        params: {
          route: { id, position, extendedRouteId },
          wallId,
          topoId: Wall.topos[0].id,
          zoneId,
        },
      });
    } else {
      rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
        screen: RoutesManagerNavigationRoutes.RouteDrawer,
        params: {
          route: { id, position },
          wallId,
          topoId: Wall.topos[0].id,
          zoneId,
        },
      });
    }
  };

  return (
    <Screen safeAreaDisabled padding="m">
      <Text variant="h1" marginBottom="m">
        {name}
      </Text>
      <ListItemOption
        visible={permission.has("Create")}
        onPress={() =>
          navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
            wallId,
            zoneId,
            id: id,
            name: name,
            kind: kind,
            grade: parseGrade(RouteGrade),
            unknownName: unknownName,
          })
        }
      >
        Editar ruta
      </ListItemOption>
      {Wall.topos.length > 0 && (
        <ListItemOption
          onPress={navigateToDrawRoute}
          visible={permission.has("Update")}
        >
          Editar topo
        </ListItemOption>
      )}
      <ListItemOption
        visible={permission.has("Create")}
        onPress={() =>
          navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
            wallId,
            zoneId,
            extendedRouteId: id,
          })
        }
      >
        Agregar extensión
      </ListItemOption>
      <ListItemOption
        visible={permission.has("Create") && featureFlags.multiPitch}
      >
        Convertir en multilargo
      </ListItemOption>
    </Screen>
  );
};

export default EditOptions;
