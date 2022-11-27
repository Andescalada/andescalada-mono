import { A, Text } from "@andescalada/ui";
import Conditional from "@utils/conditionalVars";
import {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  Gesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
import {
  FadeInDown,
  FadeOutLeft,
  Layout,
  runOnJS,
  SharedValue,
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
  containerProps?: Omit<ComponentProps<typeof A.Box>, "key">;
  routeName: string;
  hasFailed?: SharedValue<boolean>;
}

const SNAP_PERCENTAGE = 0.2;
export const MIN_HEIGHT = 50;
const TOUCH_SLOP = 5;
const TIME_TO_ACTIVATE_PAN = 100;

const WITH_SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
};

export interface ListItemRef extends Partial<RefObject<GestureType>> {
  reset: () => void;
}

const ListItem: ForwardRefRenderFunction<ListItemRef, Props> = (
  { children, onDelete, onEdit, index, allowEdit, containerProps, ...props },
  ref,
) => {
  const width = useSharedValue(0);
  const translateX = useSharedValue(0);

  const reset = useCallback(() => {
    translateX.value = withSpring(0, WITH_SPRING_CONFIG);
  }, [translateX]);

  useImperativeHandle(
    ref,
    () => ({
      reset,
    }),
    [reset],
  );

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

  const deleteFnProp = useCallback(() => {
    if (onDelete) onDelete();
  }, [onDelete]);
  const editFnProp = useCallback(() => {
    if (onEdit) onEdit();
  }, [onEdit]);

  const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!!allowEdit)
        .manualActivation(true)
        .shouldCancelWhenOutside(true)
        .onTouchesDown((e) => {
          touchStart.value = {
            x: e.changedTouches[0].x,
            y: e.changedTouches[0].y,
            time: Date.now(),
          };
        })
        .onTouchesMove((e, state) => {
          if (Date.now() - touchStart.value.time > TIME_TO_ACTIVATE_PAN) {
            state.activate();
            if (props.hasFailed) props.hasFailed.value = false;
          } else if (
            Math.abs(touchStart.value.x - e.changedTouches[0].x) > TOUCH_SLOP ||
            Math.abs(touchStart.value.y - e.changedTouches[0].y) > TOUCH_SLOP
          ) {
            translateX.value = withSpring(0, WITH_SPRING_CONFIG);
            state.fail();
            if (props.hasFailed) props.hasFailed.value = true;
          }
        })
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
            runOnJS(deleteFnProp)();
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
            runOnJS(editFnProp)();
            translateX.value = withSpring(width.value, WITH_SPRING_CONFIG);
            translateX.value = withDelay(
              1000,
              withSpring(0, WITH_SPRING_CONFIG),
            );
          }
        }),
    [
      allowEdit,
      deleteFnProp,
      editFnProp,
      props.hasFailed,
      rangeLeft.value.first,
      rangeLeft.value.second,
      rangeLeft.value.third,
      rangeRight.value.first,
      rangeRight.value.second,
      rangeRight.value.third,
      touchStart,
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

  return (
    <GestureDetector gesture={pan}>
      <A.Box
        entering={FadeInDown.delay(100 * index)}
        exiting={SlideOutLeft}
        layout={Layout.delay(500).springify()}
        marginVertical="s"
        minHeight={MIN_HEIGHT}
        collapsable={Conditional.disableForAndroid}
        {...containerProps}
      >
        <A.Pressable
          style={[rightStyle]}
          collapsable={false}
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
            reset();
          }}
          justifyContent="center"
          paddingLeft="s"
        >
          <Text variant="p3B">Editar</Text>
        </A.Pressable>

        <A.ListItem
          layout={FadeOutLeft}
          style={[props.style, style]}
          collapsable={false}
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
