import AddNewZoneScreen from "@features/zoneManager/AddNewZoneScreen";
import {
  ZoneManagerNavigationParamList,
  ZoneManagerRoutes,
} from "@features/zoneManager/Navigation/types";
import SelectZoneLocationScreen from "@features/zoneManager/SelectZoneLocationScreen";
import ZoneOnboardingScreen from "@features/zoneManager/ZoneOnboardingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import backHeader from "@utils/navigationBackHeader";

const Stack = createStackNavigator<ZoneManagerNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ZoneManagerRoutes.AddNewZoneScreen}
        component={AddNewZoneScreen}
        options={{
          title: "Crea una nueva zona",
          ...backHeader,
        }}
      />
      <Stack.Screen
        name={ZoneManagerRoutes.SelectZoneLocationScreen}
        component={SelectZoneLocationScreen}
      />
      <Stack.Screen
        name={ZoneManagerRoutes.ZoneOnboarding}
        component={ZoneOnboardingScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
