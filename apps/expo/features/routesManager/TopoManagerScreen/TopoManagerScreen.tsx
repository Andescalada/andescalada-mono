import {
  Box,
  Button,
  ListItem,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { MultiPitchManagerRoutes } from "@features/multiPitchManager/Navigation/types";
import TopoViewer from "@features/routesManager/components/TopoViewer";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerRouteProps,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import { useFitContent } from "@hooks/useFitContent";
import useNavigateToRouteDrawer from "@hooks/useNavigateToRouteDrawer";
import useRootNavigation from "@hooks/useRootNavigation";
import useRouteList, { RouteListData } from "@hooks/useRouteList";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useRoute } from "@react-navigation/native";
import { FC } from "react";
import { FlatList, useWindowDimensions } from "react-native";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.TopoManager>;

type Item = NonNullable<RouteListData>["routes"][number];

type ChildrenItem =
  NonNullable<RouteListData>["routes"][number]["ChildrenRoutes"][number];

const TopoManagerScreen: FC<Props> = ({
  route: {
    params: { topoId, zoneId, wallId, goBackOnFinish },
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
          renderItem={({ item: route }) => <RouteItem route={route} />}
        />
      </Box>
      <Button
        margin="m"
        padding="s"
        titleVariant="p1R"
        marginBottom="xl"
        title="Finalizar"
        onPress={() => {
          if (goBackOnFinish) {
            navigation.goBack();
            return;
          }
          navigation.navigate(RoutesManagerNavigationRoutes.ToposByUser, {
            wallId,
            wallName: topo.data.Wall.name,
            zoneId,
          });
        }}
        variant="infoSimplified"
      />
    </Screen>
  );
};

const RouteItem = ({ route }: { route: Item }) => {
  const {
    params: { topoId, wallId, zoneId },
  } =
    useRoute<
      RoutesManagerRouteProps<RoutesManagerNavigationRoutes.TopoManager>
    >();

  const rootNavigation = useRootNavigation();

  const { navigateToDrawRoute } = useNavigateToRouteDrawer({
    id: route.id,
    position: route.position,
    topoId,
    zoneId,
    wallId,
    extendedRouteId: route.extendedRouteId,
    variantRouteId: route.variantRouteId,
    singleEdition: true,
    goBackOnSuccess: true,
  });

  const navigateToDraw = () => {
    if (route.isMultiPitch) {
      rootNavigation.navigate(RootNavigationRoutes.MultiPitchManager, {
        screen: MultiPitchManagerRoutes.MultiPitchManager,
        params: {
          multiPitchId: route.id,
          multiPitchName: route.name,
          zoneId,
          topoId,
          wallId,
          drawingOnly: true,
          goBackOnSuccess: true,
        },
      });
      return;
    }
    navigateToDrawRoute();
  };

  return (
    <Box
      marginBottom="s"
      marginHorizontal="m"
      alignItems="center"
      justifyContent="center"
      flex={1}
    >
      <ListItem
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        padding="l"
        borderRadius={16}
        onPress={navigateToDraw}
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
      <Box flex={1} width="95%">
        {route.ChildrenRoutes.map((childrenRoute, index) => (
          <ChildrenRouteItem
            key={childrenRoute.id}
            childrenRoute={childrenRoute}
            index={index}
            totalOfChildrenRoutes={route.ChildrenRoutes.length}
          />
        ))}
      </Box>
    </Box>
  );
};

const ChildrenRouteItem = ({
  childrenRoute,
  index,
  totalOfChildrenRoutes,
}: {
  childrenRoute: ChildrenItem;
  index: number;
  totalOfChildrenRoutes: number;
}) => {
  const {
    params: { topoId, wallId, zoneId },
  } =
    useRoute<
      RoutesManagerRouteProps<RoutesManagerNavigationRoutes.TopoManager>
    >();
  const { navigateToDrawRoute } = useNavigateToRouteDrawer({
    id: childrenRoute.id,
    position: childrenRoute.position,
    topoId,
    zoneId,
    wallId,
    extendedRouteId: childrenRoute.extendedRouteId,
    variantRouteId: childrenRoute.variantRouteId,
    singleEdition: true,
    goBackOnSuccess: true,
  });
  return (
    <Pressable
      key={childrenRoute.id}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottomLeftRadius={index === totalOfChildrenRoutes - 1 ? 16 : 0}
      borderBottomRightRadius={index === totalOfChildrenRoutes - 1 ? 16 : 0}
      borderBottomWidth={index === totalOfChildrenRoutes - 1 ? 2 : 1}
      borderLeftWidth={2}
      borderRightWidth={2}
      borderBottomColor="grayscale.white"
      borderLeftColor="grayscale.white"
      borderRightColor="grayscale.white"
      flex={1}
      padding="m"
      onPress={navigateToDrawRoute}
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
            {childrenRoute.position}
          </Text>
        </Box>
        <Box flex={1}>
          <Text variant="p2R" ellipsizeMode="tail" numberOfLines={1}>
            {childrenRoute.name}
          </Text>
          <Text variant="caption" color="grayscale.400">
            {childrenRoute.kindStringify}
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" alignItems="center">
        <Text variant="p2R">{childrenRoute.gradeStringify}</Text>
      </Box>
    </Pressable>
  );
};

export default TopoManagerScreen;
