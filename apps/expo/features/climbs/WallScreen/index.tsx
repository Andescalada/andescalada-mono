import wall from "@andescalada/api/schemas/wall";
import {
  ActivityIndicator,
  Box,
  ListItem,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Header from "@features/climbs/components/Header";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import useOptionsSheet from "@hooks/useOptionsSheet";
import usePickImage from "@hooks/usePickImage";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import useUploadImage from "@hooks/useUploadImage";
import useZodForm from "@hooks/useZodForm";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { getThumbnail } from "@utils/cloudinary";
import { FC, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Alert, FlatList, Image } from "react-native";

const { schema } = wall;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>;

const WallScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId, zoneId } = route.params;
  const utils = trpc.useContext();
  const {
    data,
    refetch,
    isFetching,
    isLoading: isLoadingWall,
  } = trpc.walls.byId.useQuery(route.params.wallId);
  const refresh = useRefresh(refetch, isFetching);

  const { gradeSystem } = useGradeSystem();

  const mainTopo = data?.topos[0];

  const { pickImage, selectedImage } = usePickImage();

  const { uploadImage } = useUploadImage();

  const { mutate, isSuccess } = trpc.topos.add.useMutation();

  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const onUpload = async () => {
    if (!selectedImage) return;
    setIsLoadingUpload(true);
    const image = await uploadImage(selectedImage?.base64Img);
    mutate(
      {
        main: true,
        wallId,
        image,
        name: `${data?.name} topo`,
      },
      {
        onSuccess: () => {
          utils.walls.byId.invalidate(wallId);
          setIsLoadingUpload(false);
        },
      },
    );
  };

  const editWall = trpc.walls.edit.useMutation();
  const methods = useZodForm({ schema });
  const onSubmit = methods.handleSubmit(
    (input) => {
      if (methods.formState.isDirty)
        editWall.mutate({
          name: input.name,
          wallId: route.params.wallId,
        });
      headerMethods.setEditing(false);
    },
    (error) => {
      const errorMessage = error.name?.message || "Hubo un error";
      Alert.alert(errorMessage);
      methods.setValue("name", route.params.wallName);
      headerMethods.setEditing(false);
    },
  );
  const headerMethods = useHeaderOptionButton({ onSave: onSubmit });
  const rootNavigation = useRootNavigation();

  const onOptions = useOptionsSheet({
    "Agregar Ruta": () =>
      navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
        wallId,
        zoneId,
      }),
    "Editar Topo": {
      action: () =>
        rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
          screen: RoutesManagerNavigationRoutes.SelectRouteToDraw,
          params: {
            wallId,
          },
        }),
      hide: !data || data.topos.length === 0,
    },
    "Cambiar Nombre": () => {
      headerMethods.setEditing(true);
    },
  });

  return (
    <Screen padding={"m"}>
      <FormProvider {...methods}>
        <Header
          title={route.params.wallName}
          editingTitle={headerMethods.editing}
          headerOptionsProps={{ ...headerMethods, onOptions: onOptions }}
        />
      </FormProvider>
      <Box flex={1 / 2}>
        {isLoadingWall && (
          <Box flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator />
          </Box>
        )}
        {!mainTopo && !selectedImage && !isLoadingWall && (
          <Pressable
            flex={1}
            borderColor="semantic.info"
            borderWidth={2}
            borderRadius={10}
            borderStyle={"dashed"}
            justifyContent="center"
            alignItems={"center"}
            marginVertical="s"
            onPress={pickImage}
          >
            <Text variant={"p1R"}>Agregar topo</Text>
          </Pressable>
        )}
        {selectedImage && !isSuccess && (
          <Pressable
            flex={1}
            borderColor="semantic.info"
            borderWidth={2}
            borderRadius={10}
            borderStyle={"dashed"}
            justifyContent="center"
            alignItems={"center"}
            marginVertical="s"
            overflow="hidden"
            position="relative"
            onPress={onUpload}
          >
            <Box
              position="absolute"
              top={0}
              bottom={0}
              right={0}
              left={0}
              flex={1}
              zIndex={100}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                backgroundColor="textContrast"
                alignItems="stretch"
                paddingHorizontal="s"
              >
                {isLoadingUpload ? (
                  <ActivityIndicator padding="s" />
                ) : (
                  <Text variant="h2">Subir</Text>
                )}
              </Box>
            </Box>
            <Image
              style={{ flex: 1, width: "100%", height: 1000 }}
              source={{ uri: selectedImage.localUri }}
            />
          </Pressable>
        )}
        {mainTopo?.image.publicId && (
          <Pressable
            flex={1}
            borderRadius={10}
            justifyContent="center"
            alignItems={"center"}
            marginVertical="s"
            overflow="hidden"
            onPress={() => {
              rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
                screen: RoutesManagerNavigationRoutes.TopoViewer,
                params: {
                  topoId: mainTopo.id,
                },
              });
            }}
          >
            <Image
              style={{ flex: 1, width: "100%", height: 1000 }}
              source={{ uri: getThumbnail(mainTopo.image.publicId).url || "" }}
            />
          </Pressable>
        )}
      </Box>
      <FlatList
        data={data?.routes}
        refreshControl={refresh}
        contentContainerStyle={{ flex: 1 }}
        ListEmptyComponent={() => (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text variant={"h3"}>Sin rutas</Text>
          </Box>
        )}
        renderItem={({ item }) => {
          const n = item.RouteGrade?.grade;
          const grade = typeof n === "number" ? gradeSystem(n, item.kind) : "?";
          return (
            <ListItem
              marginVertical={"s"}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              onPress={() => {
                if (!mainTopo?.id) return;
                rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
                  screen: RoutesManagerNavigationRoutes.TopoViewer,
                  params: {
                    topoId: mainTopo?.id,
                    routeId: item.id,
                  },
                });
              }}
            >
              <Text variant="p2R">{`${item.position} - ${item.name}`}</Text>
              <Text variant="p2R">{grade}</Text>
            </ListItem>
          );
        }}
      />
    </Screen>
  );
};

export default WallScreen;
