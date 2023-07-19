import { Box, Header, ListItem, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import TopoViewer from "@features/routesManager/components/TopoViewer";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { useFitContent } from "@hooks/useFitContent";
import useRouteList from "@hooks/useRouteList";
import { FC } from "react";
import { FlatList, useWindowDimensions } from "react-native";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoManager>;

const TopoManagerScreen: FC<Props> = ({
  route: {
    params: { topoId, zoneId, wallId },
  },
  navigation,
}) => {
  const topo = trpc.topos.byId.useQuery({ topoId, zoneId });
  const { data: { routes } = {} } = useRouteList(
    { wallId, zoneId },
    { staleTime: 3 * 60 * 1000, cacheTime: 5 * 60 * 1000 },
  );

  const imageData = topo.data?.image;

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const fitted = useFitContent(
    {
      height: imageData?.height ? imageData.height : 0,
      width: imageData?.width ? imageData?.width : 0,
    },
    "width",
    screenWidth,
  );

  if (!topo.data) return null;
  return (
    <Screen>
      <Header
        title={topo.data.Wall.name}
        padding="m"
        onGoBack={navigation.goBack}
      />
      <Box flex={1}>
        <FlatList
          ListHeaderComponent={() => (
            <Box>
              <Box
                height={fitted.height}
                maxHeight={screenHeight}
                overflow="scroll"
              >
                <TopoViewer data={topo.data} center={false} disableGesture />
              </Box>
              <Box margin="m" flex={1}>
                <Text variant="p1R">
                  {" "}
                  Selecciona la ruta que quieres dibujar
                </Text>
              </Box>
            </Box>
          )}
          showsVerticalScrollIndicator={false}
          data={routes}
          renderItem={({ item: route }) => (
            <>
              <ListItem
                marginHorizontal="m"
                flexDirection="row"
                marginBottom="s"
                alignItems="center"
                justifyContent="space-between"
                padding="l"
                borderRadius={16}
                onPress={() => {
                  navigation.navigate(
                    RoutesManagerNavigationRoutes.RouteDrawer,
                    {
                      topoId,
                      zoneId,
                      wallId,
                      singleEdition: true,
                      goBackOnSuccess: true,
                      route: { id: route.id, position: route.position },
                    },
                  );
                }}
              >
                <Box flexDirection="row" flex={1}>
                  <Box
                    borderWidth={1}
                    borderColor="text"
                    borderRadius={15}
                    height={30}
                    width={30}
                    justifyContent="center"
                    alignItems="center"
                    marginRight="s"
                  >
                    <Text
                      variant="p2B"
                      paddingHorizontal="xs"
                      fontSize={14}
                      textAlign="center"
                      ellipsizeMode="tail"
                      numberOfLines={1}
                    >
                      {route.position}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    <Text variant="p2R" ellipsizeMode="tail" numberOfLines={1}>
                      {route.name}
                    </Text>
                    <Text variant="caption" color="grayscale.400">
                      {route.kindStringify}
                    </Text>
                  </Box>
                </Box>
                <Box flexDirection="row" alignItems="center">
                  <Text variant="p2R">{route.gradeStringify}</Text>
                </Box>
              </ListItem>
            </>
          )}
        />
      </Box>
    </Screen>
  );
};

export default TopoManagerScreen;
