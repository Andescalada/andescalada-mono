import { BackButton } from "@andescalada/ui";
import textVariants from "@andescalada/ui/Theme/textVariants";
import OwnUserConfigScreen from "@features/user/OwnUserConfigScreen";
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
        options={{ title: "Configuración", headerBackTitle: "Atrás" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
