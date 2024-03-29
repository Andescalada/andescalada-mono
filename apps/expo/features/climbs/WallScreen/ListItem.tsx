import { A, Text } from "@andescalada/ui";
import Conditional from "@utils/conditionalVars";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  ComponentProps,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import {
  Gesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
import {
  measure,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
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
  onRightAction?: () => void;
  onLeftAction?: () => void;
  index: number;
  allowEdit?: boolean;
  containerProps?: Omit<ComponentProps<typeof A.Box>, "key">;
  hasFailed?: SharedValue<boolean>;
  onTouch?: () => void;
}

const SNAP_PERCENTAGE = 0.25;
const TOUCH_SLOP = 4;
const TIME_TO_ACTIVATE_PAN = 80;

const WITH_SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
};

export interface ListItemRef extends Partial<RefObject<GestureType>> {
  reset: () => void;
}

const ListItem: ForwardRefRenderFunction<ListItemRef, Props> = (
  {
    children,
    onRightAction: onRightAction,
    onLeftAction,
    onTouch,
    allowEdit,
    containerProps,
    ...props
  },
  ref,
) => {
  const width = useSharedValue(0);
  const translateX = useSharedValue(0);

  const animatedRef = useAnimatedRef();

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
    if (onRightAction) onRightAction();
  }, [onRightAction]);
  const editFnProp = useCallback(() => {
    if (onLeftAction) onLeftAction();
  }, [onLeftAction]);

  const touchFnProp = useCallback(() => {
    if (onTouch) onTouch();
  }, [onTouch]);

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
          runOnJS(touchFnProp)();
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
      touchFnProp,
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

  const rotation = useSharedValue<ScreenOrientation.Orientation>(0);

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener((e) => {
      rotation.value = e.orientationInfo.orientation;
    });
    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedRef]);

  useAnimatedReaction(
    () => rotation.value,
    () => {
      const dimensions = measure(animatedRef);
      if (!dimensions) return;
      width.value = dimensions.width;
    },
    [rotation.value],
  );

  return (
    <GestureDetector gesture={pan}>
      <A.Box collapsable={Conditional.disableForAndroid} {...containerProps}>
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
          onPress={() => {
            onRightAction && onRightAction();
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
          onPress={() => {
            onLeftAction && onLeftAction();
            reset();
          }}
          justifyContent="center"
          paddingLeft="s"
        >
          <Text variant="p3B">Opciones</Text>
        </A.Pressable>

        <A.ListItem
          ref={animatedRef}
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
