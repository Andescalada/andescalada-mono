import { A, Box, Pressable, Screen } from "@andescalada/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import RoutePathConfig from "@features/routesManager/components/RoutePathConfig";
import TopoViewer from "@features/routesManager/components/TopoViewer";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { useAppSelector } from "@hooks/redux";
import { FC, useState } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoViewer>;

const TopoViewerScreen: FC<Props> = ({ route: navRoute, navigation }) => {
  const { topoId, routeId } = navRoute.params;

  const { routeStrokeWidth, showRoutes } = useAppSelector(
    (state) => state.localConfig,
  );

  const [showConfig, setShowConfig] = useState(false);

  return (
    <Screen>
      <TopoViewer
        routeId={routeId}
        topoId={topoId}
        strokeWidth={routeStrokeWidth}
        hide={!showRoutes}
      />
      <Box position="absolute" top={50} left={0} margin="l" marginLeft="s">
        <Pressable
          backgroundColor={"transparentButtonBackground"}
          borderRadius={100}
          padding="s"
          onPress={navigation.goBack}
        >
          <Ionicons name="arrow-back" size={30} />
        </Pressable>
      </Box>
      {!showConfig && (
        <A.Box
          position="absolute"
          top={50}
          right={0}
          margin="l"
          marginRight="s"
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Pressable
            backgroundColor={"transparentButtonBackground"}
            borderRadius={100}
            padding="s"
            onPress={() => setShowConfig(true)}
          >
            <Ionicons name="options-outline" size={30} />
          </Pressable>
        </A.Box>
      )}
      {showConfig && (
        <RoutePathConfig show={showConfig} setShow={setShowConfig} />
      )}
    </Screen>
  );
};

export default TopoViewerScreen;
