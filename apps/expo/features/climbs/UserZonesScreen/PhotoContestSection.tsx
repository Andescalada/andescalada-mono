import { A, Box, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { showPhotoContestOnboardingAtom } from "@atoms/index";
import { PhotoContestRoutes } from "@features/photoContest/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const hasRunOnceAtom = atom(false);

const PhotoContestSection = () => {
  const utils = trpc.useContext();
  const [hasRunOnce, setHasRunOnce] = useAtom(hasRunOnceAtom);
  const [showPhotoContestOnboarding] = useAtom(showPhotoContestOnboardingAtom);
  const height = useSharedValue(hasRunOnce ? 70 : 0);
  const opacity = useSharedValue(hasRunOnce ? 1 : 0);
  useEffect(() => {
    setTimeout(() => {
      height.value = 70;
    }, 1000);
    setTimeout(() => {
      opacity.value = 1;
    }, 2000);
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

  const rootNavigation = useRootNavigation();

  return (
    <A.Box
      bg="brand.secondaryA"
      style={style}
      justifyContent="center"
      alignItems="center"
    >
      <A.Pressable
        style={pressableStyle}
        onPress={() => {
          utils.photoContest.getCurrentContest.prefetch();
          rootNavigation.navigate(RootNavigationRoutes.PhotoContest, {
            screen: showPhotoContestOnboarding
              ? PhotoContestRoutes.Onboarding
              : PhotoContestRoutes.ZonesList,
          });
        }}
      >
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
          <Text variant="h4" numberOfLines={1} ellipsizeMode="middle">
            1º Concurso documentación 📸
          </Text>
        </Box>
      </A.Pressable>
    </A.Box>
  );
};

export default PhotoContestSection;
