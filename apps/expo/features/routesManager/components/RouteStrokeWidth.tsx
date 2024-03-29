import { A, Box, Ionicons, Pressable } from "@andescalada/ui";
import { useAppTheme } from "@hooks/useAppTheme";
import { FC } from "react";
import { SlideInRight, SlideOutRight } from "react-native-reanimated";
import Slider from "rn-vertical-slider";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  value: number;
  onChange: (v: number) => void;
}

const HEIGHT = 250;

const RouteStrokeWidth: FC<Props> = ({ show, setShow, value, onChange }) => {
  const theme = useAppTheme();

  if (show) {
    return (
      <A.Box
        position="absolute"
        top={50}
        right={0}
        height={HEIGHT}
        margin="s"
        marginTop="l"
        flexDirection="row"
        justifyContent="flex-end"
        entering={SlideInRight}
        exiting={SlideOutRight}
      >
        <Pressable marginRight="s" onPress={() => setShow(false)}>
          <Ionicons
            name="close-circle-sharp"
            size={30}
            color="grayscale.transparent.80.200"
          />
        </Pressable>
        <Box>
          <Slider
            value={value}
            min={0.1}
            max={1.5}
            height={HEIGHT + 50}
            width={20}
            minimumTrackTintColor={theme.colors["grayscale.transparent.80.200"]}
            maximumTrackTintColor={theme.colors["grayscale.transparent.80.600"]}
            onChange={onChange}
          />
        </Box>
      </A.Box>
    );
  }
  return <Box />;
};

export default RouteStrokeWidth;
