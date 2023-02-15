import {
  A,
  ActivityIndicator,
  Box,
  Ionicons,
  Pressable,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import useOfflineMode from "@hooks/useOfflineMode";
import usePermissions from "@hooks/usePermissions";
import usePickImage from "@hooks/usePickImage";
import useViewImage from "@hooks/useViewImage";
import { useRoute } from "@react-navigation/native";
import { FC, useState } from "react";
import { Image } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

const AddTopoImage: FC = () => {
  const route = useRoute<NavigationRoute>();
  const { isOfflineMode } = useOfflineMode();
  const { wallId, zoneId } = route.params;
  const utils = trpc.useContext();
  const { data, isLoading: isLoadingWall } = trpc.walls.byId.useQuery({
    wallId,
    zoneId,
  });

  const mainTopo = data?.topos[0];

  const { pickImage, selectedImage } = usePickImage({ allowsEditing: false });

  const viewImage = useViewImage();

  const { uploadImage } = useCloudinaryImage();

  const { mutateAsync, isSuccess } = trpc.topos.add.useMutation();

  const { permission } = usePermissions({ zoneId });

  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const onUpload = async () => {
    if (!selectedImage) return;
    setIsLoadingUpload(true);
    try {
      const image = await uploadImage(selectedImage?.base64Img);
      await mutateAsync(
        {
          main: true,
          wallId,
          image,
          name: `${data?.name} topo`,
        },
        {
          onSuccess: () => {
            utils.walls.byId.invalidate({ wallId, zoneId });
          },
        },
      );
    } catch (err) {}
    setIsLoadingUpload(false);
  };

  const noTopoAndPermission =
    !mainTopo &&
    !selectedImage &&
    !isLoadingWall &&
    permission?.has("Create") &&
    !isOfflineMode;

  const noTopoAndNoPermission =
    !mainTopo &&
    !selectedImage &&
    !isLoadingWall &&
    (!permission?.has("Create") || isOfflineMode);

  const imageSelectedButNotUploaded = selectedImage && !isSuccess;

  if (noTopoAndPermission) {
    return (
      <Pressable
        flex={1}
        borderColor="semantic.info"
        borderWidth={2}
        borderRadius={10}
        borderStyle={"dashed"}
        justifyContent="center"
        alignItems={"center"}
        marginVertical="s"
        onPress={() => pickImage()}
      >
        <Text variant={"p1R"}>Agregar imagen</Text>
      </Pressable>
    );
  }

  if (noTopoAndNoPermission) {
    return (
      <Box
        flex={1}
        borderColor="semantic.info"
        borderWidth={2}
        borderRadius={10}
        borderStyle={"dashed"}
        justifyContent="center"
        alignItems={"center"}
        marginVertical="s"
      >
        <Text variant={"p1R"}>Pared sin topo</Text>
      </Box>
    );
  }

  if (imageSelectedButNotUploaded) {
    return (
      <A.Box
        flex={1}
        justifyContent="center"
        alignItems={"center"}
        marginVertical="s"
        overflow="hidden"
        entering={FadeIn}
        exiting={FadeOut}
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
          {isLoadingUpload ? (
            <Box
              justifyContent="center"
              alignItems="center"
              backgroundColor="grayscale.transparent.80.600"
              padding="m"
              borderRadius={32}
            >
              <ActivityIndicator
                padding="s"
                size="large"
                color="grayscale.white"
              />
            </Box>
          ) : (
            <Box flexDirection="row" width="100%" justifyContent="space-evenly">
              <Pressable
                justifyContent="center"
                alignItems="center"
                backgroundColor="grayscale.transparent.80.600"
                padding="m"
                borderRadius={32}
                onPress={() => pickImage(selectedImage)}
              >
                <Ionicons
                  name="ios-image-outline"
                  color="grayscale.white"
                  size={16}
                />
                <Text>Cambiar</Text>
              </Pressable>
              <Pressable
                justifyContent="center"
                alignItems="center"
                backgroundColor="grayscale.transparent.80.600"
                padding="m"
                borderRadius={32}
                onPress={onUpload}
              >
                <Ionicons name="checkmark" color="grayscale.white" size={16} />
                <Text>Confirmar</Text>
              </Pressable>
              <Pressable
                justifyContent="center"
                alignItems="center"
                backgroundColor="grayscale.transparent.80.600"
                padding="m"
                borderRadius={32}
                onPress={() =>
                  viewImage({
                    source: {
                      uri: selectedImage.localUri,
                      height: selectedImage.asset.height,
                      width: selectedImage.asset.width,
                    },
                  })
                }
              >
                <Ionicons
                  name="arrow-forward-sharp"
                  color="grayscale.white"
                  size={16}
                />
                <Text>Ver</Text>
              </Pressable>
            </Box>
          )}
        </Box>
        <Image
          style={{ flex: 1, width: "100%", height: 1000 }}
          source={{ uri: selectedImage.localUri }}
        />
      </A.Box>
    );
  }
  return <Box />;
};

export default AddTopoImage;
