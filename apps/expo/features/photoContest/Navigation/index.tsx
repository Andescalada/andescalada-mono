import UploadTopoScreen from "@features/photoContest/UploadTopoScreen";
import ZoneScreen from "@features/photoContest/ZoneScreen";
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
      <Stack.Screen component={ZoneScreen} name={PhotoContestRoutes.Zone} />
      <Stack.Screen
        component={UploadTopoScreen}
        name={PhotoContestRoutes.UploadTopo}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
