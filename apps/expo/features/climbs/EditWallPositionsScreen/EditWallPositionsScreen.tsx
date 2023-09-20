import { BackButton, Box, Button, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import MovableList from "@features/climbs/components/MovableListItem";
import {
  ITEM_HEIGHT,
  ScrollDirection,
} from "@features/climbs/components/MovableListItem/config";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { useNotifications } from "@utils/notificated";
import { FC } from "react";
import { useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 70;

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.EditWallPositions>;

const EditWallPositionsScreen: FC<Props> = ({
  route: {
    params: { sectorId, zoneId },
  },
  navigation,
}) => {
  const { data } = trpc.sectors.allWalls.useQuery(
    { sectorId, zoneId },
    { staleTime: 0 },
  );

  const autoScroll = useSharedValue(ScrollDirection.None);
  const scrollY = useSharedValue(0);
  const positions = useSharedValue(listToObject(data?.walls));

  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const containerHeight =
    dimensions.height - insets.top - insets.bottom - HEADER_HEIGHT;
  const contentHeight = data?.walls ? data?.walls?.length * ITEM_HEIGHT : 0;

  const notification = useNotifications();

  const utils = trpc.useContext();

  const editPositions = trpc.sectors.editWallPosition.useMutation({
    onSuccess: () => {
      notification.notify("success", {
        params: {
          title: "Posiciones modificadas con éxito",
          hideCloseButton: true,
        },
        config: { duration: 500 },
      });
      utils.walls.invalidate();
      utils.sectors.invalidate();
    },
  });

  const onSavePositions = () => {
    const newPositions = positions.value;

    const positionsArray = Object.entries(newPositions).map(
      ([id, position]) => {
        return {
          id,
          position,
        };
      },
    );

    editPositions.mutate({ zoneId, positions: positionsArray, sectorId });
  };

  if (!data) return null;
  return (
    <Screen padding="m">
      <Box
        height={HEADER_HEIGHT}
        flexDirection="row"
        alignItems="center"
        justifyContent={"space-between"}
        maxWidth="100%"
        gap="s"
      >
        <BackButton onPress={navigation.goBack} />
        <Box flex={1}>
          <Text variant="p1R" numberOfLines={1} ellipsizeMode="tail">
            Editar posiciones
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
      <MovableList.Container contentHeight={contentHeight} scrollY={scrollY}>
        {data?.walls.map((wall) => (
          <MovableList.Item
            key={wall.id}
            lowerBound={scrollY}
            positions={positions}
            containerHeight={containerHeight}
            id={wall.id}
            headerHeight={HEADER_HEIGHT}
            itemsCount={data.walls.length}
            autoScrollDirection={autoScroll}
            Item={({ position }) => (
              <Box
                key={wall.id}
                flexDirection="row"
                alignItems="center"
                gap="s"
                marginLeft="s"
                flex={1}
              >
                <Text variant="p2R">{position}</Text>
                <Text variant="p2R" numberOfLines={1} ellipsizeMode="middle">
                  {wall.name}
                </Text>
              </Box>
            )}
          />
        ))}
      </MovableList.Container>
    </Screen>
  );
};

const listToObject = (list: { position: number; id: string }[] | undefined) => {
  const object: { [id: string]: number } = {};
  if (!list) return object;
  list.forEach((item) => {
    object[item.id] = item.position;
  });

  return object;
};

export default EditWallPositionsScreen;
