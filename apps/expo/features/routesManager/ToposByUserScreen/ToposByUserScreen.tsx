import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  A,
  Box,
  Header,
  Image,
  LoadingScreen,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import StaticRoutePaths from "@features/routesManager/components/StaticRoutePaths";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { useFitContent } from "@hooks/useFitContent";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.ToposByUser>;

type Item = inferProcedureOutput<AppRouter["topos"]["toposByUser"]>[number];

const ToposByUserScreen: FC<Props> = ({
  route: {
    params: { wallId, zoneId, wallName },
  },
  navigation,
}) => {
  const topos = trpc.topos.toposByUser.useQuery({ zoneId, wallId });

  const { permission } = usePermissions({ zoneId });

  const refresh = useRefresh(topos.refetch, topos.isFetching);

  return (
    <Screen>
      <Header
        padding="m"
        title={`Mis topos para ${wallName}`}
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <FlatList
        data={topos.data}
        refreshControl={refresh}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={() => {
          return topos.isLoading ? (
            <LoadingScreen />
          ) : (
            <Text variant="p2R" marginTop="xxxl" padding="m">
              No hay topos para verificar
            </Text>
          );
        }}
        renderItem={({ item }) => <Item item={item} />}
      />
    </Screen>
  );
};

const Item = ({ item }: { item: Item }) => {
  const utils = trpc.useContext();

  const rootNavigation = useRootNavigation();
  const screenWidth = useWindowDimensions().width;
  const topoImage = item?.image;
  const imageInServer = useCloudinaryUrl("optimizedImage", {
    publicId: topoImage.publicId,
    quality: 50,
  });

  const fitted = useFitContent(
    {
      height: topoImage?.height ? topoImage.height : 0,
      width: topoImage?.width ? topoImage?.width : 0,
    },
    "width",
    screenWidth,
  );

  return (
    <Box
      marginBottom="m"
      borderBottomWidth={1}
      borderBottomColor="grayscale.900"
      paddingBottom="m"
    >
      <Box
        flexDirection="row"
        marginHorizontal="m"
        marginBottom="s"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box alignItems="center" gap="s" flexDirection="row">
          <UserProfileImage
            publicId={item.Author.profilePhoto?.publicId || undefined}
            style={{ width: 30, height: 30, borderRadius: 30 }}
          />
          <Box>
            <Text variant="p2R">{"@" + item.Author.username}</Text>
          </Box>
        </Box>
        <Box>
          <Text variant="p3R" color="grayscale.400">
            {item.createdAt.toLocaleDateString("es-CL").replaceAll("-", "/")}
          </Text>
        </Box>
      </Box>
      <Pressable
        onPress={() => {
          rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
            screen: RoutesManagerNavigationRoutes.TopoViewer,
            params: {
              topoId: item.id,
              zoneId: item.Wall.Sector.Zone.id,
            },
          });
        }}
      >
        <Image
          position="absolute"
          cachePolicy="memory"
          transition={300}
          recyclingKey={item.id}
          contentFit={"contain"}
          top={0}
          left={0}
          source={imageInServer?.url}
          height={fitted.height}
          width={fitted.width}
        />
        <StaticRoutePaths
          routes={item.RoutePath}
          imageHeight={topoImage?.height}
          imageWidth={topoImage?.width}
          height={fitted.height}
          width={fitted.width}
        />
        {item.main && (
          <A.Box
            position="absolute"
            bg="semantic.success"
            borderRadius={16}
            top={16}
            left={16}
            padding="s"
          >
            <Text>Topo principal</Text>
          </A.Box>
        )}
      </Pressable>
    </Box>
  );
};

export default ToposByUserScreen;
