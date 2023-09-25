import { A, ActivityIndicator, Box, Image, Ionicons } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import AddTopoImage from "@features/climbs/WallScreen/AddTopoImage";
import StaticRoutePaths from "@features/routesManager/components/StaticRoutePaths";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useWallsById from "@hooks/offlineQueries/useWallsById";
import useCachedImage from "@hooks/useCachedImage";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { useFitContent } from "@hooks/useFitContent";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useRoute } from "@react-navigation/native";
import constants from "@utils/constants";
import { FC } from "react";
import { useWindowDimensions } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

const EXPAND_BUTTON_SIZE = 35;

const TopoImage: FC = () => {
  const route = useRoute<NavigationRoute>();
  const { wallId, zoneId } = route.params;
  const { data, isLoading: isLoadingWall } = useWallsById({
    wallId,
    zoneId,
  });

  const mainTopo = data?.topos[0];

  const image = useCloudinaryUrl("optimizedImage", {
    publicId: mainTopo?.image.publicId,
    quality: constants.lowImageQuality,
  });

  const { uri, isLoading: isLoadingImage } = useCachedImage(image);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const fitted = useFitContent(
    {
      height: mainTopo?.image?.height ? mainTopo?.image.height : 0,
      width: mainTopo?.image?.width ? mainTopo?.image?.width : 0,
    },
    "width",
    screenWidth,
  );

  const rootNavigation = useRootNavigation();

  if (isLoadingWall || isLoadingImage)
    return (
      <Box height={Math.min(screenHeight * 0.5, fitted.height)}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Box>
    );

  if (mainTopo) {
    return (
      <Box maxHeight={screenHeight * 0.5} overflow="hidden">
        <A.Pressable
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
          <Image
            position="absolute"
            cachePolicy="none"
            transition={300}
            contentFit={"contain"}
            top={0}
            left={0}
            source={uri}
            height={fitted.height}
            width={fitted.width}
          />
          <StaticRoutePaths
            routes={mainTopo.RoutePath}
            strokeWidth={mainTopo.routeStrokeWidth.toNumber()}
            imageHeight={mainTopo?.image.height}
            imageWidth={mainTopo?.image.width}
            height={fitted.height}
            width={fitted.width}
          />
          <Box
            position="absolute"
            right={16}
            top={16}
            flexDirection="row"
            gap="s"
            height={EXPAND_BUTTON_SIZE}
            width={EXPAND_BUTTON_SIZE}
            borderRadius={EXPAND_BUTTON_SIZE / 2}
            bg="grayscale.transparent.80.black"
            justifyContent="center"
            alignItems="center"
          >
            <Ionicons
              name="expand-sharp"
              size={EXPAND_BUTTON_SIZE - 10}
              color="grayscale.white"
            />
          </Box>
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
