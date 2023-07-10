import { SectorKindSchema } from "@andescalada/db/zod";
import { A, Box, ListItem, SubItem, Text } from "@andescalada/ui";
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
    walls: { id: string; name: string }[];
    name: string;
    id: string;
    zoneId: string;
    sectorKind: typeof SectorKindSchema._type;
  };
}

const ZoneItem: FC<Props> = ({ item }) => {
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
                <Text variant="p2R">{wall.name}</Text>
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

export default memo(ZoneItem);

const s = StyleSheet.create({
  noPadding: { padding: 0 },
});
