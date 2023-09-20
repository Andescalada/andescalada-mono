import { BackButton, Box, Button, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ROUTE_ITEM_HEIGHT,
  ScrollDirection,
  TOOLBAR_HEIGHT,
} from "@features/climbs/EditRoutePositionScreen/config";
import MovableListItem from "@features/climbs/EditRoutePositionScreen/MovableListItem";
import { RouteListData } from "@hooks/useRouteList";
import { useNavigation } from "@react-navigation/native";
import { useNotifications } from "@utils/notificated";
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
  data: Exclude<RouteListData, undefined>;
  wallName: string;
  zoneId: string;
  wallId: string;
}

const EditRoutePositionList: FC<Props> = ({
  data,
  wallName,
  zoneId,
  wallId,
}) => {
  const navigation = useNavigation();
  const positions = useSharedValue(listToObject(data));

  const scrollY = useSharedValue(0);
  const autoScroll = useSharedValue(ScrollDirection.None);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const notification = useNotifications();

  const utils = trpc.useContext();
  const editPositions = trpc.routes.editPositions.useMutation({
    onSuccess: () => {
      notification.notify("success", {
        params: {
          title: "Posiciones modificadas con éxito",
          hideCloseButton: true,
        },
        config: { duration: 500 },
      });
      utils.walls.invalidate();
      utils.topos.invalidate();
    },
  });

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

  const onSavePositions = () => {
    const newPositions = positions.value;

    const positionsArray = Object.entries(newPositions).map(
      ([id, position]) => {
        const route = data.routes.find((route) => route.id === id);
        return {
          id,
          isMultiPitch: !!route?.isMultiPitch,
          position: position + 1,
        };
      },
    );

    editPositions.mutate({ zoneId, positions: positionsArray, wallId });
  };

  return (
    <Screen padding="m">
      <Box
        height={TOOLBAR_HEIGHT}
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
        maxWidth="100%"
        gap="s"
      >
        <BackButton onPress={navigation.goBack} />
        <Box flex={1}>
          <Text variant="p1R" numberOfLines={1} ellipsizeMode="tail">
            {wallName}
          </Text>
        </Box>
        <Button
          titleVariant="p3B"
          title="Guardar"
          isLoading={editPositions.isLoading}
          titleProps={{ lineHeight: undefined }}
          variant="infoSmall"
          height={40}
          paddingHorizontal="s"
          onPress={onSavePositions}
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
