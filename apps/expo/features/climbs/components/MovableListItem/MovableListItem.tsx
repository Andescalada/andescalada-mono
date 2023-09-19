import { Box, Ionicons } from "@andescalada/ui";
import { useAppTheme } from "@hooks/useAppTheme";
import { FC, memo, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { ITEM_HEIGHT, ScrollDirection } from "./config";
import { clamp, objectMove } from "./utilities";

interface Props {
  id: string;
  containerHeight: number;
  positions: SharedValue<{ [id: string]: number }>;
  lowerBound: SharedValue<number>;
  autoScrollDirection: SharedValue<ScrollDirection>;
  itemsCount: number;
  Item: FC<{ position: number }>;
  headerHeight?: number;
}

const MovableListItem = ({
  id,
  positions,
  containerHeight,
  lowerBound,
  autoScrollDirection,
  itemsCount,
  Item,
  headerHeight = 0,
}: Props) => {
  const [JSpositions, setJSPositions] = useState(positions.value);
  const [moving, setMoving] = useState(false);
  const positionY = useSharedValue(positions.value[id] * ITEM_HEIGHT);
  const top = useSharedValue(positions.value[id] * ITEM_HEIGHT);
  const upperBound = useDerivedValue(() => lowerBound.value + containerHeight);
  const targetLowerBound = useSharedValue(lowerBound.value);

  useAnimatedReaction(
    () => positionY.value,
    (positionYValue, previousValue) => {
      if (
        positionYValue !== null &&
        previousValue !== null &&
        positionYValue !== previousValue
      ) {
        if (moving) {
          top.value = positionYValue;
          setPosition(positionYValue, itemsCount, positions, id);
          setAutoScroll(
            positionYValue,
            lowerBound.value,
            upperBound.value,
            ITEM_HEIGHT,
            autoScrollDirection,
          );
        }
      }
      runOnJS(setJSPositions)(positions.value);
    },
  );

  // If another item is moving and changes this ones position, move to new position.
  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (
        currentPosition !== null &&
        previousPosition !== null &&
        currentPosition !== previousPosition
      ) {
        if (!moving) {
          top.value = withSpring(currentPosition * ITEM_HEIGHT);
        }
      }
    },
    [moving],
  );

  // If moving and scrolling, update position y.
  useAnimatedReaction(
    () => lowerBound.value,
    (currentLowerBound, previousLowerBound) => {
      if (
        currentLowerBound !== null &&
        previousLowerBound !== null &&
        currentLowerBound !== previousLowerBound &&
        moving
      ) {
        const diff = previousLowerBound - currentLowerBound;
        positionY.value -= diff;
      }
    },
    [moving],
  );

  // When the autoScrollDirection changes, set the target lower bound with timing.
  useAnimatedReaction(
    () => autoScrollDirection.value,
    (scrollDirection, previousValue) => {
      if (
        scrollDirection !== null &&
        previousValue !== null &&
        scrollDirection !== previousValue
      ) {
        switch (scrollDirection) {
          case ScrollDirection.Up: {
            targetLowerBound.value = lowerBound.value;
            targetLowerBound.value = withTiming(0, { duration: 1500 });
            break;
          }
          case ScrollDirection.Down: {
            const contentHeight = itemsCount * ITEM_HEIGHT;
            const maxScroll = contentHeight - containerHeight;

            targetLowerBound.value = lowerBound.value;
            targetLowerBound.value = withTiming(maxScroll, { duration: 1500 });
            break;
          }
          case ScrollDirection.None: {
            targetLowerBound.value = lowerBound.value;
            break;
          }
        }
      }
    },
  );

  // When the target lower bound changes, update the lower bound value.
  useAnimatedReaction(
    () => targetLowerBound.value,
    (targetLowerBoundValue, previousValue) => {
      const contentHeight = itemsCount * ITEM_HEIGHT;
      if (contentHeight < containerHeight) return;
      if (
        targetLowerBoundValue !== null &&
        previousValue !== null &&
        targetLowerBoundValue !== previousValue
      ) {
        if (moving) {
          lowerBound.value = targetLowerBoundValue;
        }
      }
    },
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      positionY.value = positions.value[id] * ITEM_HEIGHT;
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      positionY.value =
        event.absoluteY + lowerBound.value - ITEM_HEIGHT - headerHeight;
    },
    onFinish() {
      const finishPosition = positions.value[id] * ITEM_HEIGHT;
      top.value = withTiming(finishPosition);
      runOnJS(setMoving)(false);
    },
  });

  const theme = useAppTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 0,
      right: 0,
      top: top.value,
      zIndex: moving ? 1 : 0,
      borderWidth: 3,
      borderColor: withTiming(
        moving
          ? theme.colors["brand.primaryB"]
          : theme.colors.listItemBackground,
        { duration: 100 },
      ),
      borderRadius: 5,
      backgroundColor: theme.colors.background,
      height: ITEM_HEIGHT - 10,
      flexDirection: "row",
      justifyContent: "space-between",
    };
  }, [moving]);

  return (
    <Animated.View style={animatedStyle}>
      <Item position={JSpositions[id] + 1} />
      <Box flex={1} maxWidth={90 - 16}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View>
            <Box
              height={ITEM_HEIGHT - 16}
              justifyContent="center"
              alignItems="center"
            >
              <Ionicons name="menu-sharp" size={30} />
            </Box>
          </Animated.View>
        </PanGestureHandler>
      </Box>
    </Animated.View>
  );
};

function setPosition(
  positionY: number,
  routesCount: number,
  positions: SharedValue<{ [id: string]: number }>,
  id: string,
) {
  "worklet";
  const newPosition = clamp(
    Math.floor(positionY / ITEM_HEIGHT),
    0,
    routesCount - 1,
  );

  if (newPosition !== positions.value[id]) {
    positions.value = objectMove(
      positions.value,
      positions.value[id],
      newPosition,
    );
  }
  return positions.value;
}

function setAutoScroll(
  positionY: number,
  lowerBound: number,
  upperBound: number,
  scrollThreshold: number,
  autoScroll: SharedValue<ScrollDirection>,
) {
  "worklet";
  if (positionY <= lowerBound + scrollThreshold) {
    autoScroll.value = ScrollDirection.Up;
  } else if (positionY >= upperBound - scrollThreshold) {
    autoScroll.value = ScrollDirection.Down;
  } else {
    autoScroll.value = ScrollDirection.None;
  }
}

export default memo(MovableListItem);
