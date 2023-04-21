import { A, ActivityIndicator, Box } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import AddTopoImage from "@features/climbs/WallScreen/AddTopoImage";
import TopoViewer from "@features/routesManager/components/TopoViewer";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useRoute } from "@react-navigation/native";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import { FC } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

const TopoImage: FC = () => {
  const route = useRoute<NavigationRoute>();
  const { wallId, zoneId } = route.params;
  const { data, isLoading: isLoadingWall } = trpc.walls.byId.useQuery({
    wallId,
    zoneId,
  });

  const mainTopo = data?.topos[0];

  const rootNavigation = useRootNavigation();

  return (
    <Box height={200}>
      {isLoadingWall && (
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      )}
      <AddTopoImage />
      {mainTopo?.image.publicId && (
        <A.Pressable
          overflow="hidden"
          flex={1}
          height={100}
          width={SCREEN_WIDTH}
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
          <TopoViewer
            topoId={mainTopo.id}
            zoneId={zoneId}
            center={false}
            disableGesture
            strokeWidth={Number(mainTopo.routeStrokeWidth)}
            imageQuality={20}
          />
        </A.Pressable>
      )}
    </Box>
  );
};

export default TopoImage;
