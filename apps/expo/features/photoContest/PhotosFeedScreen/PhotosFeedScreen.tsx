import { AppRouter } from "@andescalada/api/src/routers/_app";
import { Box, Header, Image, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import StaticRoutePaths from "@features/routesManager/components/StaticRoutePaths";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { useFitContent } from "@hooks/useFitContent";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FlashList } from "@shopify/flash-list";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

type Item = inferProcedureOutput<
  AppRouter["photoContest"]["submittedPhotos"]
>["items"][0];

type Props = PhotoContestScreenProps<PhotoContestRoutes.PhotosFeed>;

const PhotosFeedScreen: FC<Props> = ({ navigation }) => {
  const { data, fetchNextPage, hasNextPage, refetch, isFetching } =
    trpc.photoContest.submittedPhotos.useInfiniteQuery(
      {
        limit: 3,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  const flattenData = data?.pages.flatMap((page) => page.items);
  const loadNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const refresh = useRefresh(refetch, isFetching);
  return (
    <Screen>
      <Header
        title="Fotos participando"
        onGoBack={navigation.goBack}
        showOptions={false}
        margin="m"
      />
      <FlashList
        data={flattenData}
        refreshControl={refresh}
        showsVerticalScrollIndicator={false}
        onEndReached={loadNext}
        onEndReachedThreshold={0.2}
        estimatedItemSize={300}
        renderItem={({ item }) => <Item item={item} />}
      />
    </Screen>
  );
};

const Item = ({ item }: { item: Item }) => {
  const rootNavigation = useRootNavigation();
  const screenWidth = useWindowDimensions().width;
  const topoImage = item?.Topo.image;
  const imageInServer = useCloudinaryUrl("optimizedImage", {
    publicId: topoImage.publicId,
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
      borderBottomWidth={2}
      borderBottomColor="brand.transparent.secondaryA"
    >
      <Box
        flexDirection="row"
        marginHorizontal="m"
        marginBottom="s"
        alignItems="center"
        gap="s"
      >
        <UserProfileImage
          publicId={item.User.profilePhoto?.publicId || undefined}
          style={{ width: 40, height: 40, borderRadius: 40 }}
        />
        <Box>
          <Text fontSize={20} lineHeight={21}>
            {item.User.name}
          </Text>
          <Text variant="p3R">{item.User.username}</Text>
        </Box>
      </Box>
      <Pressable
        onPress={() => {
          rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
            screen: RoutesManagerNavigationRoutes.TopoViewer,
            params: {
              topoId: item.Topo.id,
              zoneId: item.Topo.Wall.Sector.Zone.id,
            },
          });
        }}
      >
        <Image
          position="absolute"
          transition={300}
          contentFit={"contain"}
          top={0}
          left={0}
          source={imageInServer?.url}
          height={fitted.height}
          width={fitted.width}
        />
        <StaticRoutePaths
          routes={item.Topo.RoutePath}
          imageHeight={topoImage?.height}
          imageWidth={topoImage?.width}
          height={fitted.height}
          width={fitted.width}
        />
      </Pressable>
      <Box marginHorizontal="m" marginBottom="m">
        <Text variant="p1R">{item.Topo.Wall.name}</Text>
        <Text>
          {`${item.Topo.Wall.Sector.name} / ${item.Topo.Wall.Sector.Zone.name}`}
        </Text>
      </Box>
    </Box>
  );
};

export default PhotosFeedScreen;
