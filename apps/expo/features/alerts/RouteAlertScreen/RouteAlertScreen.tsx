import routeAlertKind from "@andescalada/common-assets/routeAlertKind";
import routeAlertSeverity from "@andescalada/common-assets/routeAlertSeverity";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { Box, Button, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import useRouteAlert from "@features/alerts/RouteAlertScreen/useRouteAlert";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import useIsConnected from "@hooks/useIsConnected";
import useOwnInfo from "@hooks/useOwnInfo";
import useRootNavigation from "@hooks/useRootNavigation";
import { LOCAL_DATABASE } from "@local-database/hooks/types";
import useDeleteRouteAlertMutation from "@local-database/hooks/useDeleteRouteAlertMutation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useQueryClient } from "@tanstack/react-query";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { FC } from "react";
import { Alert } from "react-native";

type Props = AlertsScreenProps<AlertsRoutes.RouteAlert>;

const RouteAlertScreen: FC<Props> = ({
  navigation,
  route: {
    params: { routeAlertId, zoneId, isSynced },
  },
}) => {
  const { data } = useRouteAlert({ id: routeAlertId, zoneId, isSynced });

  const { gradeLabel } = useGradeSystem();

  const ownInfo = useOwnInfo();

  const rootNavigation = useRootNavigation();
  const isConnected = useIsConnected();

  const onEdit = () => {
    if (!isConnected && isSynced) {
      Alert.alert(
        "No se puede editar",
        "Vuelve a intentarlo cuando tengas conexión a internet",
      );
      return;
    }
    if (!data) return;
    navigation.navigate(AlertsRoutes.AddRouteAlert, {
      zoneId,
      defaultValues: {
        id: data.id,
        kind: data.kind,
        severity: data.severity,
        description: data.description,
        title: data.title,
        dueDate: data.dueDate && data.dueDate?.valueOf(),
        route: {
          id: data.Route.id,
          name: data.Route.name,
          sectorName: data.Route.sectorName,
        },
      },
    });
  };

  const deleteRemote = trpc.alerts.deleteById.useMutation({
    onSuccess: () => {
      utils.alerts.invalidate();
    },
  });
  const deleteLocal = useDeleteRouteAlertMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([LOCAL_DATABASE]);
    },
  });

  const queryClient = useQueryClient();
  const utils = trpc.useContext();

  const deleteRouteAlert = (id: string) => {
    if (isSynced) {
      deleteRemote.mutate({ id });
    } else {
      deleteLocal.mutate({ id });
    }
  };

  const onDelete = () => {
    if (!isConnected && isSynced) {
      Alert.alert(
        "No se puede eliminar",
        "Vuelve a intentarlo cuando tengas conexión a internet",
      );
      return;
    }
    Alert.alert("¿Estás seguro?", "Esta acción no se puede deshacer", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          if (!data) return;
          deleteRouteAlert(data.id);
          navigation.goBack();
        },
      },
    ]);
  };

  if (!data) return null;
  return (
    <Screen padding="m" safeAreaDisabled gap="s">
      <Box
        alignItems="center"
        justifyContent="flex-end"
        flexDirection="row"
        gap="s"
      >
        {ownInfo?.data?.id === data?.Author?.id && (
          <>
            <Button
              variant="infoSimplified"
              title="Editar"
              titleVariant="p3R"
              icon="pencil-outline"
              flexDirection="row-reverse"
              gap="s"
              iconProps={{ size: 16 }}
              padding="s"
              onPress={onEdit}
            />
            <Button
              variant="errorSimplified"
              title="Eliminar"
              titleVariant="p3R"
              icon="close-circle"
              flexDirection="row-reverse"
              gap="s"
              iconProps={{ size: 20 }}
              padding="s"
              onPress={onDelete}
            />
          </>
        )}
        <Button
          variant="warningSimplified"
          title="Desestimar"
          titleVariant="p3R"
          icon="remove-circle"
          flexDirection="row-reverse"
          gap="s"
          iconProps={{ size: 20 }}
          padding="s"
        />
      </Box>
      <Text variant="h1">{data.title}</Text>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {data.Author && (
          <Box flexDirection="row" gap="s" alignItems="center">
            <UserProfileImage
              publicId={data.Author.profilePhoto?.publicId || undefined}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
            <Box>
              <Text>Autor/a</Text>
              <Text>{"@" + data.Author.username}</Text>
            </Box>
          </Box>
        )}
        <Box alignItems="flex-end">
          <Text>Última actualización</Text>
          <Text>{data.updatedAt.toLocaleDateString("es-CL")}</Text>
        </Box>
      </Box>
      <Box flexDirection="row" alignItems="center" gap="s" marginTop="s">
        <Box
          backgroundColor="semantic.info"
          borderRadius={16}
          padding="xs"
          paddingHorizontal="s"
        >
          <Text>{"Tipo: " + routeAlertKind(data.kind).label}</Text>
        </Box>
        <Box
          borderRadius={16}
          padding="xs"
          paddingHorizontal="s"
          backgroundColor={routeAlertSeverity(data.severity).backgroundColor}
        >
          <Text color={routeAlertSeverity(data.severity).color}>
            {"Gravedad: " + routeAlertSeverity(data.severity).label}
          </Text>
        </Box>
      </Box>
      <Box bg="backgroundContrast" borderRadius={8} padding="m">
        <Text variant="p2R" color="background">
          {data.description ?? "Sin descripción"}
        </Text>
      </Box>
      {data.Route && (
        <Box>
          <Text variant="h2">Ruta</Text>
          <Pressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            borderColor="grayscale.300"
            borderWidth={2}
            borderRadius={8}
            padding="m"
            onPress={() => {
              rootNavigation.navigate(RootNavigationRoutes.Climbs, {
                screen: ClimbsNavigationRoutes.Route,
                params: {
                  routeId: data.Route.id,
                  routeName: data.Route.name,
                  zoneId,
                },
              });
            }}
          >
            <Box flexDirection="row" gap="s" flex={1}>
              <Box>
                <Text variant="p1R">{data.Route.name}</Text>
                <Text>
                  {data.Route.kind &&
                    `${routeKindLabel(data.Route.kind).long} - `}
                  <Text color="grayscale.500">{data.Route.sectorName}</Text>
                </Text>
              </Box>
            </Box>
            {data.Route.RouteGrade && (
              <Text variant="p1R">
                {gradeLabel(
                  {
                    grade: data.Route.RouteGrade.grade,
                    project: data.Route.RouteGrade.project,
                  },
                  data.Route.kind,
                )}
              </Text>
            )}
          </Pressable>
        </Box>
      )}
    </Screen>
  );
};

export default RouteAlertScreen;
