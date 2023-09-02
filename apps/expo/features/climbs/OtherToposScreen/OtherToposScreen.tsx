import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  A,
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
import { FC, useState } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FadeOut, StretchInY } from "react-native-reanimated";

type Item = inferProcedureOutput<AppRouter["topos"]["otherTopos"]>[number];

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.OtherTopos>;

const OtherToposScreen: FC<Props> = ({
  navigation,
  route: {
    params: { wallId, zoneId },
  },
}) => {
  const [chooseMainTopo, setChooseMainTopo] = useState(false);
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
      <Box alignItems="flex-end" paddingHorizontal="m" paddingBottom="s">
        <Button
          variant={chooseMainTopo ? "infoSmall" : "infoSmallOutline"}
          titleVariant="p3R"
          title="Definir topo principal"
          paddingHorizontal="s"
          paddingVertical="xs"
          onPress={() => setChooseMainTopo((prev) => !prev)}
        />
      </Box>
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
        renderItem={({ item }) => (
          <Item item={item} chooseMainTopo={chooseMainTopo} />
        )}
      />
    </Screen>
  );
};

const Item = ({
  item,
  chooseMainTopo,
}: {
  item: Item;
  chooseMainTopo: boolean;
}) => {
  const utils = trpc.useContext();

  const setMainTopo = trpc.topos.setMainTopo.useMutation({
    onMutate: async ({ wallId, zoneId, topoId }) => {
      await utils.topos.otherTopos.cancel({ wallId, zoneId });
      const previousData = utils.topos.otherTopos.getData({ wallId, zoneId });
      utils.topos.otherTopos.setData({ wallId, zoneId }, (data) => {
        if (!data) return data;
        const newData = data;
        const currentMainTopo = data.findIndex((topo) => topo.main === true);
        const mainTopo = data.findIndex((topo) => topo.id === topoId);
        if (mainTopo === -1) return data;
        newData[mainTopo].main = true;
        if (currentMainTopo !== -1) newData[currentMainTopo].main = false;
        return newData;
      });
      return { previousData };
    },
    onError: (_, { zoneId, wallId }, context) => {
      utils.topos.otherTopos.setData({ wallId, zoneId }, context?.previousData);
    },
    onSettled: (_, __, params) => {
      const { zoneId, wallId } = params;
      utils.topos.otherTopos.invalidate({ wallId, zoneId });
      utils.walls.byId.invalidate({ wallId, zoneId });
    },
  });

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
      {chooseMainTopo && (
        <A.Box entering={StretchInY} exiting={FadeOut} padding="m">
          <Button
            variant="infoSmall"
            title="Definir como topo principal"
            titleVariant="p2R"
            onPress={() => {
              setMainTopo.mutate({
                wallId: item.Wall.id,
                zoneId: item.Wall.Sector.Zone.id,
                topoId: item.id,
              });
            }}
          />
        </A.Box>
      )}
    </Box>
  );
};

export default OtherToposScreen;
