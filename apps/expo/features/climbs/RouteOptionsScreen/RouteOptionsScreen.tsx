import {
  ActivityIndicator,
  Box,
  ListItemOption,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { MultiPitchManagerRoutes } from "@features/multiPitchManager/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import featureFlags from "@utils/featureFlags";
import parseGrade from "@utils/parseGrade";
import { FC } from "react";
import { Alert } from "react-native";

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

  const utils = trpc.useContext();
  const convertToMultiPitch = trpc.multiPitch.convertRoute.useMutation({
    onSuccess: ({ name, id }) => {
      utils.routes.byId.invalidate(routeId);
      rootNavigation.navigate(RootNavigationRoutes.MultiPitchManager, {
        screen: MultiPitchManagerRoutes.MultiPitchManager,
        params: {
          multiPitchId: id,
          multiPitchName: name,
          zoneId,
          topoId: Wall.topos[0].id,
          wallId,
        },
      });
    },
  });

  if (convertToMultiPitch.isLoading || !route.data) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
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
        Editar información
      </ListItemOption>
      {Wall.topos.length > 0 && (
        <ListItemOption
          onPress={navigateToDrawRoute}
          visible={permission.has("Update")}
        >
          Editar ruta
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
        visible={
          permission.has("Create") &&
          featureFlags.multiPitch &&
          !route.data.Pitch
        }
        onPress={() =>
          Alert.alert(
            "Convertir a multi largo",
            "¿Seguro que quieres convertir esta ruta en multilargo?, el cambio es irreversible",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Convertir",
                style: "default",
                onPress: () => {
                  if (route.data?.id)
                    convertToMultiPitch.mutate({
                      routeId: route.data.id,
                      zoneId,
                    });
                },
              },
              {
                text: "Más información",
                onPress: () => {
                  Alert.alert(
                    "Sobre multi largos",
                    "Convertir una ruta en multi largos te permitirá agregar más rutas sobre la actual y desbloquear nuevas funcionalidades.",
                    [{ text: "Entendido" }],
                  );
                },
              },
            ],
          )
        }
      >
        Convertir en multi largo
      </ListItemOption>
    </Screen>
  );
};

export default EditOptions;
