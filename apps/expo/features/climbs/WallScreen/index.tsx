import wall from "@andescalada/api/schemas/wall";
import {
  ActivityIndicator,
  Box,
  EditableTitle,
  ListItem,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import HeaderOptionsButton from "@features/climbs/components/HeaderOptionsButton";
import useHeaderOptionButton from "@features/climbs/components/HeaderOptionsButton/useHeaderOptions";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useOptionsSheet from "@hooks/useOptionsSheet";
import usePickImage from "@hooks/usePickImage";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import useUploadImage from "@hooks/useUploadImage";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { gradeUnits } from "@utils/climbingGrades";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, FlatList, Image } from "react-native";
import { z } from "zod";

const { schema } = wall;

type Form = z.infer<typeof schema>;

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>;

const WallScreen: FC<Props> = ({ route, navigation }) => {
  const { wallId } = route.params;
  const utils = trpc.useContext();
  const {
    data,
    refetch,
    isFetching,
    isLoading: isLoadingWall,
  } = trpc.walls.byId.useQuery(route.params.wallId);
  const refresh = useRefresh(refetch, isFetching);

  const mainTopo = data?.topos[0];

  const { pickImage, selectedImage } = usePickImage();

  const { uploadImage } = useUploadImage();

  const { mutate, isSuccess } = trpc.topos.add.useMutation();

  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const onUpload = async () => {
    if (!selectedImage) return;
    setIsLoadingUpload(true);
    const img = await uploadImage(selectedImage?.base64Img);
    mutate(
      {
        main: true,
        wallId,
        image: {
          assetId: img.asset_id,
          format: img.format,
          height: img.height,
          width: img.width,
          publicId: img.public_id,
          storageService: "Cloudinary",
          url: img.secure_url,
          version: img.version,
          bytes: img.bytes,
        },
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
  const methods = useForm<Form>();
  const onSubmit = methods.handleSubmit(
    (input) => {
      if (methods.formState.isDirty)
        editWall.mutate({
          name: input.name,
          wallId: route.params.wallId,
        });
      hProps.setEditing(false);
    },
    (error) => {
      const errorMessage = error.name?.message || "Hubo un error";
      Alert.alert(errorMessage);
      methods.setValue("name", route.params.wallName);
      hProps.setEditing(false);
    },
  );
  const hProps = useHeaderOptionButton({ onSave: onSubmit });
  const rootNavigation = useRootNavigation();

  const onOptions = useOptionsSheet({
    "Agregar Ruta": () =>
      navigation.navigate(ClimbsNavigationRoutes.AddRoute, {
        wallId,
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
      hProps.setEditing(true);
    },
  });

  return (
    <Screen padding={"m"}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <EditableTitle
          title={route.params.wallName}
          control={methods.control}
          editable={hProps.editing}
          name="name"
        />
        <HeaderOptionsButton {...hProps} onOptions={onOptions} />
      </Box>
      <Box flex={1 / 2}>
        {isLoadingWall && (
          <Box flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator />
          </Box>
        )}
        {!mainTopo && !selectedImage && !isLoadingWall && (
          <Pressable
            flex={1}
            borderColor="info"
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
            borderColor="info"
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
        {mainTopo?.image && (
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
              source={{ uri: mainTopo.image.url }}
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
          const grade = typeof n === "number" ? gradeUnits.FrenchGrade[n] : "?";
          return (
            <ListItem
              marginVertical={"s"}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
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
