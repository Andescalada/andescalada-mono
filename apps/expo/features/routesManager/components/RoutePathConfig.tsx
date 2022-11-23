import { A, Box, Pressable } from "@andescalada/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import { setRouteStrokeWidth, setShowRoutes } from "@store/localConfigs";
import { FC } from "react";
import { SlideInRight, SlideOutRight } from "react-native-reanimated";
import Slider from "rn-vertical-slider";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

const RoutePathConfig: FC<Props> = ({ show, setShow }) => {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const { routeStrokeWidth, showRoutes } = useAppSelector(
    (state) => state.localConfig,
  );

  if (show) {
    return (
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
        <Pressable marginTop="s" onPress={() => setShow(false)}>
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
            minimumTrackTintColor={theme.colors["grayscale.transparent.80.200"]}
            maximumTrackTintColor={theme.colors["grayscale.transparent.80.600"]}
            onChange={(v) => dispatch(setRouteStrokeWidth(v))}
          />
          <Pressable onPress={() => dispatch(setShowRoutes())}>
            <Ionicons
              name={showRoutes ? "eye-off" : "eye"}
              size={30}
              color={theme.colors["grayscale.transparent.80.200"]}
            />
          </Pressable>
        </Box>
      </A.Box>
    );
  }
  return <Box />;
};

export default RoutePathConfig;
