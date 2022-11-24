import Ionicons from "@expo/vector-icons/Ionicons";
import {
  add,
  Canvas,
  Circle,
  Easing,
  LinearGradient,
  mix,
  sub,
  useComputedValue,
  useLoop,
  vec,
} from "@shopify/react-native-skia";
import { useTheme } from "@shopify/restyle";
import { ComponentProps, FC } from "react";

import Box from "../Box/Box";
import Pressable from "../Pressable/Pressable";
import { Theme } from "../Theme/theme";

interface Props extends ComponentProps<typeof Pressable> {
  iconProps?: Partial<ComponentProps<typeof Ionicons>>;
}

const SIZE = 40;

const BackButton: FC<Props> & { Transparent: typeof Transparent } = ({
  iconProps,
  ...props
}) => {
  const theme = useTheme<Theme>();
  const progress = useLoop({ duration: 1000, easing: Easing.cubic });

  const start = useComputedValue(
    () => sub(vec(0, 0), vec(mix(progress.current, 0, SIZE * Math.PI), 0)),
    [progress],
  );
  const end = useComputedValue(
    () => add(vec(SIZE, 0), vec(0, mix(progress.current, 0, SIZE * Math.PI))),
    [progress],
  );
  return (
    <Pressable
      onPress={props.onPress}
      width={SIZE}
      height={SIZE}
      justifyContent={"center"}
      alignItems={"stretch"}
      {...props}
    >
      <Canvas
        style={{
          flex: 1,
        }}
      >
        <Circle r={SIZE / 2} cx={SIZE / 2} cy={SIZE / 2}>
          <LinearGradient
            start={start}
            end={end}
            colors={[theme.colors.gradientB, theme.colors.gradientA]}
          />
        </Circle>
      </Canvas>
      <Ionicons
        name="arrow-back"
        size={SIZE - 10}
        color="black"
        style={{ position: "absolute", left: 5, top: 5 }}
        {...iconProps}
      />
    </Pressable>
  );
};

const Transparent = ({ iconProps, ...props }: Props) => {
  return (
    <Box position="absolute" top={50} left={0} margin="l" marginLeft="s">
      <Pressable
        backgroundColor={"transparentButtonBackground"}
        borderRadius={100}
        padding="s"
        onPress={props.onPress}
        {...props}
      >
        <Ionicons name="arrow-back" size={30} {...iconProps} />
      </Pressable>
    </Box>
  );
};

BackButton.Transparent = Transparent;

export default BackButton;
