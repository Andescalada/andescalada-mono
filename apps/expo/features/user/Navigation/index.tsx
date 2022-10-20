import { BackButton } from "@andescalada/ui";
import textVariants from "@andescalada/ui/Theme/textVariants";
import CreateZoneScreen from "@features/user/CreateZoneScreen";
import GradingSystemConfigScreen from "@features/user/GradingSystemConfigScreen";
import ManageUserRolesScreen from "@features/user/ManageUserRolesScreen";
import OwnUserConfigScreen from "@features/user/OwnUserConfigScreen";
import PersonalInfoConfigScreen from "@features/user/PersonalInfoConfigScreen";
import { createStackNavigator } from "@react-navigation/stack";

import { UserNavigationParamList, UserNavigationRoutes } from "./types";

const { fontFamily, fontSize, lineHeight } = textVariants.p1R;

const Stack = createStackNavigator<UserNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily, fontSize, lineHeight },
        headerLeft({ onPress }) {
          return <BackButton onPress={onPress} marginLeft="s" />;
        },
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
    </Stack.Navigator>
  );
};

export default Navigator;
