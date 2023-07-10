import {
  ActivityIndicator,
  Box,
  Ionicons,
  ListItem,
  Text,
} from "@andescalada/ui";
import { SQUARED_LIST_ITEM_SIZE } from "@andescalada/ui/Theme/listItemVariants";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import { ZoneCarouselModes } from "@features/climbs/UserZonesScreen/types";
import useOwnInfo from "@hooks/useOwnInfo";
import useRecentZones from "@hooks/useRecentZones";
import { useNavigation } from "@react-navigation/native";
import emptyArray from "@utils/emptyArray";
import { FlatList } from "react-native";

const UserZoneCarouselSwitch = ({ mode }: { mode: ZoneCarouselModes }) => {
  const { data } = useOwnInfo();

  const utils = trpc.useContext();

  const recentZones = useRecentZones();

  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Home>
    >();

  const removeRecentZone = trpc.user.removeRecentZone.useMutation({
    onMutate: async ({ zoneId }) => {
      await utils.user.zoneHistory.cancel();
      const previousData = utils.user.zoneHistory.getData();
      utils.user.zoneHistory.setData(undefined, (old) =>
        old ? old.filter((z) => z.id !== zoneId) : undefined,
      );
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.user.zoneHistory.setData(undefined, context?.previousData);
    },
  });

  switch (mode) {
    case "favorites": {
      if (emptyArray(data?.FavoriteZones)) {
        return (
          <Box
            marginTop={"s"}
            height={SQUARED_LIST_ITEM_SIZE}
            justifyContent="center"
          >
            <Text>No tienes favoritas aún</Text>
          </Box>
        );
      }
      return (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data?.FavoriteZones}
          renderItem={({ item, index }) => (
            <ListItem
              key={item.id}
              marginVertical="s"
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Zone, {
                  zoneId: item.id,
                  zoneName: item.name,
                })
              }
              variant="squaredPrimaryA"
              justifyContent="flex-end"
              marginRight="xs"
              marginLeft={index === 0 ? "none" : "xs"}
            >
              <Text variant="p3B" numberOfLines={3} ellipsizeMode="tail">
                {item.name}
              </Text>
            </ListItem>
          )}
        />
      );
    }
    case "owner": {
      if (emptyArray(data?.RoleByZone)) {
        return (
          <Box
            marginTop={"s"}
            height={SQUARED_LIST_ITEM_SIZE}
            justifyContent="center"
          >
            <Text>No tienes ninguna zona</Text>
          </Box>
        );
      }
      return (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data?.RoleByZone}
          renderItem={({ item: { Zone: item }, index }) => (
            <ListItem
              key={item.id}
              marginVertical="s"
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Zone, {
                  zoneId: item.id,
                  zoneName: item.name,
                })
              }
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="squaredPrimaryB"
              marginRight="xs"
              marginLeft={index === 0 ? "none" : "xs"}
            >
              <Text variant="p3B" numberOfLines={3} ellipsizeMode="tail">
                {item.name}
              </Text>
            </ListItem>
          )}
        />
      );
    }
    case "recent": {
      if (emptyArray(recentZones?.data) && !recentZones.isLoading) {
        return (
          <Box
            marginTop={"s"}
            height={SQUARED_LIST_ITEM_SIZE}
            justifyContent="center"
          >
            <Text>No hay zonas recientes</Text>
          </Box>
        );
      }
      if (recentZones.isLoading) {
        <Box
          marginTop={"xl"}
          justifyContent="center"
          alignItems="center"
          height={SQUARED_LIST_ITEM_SIZE}
        >
          <ActivityIndicator size="large" />
        </Box>;
      }

      return (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recentZones.data}
          renderItem={({ item, index }) => (
            <ListItem
              key={item.id}
              marginVertical={"s"}
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Zone, {
                  zoneId: item.id,
                  zoneName: item.name,
                })
              }
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="squaredFilled"
              marginRight="xs"
              marginLeft={index === 0 ? "none" : "xs"}
            >
              <Box position="absolute" top={0} right={0} margin="xs">
                <Ionicons
                  color="grayscale.white"
                  name="close"
                  size={20}
                  onPress={() => {
                    removeRecentZone.mutate({ zoneId: item.id });
                  }}
                />
              </Box>
              <Text variant="p3B" numberOfLines={3} ellipsizeMode="tail">
                {item.name}
              </Text>
            </ListItem>
          )}
        />
      );
    }
    default:
      return null;
  }
};

export default UserZoneCarouselSwitch;
