import { Box, Pressable, Screen } from "@andescalada/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import TopoViewer from "@features/routesManager/components/TopoViewer";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { FC } from "react";

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoViewer>;

const TopoViewerScreen: FC<Props> = ({ route: navRoute, navigation }) => {
  const { topoId, routeId } = navRoute.params;

  return (
    <Screen>
      <TopoViewer routeId={routeId} topoId={topoId} />
      <Box position="absolute" top={50} left={0} margin="l" marginLeft={"s"}>
        <Pressable
          backgroundColor={"transparentButtonBackground"}
          borderRadius={100}
          padding="s"
          onPress={navigation.goBack}
        >
          <Ionicons name="arrow-back" size={30} />
        </Pressable>
      </Box>
    </Screen>
  );
};

export default TopoViewerScreen;
