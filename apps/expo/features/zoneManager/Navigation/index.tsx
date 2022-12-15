import AddNewZoneScreen from "@features/zoneManager/AddNewZoneScreen";
import {
  ZoneManagerNavigationParamList,
  ZoneManagerRoutes,
} from "@features/zoneManager/Navigation/types";
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
    </Stack.Navigator>
  );
};

export default Navigator;
