import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  Box,
  Button,
  Header,
  Image,
  LoadingScreen,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import StaticRoutePaths from "@features/routesManager/components/StaticRoutePaths";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { useFitContent } from "@hooks/useFitContent";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type Item = inferProcedureOutput<AppRouter["topos"]["otherTopos"]>[number];

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.OtherTopos>;

const OtherToposScreen: FC<Props> = ({
  navigation,
  route: {
    params: { wallId, zoneId },
  },
}) => {
  const topos = trpc.topos.otherTopos.useQuery({ zoneId, wallId });

  const refresh = useRefresh(topos.refetch, topos.isFetching);

  return (
    <Screen>
      <Header
        padding="m"
        title="Otros topos"
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
      </Pressable>
    </Box>
  );
};

export default OtherToposScreen;
