import ZonesListScreen from "@features/photoContest/ZonesListScreen";
import { createStackNavigator } from "@react-navigation/stack";

import { PhotoContestNavigationParamList, PhotoContestRoutes } from "./types";

const Stack = createStackNavigator<PhotoContestNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={ZonesListScreen}
        name={PhotoContestRoutes.ZonesList}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
