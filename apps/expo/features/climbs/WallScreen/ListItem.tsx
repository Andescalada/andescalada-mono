import { Box, ListItem as UIListItm, Pressable, Text } from "@andescalada/ui";
import { ComponentProps, FC, ReactNode, useMemo } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeInDown,
  FadeOutLeft,
  Layout,
  SlideOutLeft,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import { between } from "react-native-redash";

const AnimatedListItem = Animated.createAnimatedComponent(UIListItm);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedBox = Animated.createAnimatedComponent(Box);

interface Props extends Omit<ComponentProps<typeof AnimatedListItem>, "key"> {
  children: ReactNode;
  onDelete?: () => void;
  index: number;
  allowEdit?: boolean;
}

const SNAP_PERCENTAGE = 0.2;

const WITH_SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
};

const ListItem: FC<Props> = ({
  children,
  onDelete,
  index,
  allowEdit,
  ...props
}: Props) => {
  const width = useSharedValue(0);
  const translateX = useSharedValue(0);

  const range = useDerivedValue(() => {
    return {
      first: between(-translateX.value, 0, SNAP_PERCENTAGE * width.value),
      second: between(
        -translateX.value,
        SNAP_PERCENTAGE * width.value,
        0.5 * width.value,
      ),
      third: between(-translateX.value, 0.5 * width.value, width.value, true),
    };
  }, [translateX]);

  const deleteOnSwipe = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!!allowEdit)
        .runOnJS(true)
        .onEnd(() => {
          if (range.value.third) {
            onDelete && onDelete();
          }
        }),
    [allowEdit, onDelete, range.value.third],
  );

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!!allowEdit)
        .shouldCancelWhenOutside(true)
        .onChange((e) => {
          translateX.value += e.changeX;
        })
        .onEnd(() => {
          if (range.value.first) {
            translateX.value = withSpring(0, WITH_SPRING_CONFIG);
          }
          if (range.value.second) {
            translateX.value = withSpring(
              -width.value * SNAP_PERCENTAGE,
              WITH_SPRING_CONFIG,
            );
          }
          if (range.value.third) {
            translateX.value = withSpring(-width.value, WITH_SPRING_CONFIG);
          }
        }),
    [
      allowEdit,
      range.value.first,
      range.value.second,
      range.value.third,
      translateX,
      width.value,
    ],
  );

  const opacity = useDerivedValue(() => {
    const movement = translateX.value / (-width.value * SNAP_PERCENTAGE) || 0;
    if (movement > 0) return Math.abs(movement);
    return 0;
  }, [translateX]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: width.value },
        { translateX: translateX.value },
        { translateX: -width.value },
      ],
    };
  });
  const deleteStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const panGestures = Gesture.Simultaneous(pan, deleteOnSwipe);

  return (
    <GestureDetector gesture={panGestures}>
      <AnimatedBox
        entering={FadeInDown.delay(100 * index)}
        exiting={SlideOutLeft}
        layout={Layout.delay(500).springify()}
        marginVertical="s"
        minHeight={50}
      >
        <AnimatedPressable
          style={[deleteStyle]}
          backgroundColor="semantic.error"
          borderRadius={5}
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          layout={FadeOutLeft}
          onPress={() => {
            onDelete && onDelete();
          }}
          justifyContent="center"
          alignItems="flex-end"
          paddingRight="s"
        >
          <Text variant="p3B">Borrar</Text>
        </AnimatedPressable>
        <AnimatedListItem
          layout={FadeOutLeft}
          style={[props.style, style]}
          onLayout={(e) => {
            width.value = e.nativeEvent.layout.width;
          }}
          {...props}
        >
          {children}
        </AnimatedListItem>
      </AnimatedBox>
    </GestureDetector>
  );
};

export default ListItem;
