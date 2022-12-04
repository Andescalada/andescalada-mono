import { SearchType } from "@andescalada/api/schemas/search";
import type { AppRouter } from "@andescalada/api/src/routers/_app";
import { Box, Pressable, Text } from "@andescalada/ui";
import { Colors } from "@andescalada/ui/Theme/theme";
import {
  ClimbsNavigationNavigationParamList,
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { inferProcedureOutput } from "@trpc/server";
import React, { useMemo } from "react";

type Data = inferProcedureOutput<AppRouter["search"]["all"]>;

const SearchItem = ({ item }: { item: Data[0] }) => {
  const navigate = useSearchNavigation(item.type);
  const { backgroundColor, color, label } = useMemo(
    () => searchType(item.type),
    [item.type],
  );
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment

    <Pressable
      padding={"s"}
      onPress={() => navigate(item.navigationParams as any)}
    >
      <Box
        marginBottom={"xs"}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text variant="p2B">{item.name}</Text>
        <Box
          borderRadius={100}
          backgroundColor={backgroundColor}
          paddingHorizontal="s"
        >
          <Text color={color}>{label}</Text>
        </Box>
      </Box>
      <Text variant="p3R">{item.detail}</Text>
    </Pressable>
  );
};

export default SearchItem;

const searchType = (
  type: SearchType,
): { label: string; backgroundColor: Colors; color: Colors } => {
  switch (type) {
    case SearchType.Route:
      return {
        label: "ruta",
        backgroundColor: "routeBadge",
        color: "grayscale.white",
      };
    case SearchType.Zone:
      return {
        label: "zona",
        backgroundColor: "zoneBadge",
        color: "grayscale.black",
      };
    case SearchType.Wall:
      return {
        label: "pared",
        backgroundColor: "wallBadge",
        color: "grayscale.black",
      };
    case SearchType.Sector:
      return {
        label: "sector",
        backgroundColor: "sectorBadge",
        color: "grayscale.black",
      };
    default:
      throw new Error("Invalid search type");
  }
};

const useSearchNavigation = (type: SearchType) => {
  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.SearchClimbs>
    >();
  switch (type) {
    case SearchType.Route:
      return (
        params: ClimbsNavigationNavigationParamList[ClimbsNavigationRoutes.Wall],
      ) => navigation.navigate(ClimbsNavigationRoutes.Wall, params);
    case SearchType.Zone:
      return (
        params: ClimbsNavigationNavigationParamList[ClimbsNavigationRoutes.Zone],
      ) => navigation.navigate(ClimbsNavigationRoutes.Zone, params);
    case SearchType.Wall:
      return (
        params: ClimbsNavigationNavigationParamList[ClimbsNavigationRoutes.Wall],
      ) => navigation.navigate(ClimbsNavigationRoutes.Wall, params);
    case SearchType.Sector:
      return (
        params: ClimbsNavigationNavigationParamList[ClimbsNavigationRoutes.Sector],
      ) => navigation.navigate(ClimbsNavigationRoutes.Sector, params);
    default:
      throw new Error("Invalid search type");
  }
};
