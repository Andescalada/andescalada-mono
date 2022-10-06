import { BackButton } from "@andescalada/ui";
import OwnUserConfigScreen from "@features/user/OwnUserConfigScreen";
import { createStackNavigator } from "@react-navigation/stack";

import { UserNavigationParamList, UserNavigationRoutes } from "./types";

const Stack = createStackNavigator<UserNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "Rubik-500", fontSize: 18 },
        headerBackTitleStyle: {
          fontFamily: "Rubik-400",
        },

        headerLeft({ onPress }) {
          return <BackButton onPress={onPress} />;
        },
      }}
    >
      <Stack.Screen
        name={UserNavigationRoutes.OwnUserConfig}
        component={OwnUserConfigScreen}
        options={{ title: "Configuraciones", headerBackTitle: "Atrás" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
