import ImageViewerScreen from "@features/imageManager/ImageViewerScreen";
import {
  ImageManagerNavigationParamList,
  ImageManagerRoutes,
} from "@features/imageManager/Navigation/types";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<ImageManagerNavigationParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ImageManagerRoutes.ImageViewer}
        component={ImageViewerScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
