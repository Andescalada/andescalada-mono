import { AppRouter } from "@andescalada/api/src/routers/_app";
import { Box, Image, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import StaticRoutePaths from "@features/routesManager/components/StaticRoutePaths";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { useFitContent } from "@hooks/useFitContent";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FlashList } from "@shopify/flash-list";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

type Item = inferProcedureOutput<AppRouter["topos"]["toposToVerify"]>[number];

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.VerifyInformation>;

const VerifyInformationScreen: FC<Props> = ({
  route: {
    params: { zoneId },
  },
}) => {
  const toposToVerify = trpc.topos.toposToVerify.useQuery({ zoneId });
  return (
    <Screen>
      <FlashList
        data={toposToVerify.data}
        // refreshControl={refresh}
        showsVerticalScrollIndicator={false}
        // onEndReached={loadNext}
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
          publicId={item.Author.profilePhoto?.publicId || undefined}
          style={{ width: 40, height: 40, borderRadius: 40 }}
        />
        <Box>
          <Text fontSize={20} lineHeight={21}>
            {item.Author.name}
          </Text>
          <Text variant="p3R">{item.Author.username}</Text>
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
      <Box marginHorizontal="m" marginBottom="m">
        <Text variant="p1R">{item.Wall.name}</Text>
        <Text>
          {`${item.Wall.Sector.name} / ${item.Wall.Sector.Zone.name}`}
        </Text>
      </Box>
    </Box>
  );
};

export default VerifyInformationScreen;
