import { AppRouter } from "@andescalada/api/src/routers/_app";
import { A, Box, ListItem, Text } from "@andescalada/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import useAnimatedHeight from "@hooks/useAnimatedHeight";
import { useNavigation, useRoute } from "@react-navigation/native";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

type AllSectors = inferProcedureOutput<AppRouter["zones"]["allSectors"]>;

type Item = ArrElement<AllSectors["sectors"]>;

interface Props {
  item: Item;
  defaultOpen?: boolean;
}

const ZoneItem: FC<Props> = ({ item, defaultOpen = false }) => {
  const { aRef, onOpen, style } = useAnimatedHeight({
    defaultOpen,
  });

  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Zone>
    >();

  const route =
    useRoute<ClimbsNavigationRouteProps<ClimbsNavigationRoutes.Zone>>();

  const wallCount = item.walls.length;

  return (
    <A.Box marginVertical={"s"}>
      <ListItem
        variant="accent"
        zIndex={100}
        flexDirection="row"
        justifyContent="space-between"
        onPress={onOpen}
      >
        <Text variant="p1R">{item.name}</Text>
        <Ionicons
          name="chevron-forward"
          size={24}
          color="white"
          onPress={() =>
            navigation.navigate(ClimbsNavigationRoutes.Sector, {
              sectorId: item.id,
              sectorName: item.name,
              zoneId: route.params.zoneId,
            })
          }
        />
      </ListItem>
      <A.Box style={style} overflow="hidden">
        <Box ref={aRef}>
          {item.walls.map((wall, index) => (
            <A.Pressable
              key={wall.id}
              height={48}
              justifyContent="center"
              paddingHorizontal="m"
              marginHorizontal="s"
              borderLeftWidth={2}
              borderRightWidth={2}
              borderColor="grayscale.400"
              borderBottomLeftRadius={index === wallCount - 1 ? 10 : 0}
              borderBottomRightRadius={index === wallCount - 1 ? 10 : 0}
              borderBottomWidth={index === wallCount - 1 ? 2 : 1}
              onPress={() =>
                navigation.navigate(ClimbsNavigationRoutes.Wall, {
                  wallId: wall.id,
                  wallName: wall.name,
                  sectorId: item.id,
                  zoneId: item.zoneId,
                })
              }
            >
              <Text variant="p2R">{wall.name}</Text>
            </A.Pressable>
          ))}
        </Box>
      </A.Box>
    </A.Box>
  );
};

export default ZoneItem;
