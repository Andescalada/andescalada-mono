import { A, Box, Ionicons, Pressable } from "@andescalada/ui";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useAppTheme } from "@hooks/useAppTheme";
import { setRouteStrokeWidth, setShowRoutes } from "@store/localConfigs";
import { FC, useEffect } from "react";
import { SlideInRight, SlideOutRight } from "react-native-reanimated";
import Slider from "rn-vertical-slider";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  defaultRouteStrokeWidth?: number;
}

const RoutePathDrawConfig: FC<Props> = ({
  show,
  setShow,
  defaultRouteStrokeWidth = 1,
}) => {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const { routeStrokeWidth } = useAppSelector((state) => state.localConfig);

  useEffect(() => {
    dispatch(setRouteStrokeWidth(defaultRouteStrokeWidth));
  }, [defaultRouteStrokeWidth, dispatch]);

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
            color="grayscale.transparent.80.200"
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
        </Box>
      </A.Box>
    );
  }
  return <Box />;
};

export default RoutePathDrawConfig;
