import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  ActivityIndicator,
  Box,
  ListItemOption,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { MultiPitchManagerRoutes } from "@features/multiPitchManager/Navigation/types";
import useNavigateToRouteDrawer from "@hooks/useNavigateToRouteDrawer";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { inferProcedureOutput } from "@trpc/server";
import emptyArray from "@utils/emptyArray";
import featureFlags from "@utils/featureFlags";
import parseGrade from "@utils/parseGrade";
import { FC } from "react";
import { Alert } from "react-native";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.RouteOptions>;

const EditOptionsContainer: FC<Props> = ({
  route: {
    params: { routeId },
  },
}) => {
  const route = trpc.routes.byId.useQuery(routeId, {
    staleTime: 0,
    cacheTime: 0,
  });

  if (!route.data) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }
  return <EditOptionsScreen data={route.data} />;
};

const EditOptionsScreen = ({
  data,
}: {
  data: NonNullable<inferProcedureOutput<AppRouter["routes"]["byId"]>>;
}) => {
  const {
    params: { zoneId, wallId, routeId, isChildrenRoute },
  } =
    useRoute<ClimbsNavigationRouteProps<ClimbsNavigationRoutes.RouteOptions>>();

  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.RouteOptions>
    >();

  const { permission } = usePermissions({ zoneId });

  const rootNavigation = useRootNavigation();

  const { navigateToDrawRoute } = useNavigateToRouteDrawer({
    zoneId,
    wallId,
    id: routeId,
    position: data.position,
    topoId: data.Wall.topos[0].id,
    extendedRouteId: data.extendedRouteId,
    variantRouteId: data.variantRouteId,
  });

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

  const { name, id, kind, RouteGrade, unknownName, Wall } = data;

  if (convertToMultiPitch.isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  }

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
      {!emptyArray(Wall.topos) && (
        <ListItemOption
          onPress={navigateToDrawRoute}
          visible={permission.has("Update")}
        >
          Editar ruta
        </ListItemOption>
      )}
      <ListItemOption
        visible={permission.has("Create") && !isChildrenRoute}
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
        visible={permission.has("Create") && !isChildrenRoute}
        onPress={() =>
          navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
            wallId,
            zoneId,
            variantRouteId: id,
          })
        }
      >
        Agregar variante
      </ListItemOption>
      <ListItemOption
        visible={
          permission.has("Create") &&
          featureFlags.multiPitch &&
          !data.Pitch &&
          !isChildrenRoute
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
                  if (data?.id)
                    convertToMultiPitch.mutate({
                      routeId: data.id,
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

export default EditOptionsContainer;
