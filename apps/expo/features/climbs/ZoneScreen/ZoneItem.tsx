import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  A,
  Box,
  Ionicons,
  ListItem,
  Pressable,
  SubItem,
  Text,
} from "@andescalada/ui";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import useAnimatedHeight from "@hooks/useAnimatedHeight";
import { useNavigation, useRoute } from "@react-navigation/native";
import { inferProcedureOutput } from "@trpc/server";
import Conditional from "@utils/conditionalVars";
import { FC, memo } from "react";

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
        borderRadius={10}
        overflow="hidden"
        style={{ padding: 0 }}
      >
        <Box justifyContent="center" flex={1} padding="m">
          <Text variant="p1R">{item.name}</Text>
        </Box>
        <Pressable
          flex={0.25}
          flexDirection="row"
          overflow="hidden"
          onPress={() =>
            navigation.navigate(ClimbsNavigationRoutes.Sector, {
              sectorId: item.id,
              sectorName: item.name,
              zoneId: route.params.zoneId,
            })
          }
        >
          <DottedBorder />
          <Box flex={1} justifyContent="center" alignItems="center">
            <Ionicons
              name="information-circle"
              size={24}
              color="grayscale.white"
            />
          </Box>
        </Pressable>
      </ListItem>
      <A.Box style={style} overflow="hidden">
        <Box ref={aRef} collapsable={Conditional.disableForAndroid}>
          {wallCount > 0 ? (
            item.walls.map((wall, index) => (
              <SubItem
                key={wall.id}
                index={index}
                maxIndex={wallCount - 1}
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
              </SubItem>
            ))
          ) : (
            <SubItem height={50}>
              <Text lineHeight={20}>Sin paredes 😢</Text>
            </SubItem>
          )}
        </Box>
      </A.Box>
    </A.Box>
  );
};

export default memo(ZoneItem);

const DottedBorder = () => (
  <Box
    flex={1}
    maxWidth={1}
    borderWidth={1}
    borderColor="brand.primaryA"
    borderStyle="dotted"
  />
);
