import {
  ZoneLocationNavigationParamList,
  ZoneLocationRoutes,
} from "@features/zoneLocation/Navigation/types";
import ZoneMapScreen from "@features/zoneLocation/ZoneMapScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<ZoneLocationNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={ZoneMapScreen}
        name={ZoneLocationRoutes.ZoneMap}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
