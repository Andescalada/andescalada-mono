import { useCallback, useEffect, useState } from "react";
import {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Config {
  defaultOpen?: boolean;
}

const useAnimatedHeight = ({ defaultOpen = false }: Config = {}) => {
  const open = useSharedValue(defaultOpen);
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0),
  );
  const height = useSharedValue(0);

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const aRef = useAnimatedRef();

  const style = useAnimatedStyle(() => {
    return {
      height: 1 + progress.value * height.value,
      opacity: progress.value === 0 ? 0 : 1,
    };
  });

  useEffect(() => {
    if (height.value === 0) {
      runOnUI(() => {
        "worklet";
        try {
          height.value = measure(aRef).height;
        } catch {
          height.value = 0;
        }
      })();
    }

    open.value = defaultOpen;
    setIsOpen(defaultOpen);
  }, [aRef, defaultOpen, height, open]);

  const onOpen = useCallback(() => {
    if (height.value === 0) {
      runOnUI(() => {
        "worklet";
        height.value = measure(aRef).height;
      })();
    }
    open.value = !open.value;
    setIsOpen((prev) => !prev);
  }, [aRef, height, open]);

  return { aRef, onOpen, style, open, progress, isOpen };
};

export default useAnimatedHeight;
