import ZoneDirectionsScreen from "@features/zoneDirections/ZoneDirectionsScreen";
import { createStackNavigator } from "@react-navigation/stack";

import {
  ZoneDirectionsNavigationParamList,
  ZoneDirectionsRoutes,
} from "./types";

const Stack = createStackNavigator<ZoneDirectionsNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={ZoneDirectionsScreen}
        name={ZoneDirectionsRoutes.ZoneDirections}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
