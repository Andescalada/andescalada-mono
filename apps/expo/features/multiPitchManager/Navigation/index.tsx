import AddPitchScreen from "@features/multiPitchManager/AddPitchScreen";
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
        options={{
          title: "Multi Largo",
          ...backHeader,
        }}
      />
      <Stack.Screen
        name={MultiPitchManagerRoutes.AddPitch}
        component={AddPitchScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
