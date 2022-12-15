import AddNewZoneScreen from "@features/zoneManager/AddNewZoneScreen";
import {
  ZoneManagerNavigationParamList,
  ZoneManagerRoutes,
} from "@features/zoneManager/Navigation/types";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<ZoneManagerNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ZoneManagerRoutes.AddNewZoneScreen}
        component={AddNewZoneScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
