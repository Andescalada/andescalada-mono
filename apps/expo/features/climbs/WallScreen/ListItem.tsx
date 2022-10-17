import { A, Text } from "@andescalada/ui";
import {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useImperativeHandle,
  useMemo,
} from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  FadeInDown,
  FadeOutLeft,
  Layout,
  SlideOutLeft,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import { between } from "react-native-redash";

interface Props extends Omit<ComponentProps<typeof A.ListItem>, "key"> {
  children: ReactNode;
  onDelete?: () => void;
  onEdit?: () => void;
  index: number;
  allowEdit?: boolean;
}

const SNAP_PERCENTAGE = 0.2;

export const MIN_HEIGHT = 50;

const WITH_SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
};

export interface ListItemRef {
  undoDelete: () => void;
  undoEdit: () => void;
}

const ListItem: ForwardRefRenderFunction<ListItemRef, Props> = (
  { children, onDelete, onEdit, index, allowEdit, ...props },
  ref,
) => {
  const width = useSharedValue(0);
  const translateX = useSharedValue(0);

  const rangeLeft = useDerivedValue(() => {
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

  useImperativeHandle(ref, () => ({
    undoDelete: () => {
      translateX.value = withSpring(0, WITH_SPRING_CONFIG);
    },
    undoEdit: () => {
      translateX.value = withSpring(0, WITH_SPRING_CONFIG);
    },
  }));

  const rangeRight = useDerivedValue(() => {
    return {
      first: between(translateX.value, 0, SNAP_PERCENTAGE * width.value),
      second: between(
        translateX.value,
        SNAP_PERCENTAGE * width.value,
        0.5 * width.value,
      ),
      third: between(translateX.value, 0.5 * width.value, width.value, true),
    };
  }, [translateX]);

  const deleteOnSwipe = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!!allowEdit)
        .runOnJS(true)
        .onEnd(() => {
          if (rangeLeft.value.third) {
            onDelete && onDelete();
          }
          if (rangeRight.value.third) {
            onEdit && onEdit();
          }
        }),
    [
      allowEdit,
      onDelete,
      rangeLeft.value.third,
      onEdit,
      rangeRight.value.third,
    ],
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
          if (rangeLeft.value.first) {
            translateX.value = withSpring(0, WITH_SPRING_CONFIG);
          }
          if (rangeLeft.value.second) {
            translateX.value = withSpring(
              -width.value * SNAP_PERCENTAGE,
              WITH_SPRING_CONFIG,
            );
          }
          if (rangeLeft.value.third) {
            translateX.value = withSpring(-width.value, WITH_SPRING_CONFIG);
          }
          if (rangeRight.value.first) {
            translateX.value = withSpring(0, WITH_SPRING_CONFIG);
          }
          if (rangeRight.value.second) {
            translateX.value = withSpring(
              width.value * SNAP_PERCENTAGE,
              WITH_SPRING_CONFIG,
            );
          }
          if (rangeRight.value.third) {
            translateX.value = withSpring(width.value, WITH_SPRING_CONFIG);
            translateX.value = withDelay(
              1000,
              withSpring(0, WITH_SPRING_CONFIG),
            );
          }
        }),
    [
      allowEdit,
      rangeLeft.value.first,
      rangeLeft.value.second,
      rangeLeft.value.third,
      rangeRight.value.first,
      rangeRight.value.second,
      rangeRight.value.third,
      translateX,
      width.value,
    ],
  );

  const opacityRight = useDerivedValue(() => {
    const movement = translateX.value / (-width.value * SNAP_PERCENTAGE) || 0;
    if (movement > 0) return Math.abs(movement);
    return 0;
  }, [translateX]);
  const opacityLeft = useDerivedValue(() => {
    const movement = translateX.value / (-width.value * SNAP_PERCENTAGE) || 0;
    if (movement < 0) return Math.abs(movement);
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
  const rightStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityRight.value,
      zIndex: opacityRight.value > 0 ? 100 : 1,
    };
  });
  const leftStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityLeft.value,
      zIndex: opacityLeft.value > 0 ? 100 : 1,
    };
  });

  const panGestures = Gesture.Simultaneous(pan, deleteOnSwipe);

  return (
    <GestureDetector gesture={panGestures}>
      <A.Box
        entering={FadeInDown.delay(100 * index)}
        exiting={SlideOutLeft}
        layout={Layout.delay(500).springify()}
        marginVertical="s"
        minHeight={MIN_HEIGHT}
      >
        <A.Pressable
          style={[rightStyle]}
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
        </A.Pressable>
        <A.Pressable
          style={[leftStyle]}
          backgroundColor="semantic.info"
          borderRadius={5}
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          layout={FadeOutLeft}
          onPress={() => {
            onEdit && onEdit();
          }}
          justifyContent="center"
          paddingLeft="s"
        >
          <Text variant="p3B">Editar</Text>
        </A.Pressable>

        <A.ListItem
          layout={FadeOutLeft}
          style={[props.style, style]}
          zIndex={1000}
          onLayout={(e) => {
            width.value = e.nativeEvent.layout.width;
          }}
          {...props}
        >
          {children}
        </A.ListItem>
      </A.Box>
    </GestureDetector>
  );
};

export default forwardRef(ListItem);
