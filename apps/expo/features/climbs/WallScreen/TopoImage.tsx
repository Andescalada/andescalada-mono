import { A, ActivityIndicator, Box, Image, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import AddTopoImage from "@features/climbs/WallScreen/AddTopoImage";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useWallsById from "@hooks/offlineQueries/useWallsById";
import useCachedImage from "@hooks/useCachedImage";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useRoute } from "@react-navigation/native";
import { FC } from "react";
import { useWindowDimensions } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

const TopoImage: FC = () => {
  const route = useRoute<NavigationRoute>();
  const { wallId, zoneId } = route.params;
  const { data, isLoading: isLoadingWall } = useWallsById({
    wallId,
    zoneId,
  });

  const mainTopo = data?.topos[0];

  const image = useCloudinaryUrl("blurImage", {
    publicId: mainTopo?.image.publicId,
    blurness: 1000,
  });

  const { uri, isLoading } = useCachedImage(image);
  const { width: screenWidth } = useWindowDimensions();

  const rootNavigation = useRootNavigation();

  if (isLoadingWall)
    return (
      <Box height={200}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Box>
    );

  if (mainTopo) {
    return (
      <Box height={200}>
        <A.Pressable
          overflow="hidden"
          flex={1}
          justifyContent="center"
          alignItems="center"
          width={screenWidth}
          entering={FadeIn}
          exiting={FadeOut}
          onPress={() => {
            rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
              screen: RoutesManagerNavigationRoutes.TopoViewer,
              params: {
                topoId: mainTopo.id,
                zoneId,
              },
            });
          }}
        >
          {isLoading ? (
            <Box
              height={200}
              width={screenWidth}
              justifyContent="center"
              alignItems="center"
            >
              <ActivityIndicator />
            </Box>
          ) : (
            <>
              <Image
                position="absolute"
                source={uri}
                height={200}
                width={screenWidth}
              />
              <Box
                py="s"
                px="m"
                borderRadius={32}
                backgroundColor="grayscale.transparent.50.600"
              >
                <Text variant="h2">Ver topo</Text>
              </Box>
            </>
          )}
        </A.Pressable>
      </Box>
    );
  }

  return (
    <Box height={200}>
      <AddTopoImage />
    </Box>
  );
};

export default TopoImage;
