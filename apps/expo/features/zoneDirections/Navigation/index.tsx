import AddDirectionsScreen from "@features/zoneDirections/AddDirectionsScreen";
import ZoneDirectionsScreen from "@features/zoneDirections/ZoneDirectionsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import backHeader from "@utils/navigationBackHeader";

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
        options={{
          title: "Cómo llegar",
          ...backHeader,
        }}
      />
      <Stack.Screen
        component={AddDirectionsScreen}
        name={ZoneDirectionsRoutes.AddDirections}
        options={{
          title: "Agregar cómo llegar",
          ...backHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
