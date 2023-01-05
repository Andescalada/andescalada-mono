import { useCallback, useEffect, useState } from "react";
import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Config {
  defaultOpen?: boolean;
  maxHeight: number;
}

const useAnimatedHeight = (
  { defaultOpen = false, maxHeight }: Config = { maxHeight: 0 },
) => {
  const open = useSharedValue(defaultOpen);
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0),
  );

  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    open.value = defaultOpen;
    setIsOpen(defaultOpen);
  }, [defaultOpen, open]);

  const style = useAnimatedStyle(() => {
    return {
      height: 1 + progress.value * maxHeight,
      opacity: progress.value * maxHeight === 0 ? 0 : 1,
    };
  });

  const onOpen = useCallback(() => {
    open.value = !open.value;
    setIsOpen((prev) => !prev);
  }, [open]);

  return { onOpen, style, open, progress, isOpen };
};

export default useAnimatedHeight;
