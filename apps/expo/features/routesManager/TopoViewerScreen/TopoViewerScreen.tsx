import { A, Box, Pressable, Screen } from "@andescalada/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import TopoViewer from "@features/routesManager/components/TopoViewer";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import { setRouteStrokeWidth } from "@store/localConfigs";
import { FC, useState } from "react";
import {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";
import Slider from "rn-vertical-slider";

type Props = RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoViewer>;

const TopoViewerScreen: FC<Props> = ({ route: navRoute, navigation }) => {
  const { topoId, routeId } = navRoute.params;

  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const { routeStrokeWidth } = useAppSelector((state) => state.localConfig);

  const [routesVisible, setRoutesVisible] = useState(true);
  const [showConfig, setShowConfig] = useState(false);

  return (
    <Screen>
      <TopoViewer
        routeId={routeId}
        topoId={topoId}
        strokeWidth={routeStrokeWidth}
        hide={!routesVisible}
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
        <A.Box
          position="absolute"
          top={50}
          right={0}
          height={200}
          margin="s"
          marginTop="l"
          flexDirection="row"
          justifyContent="flex-end"
          entering={SlideInRight}
          exiting={SlideOutRight}
        >
          <Pressable marginTop="s" onPress={() => setShowConfig(false)}>
            <Ionicons
              name="close-sharp"
              size={30}
              color={theme.colors["grayscale.transparent.80.200"]}
            />
          </Pressable>
          <Box alignItems="center" justifyContent="center">
            <Slider
              value={routeStrokeWidth}
              min={0.5}
              max={1.5}
              height={150}
              width={20}
              minimumTrackTintColor={
                theme.colors["grayscale.transparent.80.200"]
              }
              maximumTrackTintColor={
                theme.colors["grayscale.transparent.80.600"]
              }
              onChange={(v) => dispatch(setRouteStrokeWidth(v))}
            />
            <Pressable onPress={() => setRoutesVisible((prev) => !prev)}>
              <Ionicons
                name={routesVisible ? "eye-off" : "eye"}
                size={30}
                color={theme.colors["grayscale.transparent.80.200"]}
              />
            </Pressable>
          </Box>
        </A.Box>
      )}
    </Screen>
  );
};

export default TopoViewerScreen;
