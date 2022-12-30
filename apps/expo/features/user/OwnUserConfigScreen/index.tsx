import {
  Box,
  Ionicons,
  ListItem,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import { useAppDispatch } from "@hooks/redux";
import useGlobalPermissions from "@hooks/useGlobalPermissions";
import { logoutAuth0 } from "@store/auth";
import { GlobalPermissions } from "@utils/auth0/types";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import { ComponentProps, FC } from "react";
import { Alert } from "react-native";

type Props = UserNavigationScreenProps<UserNavigationRoutes.OwnUserConfig>;

const ListItemConfig = ({
  title,
  subtitle,
  ...props
}: ComponentProps<typeof ListItem> & { title: string; subtitle?: string }) => {
  return (
    <ListItem
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-end"
      margin="s"
      {...props}
    >
      <Box>
        <Text variant="p1R">{title}</Text>
        {subtitle && (
          <Text variant="tooltip" marginTop="xs">
            {subtitle}
          </Text>
        )}
      </Box>
      <Box justifyContent="center">
        <Ionicons
          name="chevron-forward-circle"
          size={30}
          color="grayscale.300"
        />
      </Box>
    </ListItem>
  );
};

const OwnUserConfigScreen: FC<Props> = ({ navigation }) => {
  const globalPermissions = useGlobalPermissions();
  const permanentDelete = trpc.user.permanentDelete.useMutation();
  const deactivate = trpc.user.deactivate.useMutation();
  const dispatch = useAppDispatch();
  const logout = () => dispatch(logoutAuth0());
  return (
    <Screen safeAreaDisabled margin="m">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListItemConfig
          title="Sistema de graduación"
          onPress={() => {
            navigation.navigate(UserNavigationRoutes.GradingSystem);
          }}
        />
        <ListItemConfig
          title="Información personal"
          onPress={() => {
            navigation.navigate(UserNavigationRoutes.PersonalInfo);
          }}
        />
        {globalPermissions?.includes(GlobalPermissions.CRUD_ROLES) && (
          <ListItemConfig
            title="Gestionar roles de usuarios"
            subtitle="Solo administradores Andescalada"
            variant="accent"
            onPress={() => {
              navigation.navigate(UserNavigationRoutes.ManageUserRoles);
            }}
          />
        )}
        {globalPermissions?.includes(GlobalPermissions.CRUD_ZONES) && (
          <ListItemConfig
            title="Agregar zona"
            subtitle="Solo administradores Andescalada"
            variant="accent"
            onPress={() => {
              navigation.navigate(UserNavigationRoutes.CreateZone);
            }}
          />
        )}
        {globalPermissions?.includes(GlobalPermissions.REVIEW_ZONE) && (
          <ListItemConfig
            title="Solicitudes de revisión"
            subtitle="Solo administradores Andescalada"
            variant="accent"
            onPress={() => {
              navigation.navigate(UserNavigationRoutes.ZoneReviewManager);
            }}
          />
        )}
        <ListItemConfig
          title="Desactivar cuenta"
          variant="warning"
          onPress={() => {
            Alert.alert(
              "Eliminar cuenta",
              "¿Estás seguro de que quieres desactivar tu cuenta? Si vuelves a iniciar sesión se activará. No aparecerás en las búsquedas de usuarios y no podrás volver a publicar rutas.",
              [
                { text: "Cancelar" },
                {
                  text: "Desactivar",
                  style: "destructive",
                  onPress: () => {
                    deactivate.mutate();
                    logout();
                  },
                },
              ],
            );
          }}
        />
        <ListItemConfig
          title="Eliminar cuenta"
          variant="danger"
          onPress={() => {
            Alert.alert(
              "Eliminar cuenta",
              "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.",
              [
                { text: "Cancelar" },
                {
                  text: "Eliminar",
                  style: "destructive",
                  onPress: () => {
                    permanentDelete.mutate();
                    logout();
                  },
                },
              ],
            );
          }}
        />
        {globalPermissions.includes(GlobalPermissions.DEVELOP_INFO) && (
          <>
            <Text>{`Ultima actualización: ${new Date(
              Updates.manifest?.createdAt,
            ).toLocaleString("es-CL")}`}</Text>
            <Text>{`Id actualización: ${Updates.updateId}`}</Text>
            <Text>{`Version: ${Constants.expoConfig?.version}`}</Text>
            <Text>{`SDK: ${Updates.runtimeVersion}`}</Text>
          </>
        )}
      </ScrollView>
    </Screen>
  );
};

export default OwnUserConfigScreen;
