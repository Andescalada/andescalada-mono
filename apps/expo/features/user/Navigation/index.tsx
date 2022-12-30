import CreateZoneScreen from "@features/user/CreateZoneScreen";
import GradingSystemConfigScreen from "@features/user/GradingSystemConfigScreen";
import ManageUserRolesScreen from "@features/user/ManageUserRolesScreen";
import NotificationsScreen from "@features/user/NotificationsScreen";
import OwnUserConfigScreen from "@features/user/OwnUserConfigScreen";
import PersonalInfoConfigScreen from "@features/user/PersonalInfoConfigScreen";
import ZoneReviewManagerScreen from "@features/user/ZoneReviewManagerScreen";
import { createStackNavigator } from "@react-navigation/stack";
import backHeader from "@utils/navigationBackHeader";

import { UserNavigationParamList, UserNavigationRoutes } from "./types";

const Stack = createStackNavigator<UserNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...backHeader,
      }}
    >
      <Stack.Screen
        name={UserNavigationRoutes.OwnUserConfig}
        component={OwnUserConfigScreen}
        options={{ title: "Configuración" }}
      />
      <Stack.Screen
        name={UserNavigationRoutes.GradingSystem}
        component={GradingSystemConfigScreen}
        options={{ title: "Sistema de graduación" }}
      />
      <Stack.Screen
        name={UserNavigationRoutes.PersonalInfo}
        component={PersonalInfoConfigScreen}
        options={{ title: "Información personal" }}
      />
      <Stack.Screen
        name={UserNavigationRoutes.CreateZone}
        component={CreateZoneScreen}
        options={{ title: "Crear zona" }}
      />
      <Stack.Screen
        name={UserNavigationRoutes.ManageUserRoles}
        component={ManageUserRolesScreen}
        options={{ title: "Gestionar roles" }}
      />
      <Stack.Screen
        name={UserNavigationRoutes.ZoneReviewManager}
        component={ZoneReviewManagerScreen}
        options={{ title: "Solicitudes de revisión" }}
      />
      <Stack.Screen
        name={UserNavigationRoutes.Notifications}
        component={NotificationsScreen}
        options={{ title: "Notificaciones" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
