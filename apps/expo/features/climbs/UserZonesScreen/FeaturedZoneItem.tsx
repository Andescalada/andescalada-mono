import { AppRouter } from "@andescalada/api/src/routers/_app";
import { Box, Image, Pressable, Text } from "@andescalada/ui";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { inferProcedureOutput } from "@trpc/server";
import { FC, memo } from "react";

type Item = inferProcedureOutput<AppRouter["zones"]["featured"]>[number];

interface Props {
  item: Item;
}

const FeaturedZoneItem: FC<Props> = ({ item }) => {
  const rootNavigation = useRootNavigation();

  const imageInServer = useCloudinaryUrl("optimizedImage", {
    publicId: item.coverPhoto?.publicId,
    quality: 50,
  });
  return (
    <Pressable
      onPress={() =>
        rootNavigation.navigate(RootNavigationRoutes.Climbs, {
          screen: ClimbsNavigationRoutes.Zone,
          params: { zoneId: item.id, zoneName: item.name },
        })
      }
      width={120}
      height={150}
      bg="grayscale.800"
      marginHorizontal="xs"
      borderRadius={16}
      overflow="hidden"
    >
      <Image
        cachePolicy="memory-disk"
        source={imageInServer?.url}
        width={120}
        height={100}
      />
      <Box flex={1} justifyContent="center" margin="s">
        <Text variant="p3B">{item.name}</Text>
      </Box>
    </Pressable>
  );
};

export default memo(FeaturedZoneItem);
