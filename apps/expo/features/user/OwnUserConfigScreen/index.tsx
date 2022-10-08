import { Box, ListItem, Screen, Text } from "@andescalada/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import { useAppSelector } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import { GlobalPermissions } from "@utils/auth0/types";
import { ComponentProps, FC } from "react";

type Props = UserNavigationScreenProps<UserNavigationRoutes.OwnUserConfig>;

const ListItemConfig = ({
  title,
  subtitle,
  ...props
}: ComponentProps<typeof ListItem> & { title: string; subtitle?: string }) => {
  const theme = useAppTheme();
  return (
    <ListItem
      variant="transparent"
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
      <Ionicons
        name="chevron-forward-circle"
        size={30}
        color={theme.colors["grayscale.300"]}
      />
    </ListItem>
  );
};

const OwnUserConfigScreen: FC<Props> = ({ navigation }) => {
  const { globalPermissions } = useAppSelector((state) => state.auth);
  return (
    <Screen safeAreaDisabled margin="m">
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
          title="Asignar rol a usuario"
          subtitle="Solo administradores Andescalada"
          variant="accent"
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
    </Screen>
  );
};

export default OwnUserConfigScreen;
