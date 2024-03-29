import { Box, Button, Pressable, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";

const OtherTopos = () => {
  const {
    params: { wallId, zoneId, wallName },
  } = useRoute<ClimbsNavigationRouteProps<ClimbsNavigationRoutes.Wall>>();
  const otherToposQuery = trpc.topos.otherToposCount.useQuery({
    wallId,
    zoneId,
  });

  const toposByUserCount = trpc.topos.toposByUserCount.useQuery({
    wallId,
    zoneId,
  });

  const onAddTopoPress = () => {
    if (
      typeof toposByUserCount.data === "number" &&
      toposByUserCount.data > 0
    ) {
      rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
        screen: RoutesManagerNavigationRoutes.ToposByUser,
        params: {
          wallId,
          zoneId,
          wallName,
        },
      });
      return;
    }
    rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
      screen: RoutesManagerNavigationRoutes.UploadTopoImage,
      params: {
        wallId,
        zoneId,
        wallName,
      },
    });
  };

  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Wall>
    >();

  const rootNavigation = useRootNavigation();

  const otherToposCount = otherToposQuery.data ?? 0;

  if (otherToposQuery.isLoading || toposByUserCount.isLoading) return null;

  if (!otherToposCount)
    return (
      <Box flex={1}>
        <Button
          variant="infoSimplified"
          title="Agregar topo"
          flexDirection="row-reverse"
          titleVariant="p2R"
          padding="s"
          icon="add-circle"
          iconProps={{ size: 22 }}
          gap="xs"
          justifyContent="center"
          onPress={onAddTopoPress}
        />
      </Box>
    );
  return (
    <Box flex={1} flexDirection="row" gap="s">
      <Pressable
        flex={1}
        bg="grayscale.900"
        borderRadius={8}
        padding="s"
        alignItems="center"
        justifyContent="center"
        gap="s"
        flexDirection="row"
        onPress={() =>
          navigation.navigate(ClimbsNavigationRoutes.OtherTopos, {
            wallId,
            zoneId,
          })
        }
      >
        <Box bg="semantic.info" borderRadius={8} paddingHorizontal="s">
          <Text variant="p3R">{otherToposCount}</Text>
        </Box>
        <Text variant="p2R">{`Ver otros topos`}</Text>
      </Pressable>
      <Button
        variant="infoSimplified"
        title=""
        titleVariant="p2R"
        padding="s"
        icon="add-circle"
        iconProps={{ size: 20 }}
        gap="xs"
        justifyContent="center"
        onPress={onAddTopoPress}
      />
    </Box>
  );
};

export default OtherTopos;
