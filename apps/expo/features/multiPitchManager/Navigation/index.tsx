import AddMultiPitchScreen from "@features/multiPitchManager/AddMultiPitchScreen";
import AddPitchScreen from "@features/multiPitchManager/AddPitchScreen";
import EditPitchScreen from "@features/multiPitchManager/EditPitchScreen";
import MultiPitchManagerScreen from "@features/multiPitchManager/MultiPitchManagerScreen";
import { createStackNavigator } from "@react-navigation/stack";
import backHeader from "@utils/navigationBackHeader";

import {
  MultiPitchManagerNavigationParamList,
  MultiPitchManagerRoutes,
} from "./types";

const Stack = createStackNavigator<MultiPitchManagerNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={MultiPitchManagerRoutes.MultiPitchManager}
        component={MultiPitchManagerScreen}
      />
      <Stack.Screen
        name={MultiPitchManagerRoutes.AddPitch}
        component={AddPitchScreen}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name={MultiPitchManagerRoutes.EditPitch}
        component={EditPitchScreen}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name={MultiPitchManagerRoutes.AddMultiPitch}
        component={AddMultiPitchScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
