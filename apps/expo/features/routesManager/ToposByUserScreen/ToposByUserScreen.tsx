import { AppRouter } from "@andescalada/api/src/routers/_app";
import {
  A,
  Box,
  Button,
  Header,
  Image,
  Ionicons,
  LoadingScreen,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import StaticRoutePaths from "@features/routesManager/components/StaticRoutePaths";
import {
  RoutesManagerNavigationProps,
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { useFitContent } from "@hooks/useFitContent";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation } from "@react-navigation/native";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";
import { Alert, useWindowDimensions } from "react-native";
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

  const refresh = useRefresh(topos.refetch, topos.isFetching);

  const onAddTopo = () => {
    navigation.navigate(RoutesManagerNavigationRoutes.UploadTopoImage, {
      wallId,
      zoneId,
      wallName,
    });
  };

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
              Sin topos
            </Text>
          );
        }}
        renderItem={({ item }) => <Item item={item} />}
      />
      <Button
        marginHorizontal="m"
        marginBottom="xl"
        variant="infoSimplified"
        title="Agregar topo"
        titleVariant="p1R"
        padding="s"
        icon="add-circle"
        iconProps={{ size: 22 }}
        gap="s"
        onPress={onAddTopo}
      />
    </Screen>
  );
};

const Item = ({ item }: { item: Item }) => {
  const utils = trpc.useContext();

  const deleteTopo = trpc.topos.deleteTopoByUser.useMutation({
    onMutate: async ({ topoId, zoneId }) => {
      await utils.topos.toposByUser.cancel({ wallId: item.Wall.id, zoneId });
      const previousData = utils.topos.toposByUser.getData();

      utils.topos.toposByUser.setData(
        { wallId: item.Wall.id, zoneId },
        (data) => (data ? data.filter((topo) => topo.id !== topoId) : data),
      );

      return { previousData };
    },
    onError: (error, { zoneId }, context) => {
      if (error.message === "Cannot delete main") {
        Alert.alert(
          "No puedes eliminar el topo principal",
          "Selecciona otro topo como principal para eliminar este",
        );
      }
      utils.topos.toposByUser.setData(
        { wallId: item.Wall.id, zoneId },
        context?.previousData,
      );
    },
    onSettled: () => {
      utils.topos.invalidate();
    },
  });

  const navigation =
    useNavigation<
      RoutesManagerNavigationProps<RoutesManagerNavigationRoutes.ToposByUser>
    >();

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

  const onEditTopo = () => {
    navigation.navigate(RoutesManagerNavigationRoutes.TopoManager, {
      topoId: item.id,
      zoneId: item.Wall.Sector.Zone.id,
      wallId: item.Wall.id,
    });
  };

  const onDeleteTopo = () => {
    Alert.alert("Eliminar topo", "¿Estás seguro de eliminar el topo?", [
      {
        text: "Eliminar",
        onPress: () => {
          deleteTopo.mutate({
            topoId: item.id,
            zoneId: item.Wall.Sector.Zone.id,
          });
        },
        style: "destructive",
      },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

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
        <Box
          position="absolute"
          right={16}
          top={16}
          flexDirection="row"
          gap="s"
        >
          <Pressable
            bg="semantic.info"
            width={40}
            height={40}
            borderRadius={20}
            justifyContent="center"
            alignItems="center"
            onPress={onEditTopo}
          >
            <Ionicons name="pencil-sharp" size={24} color="grayscale.white" />
          </Pressable>
          <Pressable
            bg="semantic.error"
            width={40}
            height={40}
            borderRadius={20}
            justifyContent="center"
            alignItems="center"
            onPress={onDeleteTopo}
          >
            <Ionicons name="close-sharp" size={24} color="grayscale.white" />
          </Pressable>
        </Box>
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
