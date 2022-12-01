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
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import parseGrade from "@utils/parseGrade";
import { FC } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.RouteOptions>;

const EditOptions: FC<Props> = ({
  route: {
    params: { routeId, wallId, zoneId },
  },
  navigation,
}) => {
  const route = trpc.routes.byId.useQuery(routeId);

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
        <ListItemOption onPress={navigateToDrawRoute}>
          Editar topo
        </ListItemOption>
      )}
      <ListItemOption
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
    </Screen>
  );
};

export default EditOptions;
