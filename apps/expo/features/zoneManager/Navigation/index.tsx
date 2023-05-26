import AddNewZoneScreen from "@features/zoneManager/AddNewZoneScreen";
import EditZoneLocationScreen from "@features/zoneManager/EditZoneLocationScreen";
import EditZoneScreen from "@features/zoneManager/EditZoneScreen";
import EditZoneStatusScreen from "@features/zoneManager/EditZoneStatusScreen";
import HowToPublishScreen from "@features/zoneManager/HowToPublishScreen";
import {
  ZoneManagerNavigationParamList,
  ZoneManagerRoutes,
} from "@features/zoneManager/Navigation/types";
import SelectZoneLocationScreen from "@features/zoneManager/SelectZoneLocationScreen";
import ZoneOnboardingScreen from "@features/zoneManager/ZoneOnboardingScreen";
import ZonesByRoleScreen from "@features/zoneManager/ZonesByRoleScreen";
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
        name={ZoneManagerRoutes.EditZone}
        component={EditZoneScreen}
        options={{
          title: "Editar zona",
          ...backHeader,
        }}
      />
      <Stack.Screen
        name={ZoneManagerRoutes.EditZoneStatus}
        component={EditZoneStatusScreen}
        options={{
          title: "Estado de publicación",
          ...backHeader,
        }}
      />
      <Stack.Screen
        name={ZoneManagerRoutes.SelectZoneLocation}
        component={SelectZoneLocationScreen}
      />
      <Stack.Screen
        name={ZoneManagerRoutes.HowToPublish}
        component={HowToPublishScreen}
      />
      <Stack.Screen
        name={ZoneManagerRoutes.ZoneOnboarding}
        component={ZoneOnboardingScreen}
      />
      <Stack.Screen
        name={ZoneManagerRoutes.ZonesByRole}
        component={ZonesByRoleScreen}
        options={{
          title: "Tus zonas",
          ...backHeader,
        }}
      />
      <Stack.Screen
        name={ZoneManagerRoutes.EditZoneLocation}
        component={EditZoneLocationScreen}
        // options={{
        //   title: "Tus zonas",
        //   ...backHeader,
        // }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
