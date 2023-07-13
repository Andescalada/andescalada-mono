import { SectorKindSchema } from "@andescalada/db/zod";
import { A, Box, Ionicons, ListItem, SubItem, Text } from "@andescalada/ui";
import { toggleWalls } from "@features/climbs/ZoneScreen/ToolBar";
import {
  PhotoContestNavigationProps,
  PhotoContestRoutes,
} from "@features/photoContest/Navigation/types";
import useAnimatedHeight from "@hooks/useAnimatedHeight";
import { useNavigation } from "@react-navigation/native";
import Conditional from "@utils/conditionalVars";
import { sectorKindAssets } from "@utils/sectorKindAssets";
import { useAtom } from "jotai";
import { FC, memo, useMemo } from "react";
import { StyleSheet } from "react-native";

const SUBITEM_HEIGHT = 50;

interface Props {
  item: {
    walls: {
      id: string;
      name: string;
      _count: { topos: number };
      hasSubmitted: boolean;
    }[];
    completion: number;
    name: string;
    id: string;
    zoneId: string;
    sectorKind: typeof SectorKindSchema._type;
    _count: { walls: number };
    numberOfToposSubmitted: number;
  };
}

const SectorItem: FC<Props> = ({ item }) => {
  const [defaultOpen] = useAtom(toggleWalls);
  const wallCount = useMemo(() => item.walls.length, [item.walls.length]);

  const navigation =
    useNavigation<PhotoContestNavigationProps<PhotoContestRoutes.UploadTopo>>();

  const { onOpen, style } = useAnimatedHeight({
    defaultOpen,
    maxHeight: SUBITEM_HEIGHT * wallCount || 50,
  });

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
        style={s.noPadding}
      >
        <Box justifyContent="center" flex={1} padding="m">
          <Text variant="p1R">{item.name}</Text>
        </Box>
        <Box
          alignSelf="center"
          flexDirection="row"
          justifyContent="center"
          alignItems={"center"}
        >
          {item.completion > 0 && (
            <Box marginRight={"s"}>
              <Ionicons
                name="checkmark-circle"
                color="semantic.success"
                size={20}
              />
            </Box>
          )}
          <Box
            flexDirection="row"
            bg={item._count.walls > 0 ? "semantic.info" : "grayscale.700"}
            alignItems="center"
            justifyContent="center"
            gap="xs"
            width={45}
            height={40}
            borderRadius={8}
            marginRight="s"
          >
            <Text fontSize={14} lineHeight={20}>
              {item.numberOfToposSubmitted}
            </Text>
            <Ionicons name="people-circle-outline" size={20} />
          </Box>
        </Box>
      </ListItem>
      <A.Box style={style} overflow="hidden">
        <Box collapsable={Conditional.disableForAndroid}>
          {wallCount > 0 ? (
            item.walls.map((wall, index) => (
              <SubItem
                key={wall.id}
                index={index}
                height={SUBITEM_HEIGHT}
                maxIndex={wallCount - 1}
                onPress={() =>
                  navigation.navigate(PhotoContestRoutes.UploadTopo, {
                    wallId: wall.id,
                    wallName: wall.name,
                    zoneId: item.zoneId,
                  })
                }
              >
                <Box
                  flex={1}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text variant="p2R">{wall.name}</Text>
                  <Box flexDirection="row" gap="s">
                    {wall.hasSubmitted && (
                      <Ionicons
                        name="checkmark-outline"
                        color="semantic.success"
                        size={20}
                      />
                    )}
                    <Box flexDirection="row" alignItems="center" gap="xs">
                      <Text lineHeight={20}>{wall._count.topos}</Text>
                      <Ionicons name="people-circle-outline" size={20} />
                    </Box>
                  </Box>
                </Box>
              </SubItem>
            ))
          ) : (
            <SubItem height={SUBITEM_HEIGHT}>
              <Text variant="p3R">{`${
                sectorKindAssets[item.sectorKind].noneMessage
              } 😢`}</Text>
            </SubItem>
          )}
        </Box>
      </A.Box>
    </A.Box>
  );
};

export default memo(SectorItem);

const s = StyleSheet.create({
  noPadding: { padding: 0 },
});
