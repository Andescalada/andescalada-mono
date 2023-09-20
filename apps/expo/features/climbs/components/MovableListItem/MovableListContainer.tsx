import { FC, ReactNode } from "react";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

interface Props {
  children: ReactNode;
  contentHeight: number;
  scrollY: Animated.SharedValue<number>;
}

const MovableListContainer: FC<Props> = ({
  children,
  contentHeight,
  scrollY,
}) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => {
      scrollTo(scrollViewRef, 0, scrolling, false);
    },
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      style={{
        flex: 1,
        position: "relative",
      }}
      contentContainerStyle={{
        height: contentHeight,
      }}
    >
      {children}
    </Animated.ScrollView>
  );
};

export default MovableListContainer;
