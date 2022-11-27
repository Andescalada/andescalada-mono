import { ActivityIndicator, ListItem, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import parseGrade from "@utils/parseGrade";
import { ComponentProps, FC, ReactNode } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.RouteOptions>;

const ListItemOptions = ({
  children,
  ...props
}: ComponentProps<typeof ListItem> & { children: ReactNode }) => {
  return (
    <ListItem marginVertical="s" {...props}>
      <Text variant="p2R">{children}</Text>
    </ListItem>
  );
};

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

  return (
    <Screen safeAreaDisabled padding="m">
      <Text variant="h1" marginBottom="m">
        {name}
      </Text>
      <ListItemOptions
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
      </ListItemOptions>
      {Wall.topos.length > 0 && (
        <ListItemOptions
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
              screen: RoutesManagerNavigationRoutes.DrawRoute,
              params: {
                route: { id, position },
                wallId,
                topoId: Wall.topos[0].id,
              },
            })
          }
        >
          Editar topo
        </ListItemOptions>
      )}
      <ListItemOptions
        onPress={() =>
          navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
            wallId,
            zoneId,
            extendedRouteId: id,
          })
        }
      >
        Agregar extensión
      </ListItemOptions>
    </Screen>
  );
};

export default EditOptions;
