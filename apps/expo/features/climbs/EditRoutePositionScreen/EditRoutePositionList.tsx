import { BackButton, Box, Button, Screen, Text } from "@andescalada/ui";
import {
  ROUTE_ITEM_HEIGHT,
  ScrollDirection,
} from "@features/climbs/EditRoutePositionScreen/config";
import MovableListItem from "@features/climbs/EditRoutePositionScreen/MovableListItem";
import { RouteListData } from "@hooks/useRouteList";
import { useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { useWindowDimensions } from "react-native";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  data: RouteListData;
  wallName: string;
}

const TOOLBAR_HEIGHT = 50;

const EditRoutePositionList: FC<Props> = ({ data, wallName }) => {
  const navigation = useNavigation();
  const positions = useSharedValue(listToObject(data));

  const scrollY = useSharedValue(0);
  const autoScroll = useSharedValue(ScrollDirection.None);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => {
      scrollTo(scrollViewRef, 0, scrolling, false);
    },
  );

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const containerHeight =
    dimensions.height - insets.top - insets.bottom - TOOLBAR_HEIGHT;
  const contentHeight = data?.routes
    ? data?.routes?.length * ROUTE_ITEM_HEIGHT
    : 0;

  return (
    <Screen padding="m">
      <Box
        height={TOOLBAR_HEIGHT}
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <BackButton onPress={navigation.goBack} />
        <Text variant="p1R" numberOfLines={1} ellipsizeMode="tail">
          {wallName}
        </Text>
        <Button
          titleVariant="p3R"
          title="Guardar"
          titleProps={{ lineHeight: undefined }}
          variant="infoSmall"
          height={40}
          width={"30%"}
          onPress={() => {
            const newPositions = positions.value;

            Object.entries(newPositions).forEach(([id, position]) => {
              const route = data?.routes.find((route) => route.id === id);
              console.log(route?.name, position + 1);
            });
          }}
        />
      </Box>
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
        {data?.routes.map((route) => (
          <MovableListItem
            key={route.id}
            id={route.id}
            title={route.name}
            kind={route.kindStringify}
            grade={route.gradeStringify}
            positions={positions}
            lowerBound={scrollY}
            autoScrollDirection={autoScroll}
            routesCount={data.routes.length}
            containerHeight={containerHeight}
          />
        ))}
      </Animated.ScrollView>
    </Screen>
  );
};

export default EditRoutePositionList;

const listToObject = (list: RouteListData) => {
  const object: { [id: string]: number } = {};
  if (!list?.routes) return object;
  list.routes.forEach((route) => {
    object[route.id] = route.position - 1;
  });

  return object;
};
