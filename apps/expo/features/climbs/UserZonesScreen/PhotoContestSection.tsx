import { A, Box, Text } from "@andescalada/ui";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const hasRunOnceAtom = atom(false);

const PhotoContestSection = () => {
  const [hasRunOnce, setHasRunOnce] = useAtom(hasRunOnceAtom);
  const height = useSharedValue(hasRunOnce ? 70 : 0);
  const opacity = useSharedValue(hasRunOnce ? 1 : 0);
  useEffect(() => {
    setTimeout(() => {
      height.value = 70;
    }, 1000);
    setTimeout(() => {
      opacity.value = 1;
    }, 1200);
    setHasRunOnce(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = useAnimatedStyle(() => ({
    height: withTiming(height.value, {
      duration: 1000,
    }),
  }));

  const pressableStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {
      duration: 1000,
    }),
  }));
  return (
    <A.Box
      bg="brand.secondaryA"
      style={style}
      justifyContent="center"
      alignItems="center"
    >
      <A.Pressable style={pressableStyle}>
        <Box
          position="absolute"
          top={3}
          left={3}
          right={-3}
          bottom={-3}
          zIndex={1}
          bg="brand.primaryB"
          paddingVertical="s"
          paddingHorizontal="m"
          borderRadius={16}
        />
        <Box
          bg="brand.primaryA"
          paddingVertical="s"
          paddingHorizontal="m"
          borderRadius={16}
          zIndex={100}
        >
          <Text variant="h4">Concurso fotográfico 📸</Text>
        </Box>
      </A.Pressable>
    </A.Box>
  );
};

export default PhotoContestSection;
