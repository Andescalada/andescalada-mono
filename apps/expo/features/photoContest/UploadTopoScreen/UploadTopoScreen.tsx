import {
  Box,
  Button,
  Header,
  Image,
  Ionicons,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/photoContest/components/UserItem";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import usePickImage from "@hooks/usePickImage";
import { FC, useEffect, useMemo, useState } from "react";
import { Alert, FlatList } from "react-native";

type Props = PhotoContestScreenProps<PhotoContestRoutes.UploadTopo>;

const UploadTopoScreen: FC<Props> = ({
  route: {
    params: { wallName, wallId, zoneId },
  },
  navigation,
}) => {
  const submission = trpc.photoContest.getUserTopoSubmission.useQuery({
    wallId,
  });

  console.log(submission.data?.id);

  const utils = trpc.useContext();

  const [loadingUpload, setLoadingUpload] = useState(false);

  const uploadImageSubmission = trpc.photoContest.uploadImageTopo.useMutation({
    onSuccess: async () => {
      await utils.photoContest.invalidate();
      setLoadingUpload(false);
    },
  });

  const submitTopo = trpc.photoContest.submitTopo.useMutation({
    onSuccess: () => {
      utils.photoContest.invalidate();
    },
  });

  const { uploadImage } = useCloudinaryImage();

  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: false,
    onSuccess: async (imageToUpload) => {
      setImageToDisplay(imageToUpload.localUri);
      setLoadingUpload(true);
      try {
        const image = await uploadImage(imageToUpload.base64Img);
        await uploadImageSubmission.mutateAsync({
          image,
          wallId,
          userPhotoContestTopoId: submission.data?.id,
          wallName,
        });
      } catch (error) {
        Alert.alert("No pudimos subir la foto", "Inténtalo de nuevo");
      }
    },
  });

  const { data } = trpc.photoContest.userParticipatingByWall.useQuery({
    wallId,
  });

  const imageInServer = useCloudinaryUrl("optimizedImage", {
    publicId: submission.data?.Topo.image.publicId,
  });

  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) setImageToDisplay(selectedImage.localUri);
    else if (imageInServer) {
      setImageToDisplay(imageInServer.url);
    }
  }, [imageInServer, selectedImage]);

  const submitButtonOptions = useMemo(() => {
    if (!submission.data?.Topo.image) {
      return {
        title: "Enviar",
        variant: "transparent" as const,
      };
    }
    if (submission.data?.isSubmitted)
      return {
        title: "Reenviar",
        variant: "info" as const,
      };
    return {
      title: "Enviar",
      variant: "success" as const,
    };
  }, [submission.data?.Topo.image, submission.data?.isSubmitted]);

  if (submission.data === undefined) return null;

  return (
    <Screen padding="m">
      <Header
        title={wallName}
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <Box marginVertical="m">
        <Pressable
          height={250}
          borderColor={imageToDisplay ? "transparent" : "semantic.info"}
          borderWidth={2}
          borderRadius={10}
          borderStyle="dashed"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          onPress={() => pickImage(selectedImage)}
        >
          {!imageToDisplay ? (
            <Box justifyContent="center" alignItems={"center"}>
              <Ionicons name="camera-outline" size={30} />
              <Text marginTop="xs">Subir foto de esta pared</Text>
            </Box>
          ) : (
            <Image source={{ uri: imageToDisplay }} height={250} width="100%" />
          )}
        </Pressable>
      </Box>
      <Box flexDirection="row" gap="s" height={30} marginVertical="s">
        <Button
          variant="transparentSimplified"
          title="Rutas"
          titleVariant="p2R"
          flex={1}
          onPress={() =>
            navigation.navigate(PhotoContestRoutes.RouteList, {
              wallId,
              wallName,
              zoneId,
            })
          }
        />
        <Button
          variant="transparentSimplified"
          title="Compartir"
          icon="share-outline"
          flex={1}
          iconProps={{ size: 18 }}
          gap="xs"
          titleVariant="p2R"
          onPress={() => {
            if (!submission.data?.id) {
              Alert.alert(
                "No se ha subido ninguna foto",
                "Sube una foto primero",
              );
              return;
            }
            navigation.navigate(PhotoContestRoutes.Share, {
              wallId,
              zoneId,
            });
          }}
        />
      </Box>
      <Box flex={1}>
        <Text variant="p1R">Usuarios participando</Text>
        <FlatList
          data={data}
          ListEmptyComponent={() => (
            <Box marginTop="l">
              <Text variant="p3R">
                No hay usuarios participando por esta pared todavía
              </Text>
            </Box>
          )}
          renderItem={({ item }) => <UserItem item={item.User} />}
        />
      </Box>
      <Button
        {...submitButtonOptions}
        marginBottom="l"
        disabled={submitTopo.isLoading || loadingUpload}
        isLoading={submitTopo.isLoading || loadingUpload}
        onPress={() => {
          if (!submission.data?.id) {
            Alert.alert(
              "No se ha subido ninguna foto",
              "Sube una foto primero",
            );
            return;
          }

          if (submission.data?.isSubmitted) {
            Alert.alert(
              "¿Volver a enviar?",
              "Tu entrega anterior será borrada y reemplazada por esta",
              [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Aceptar",
                  onPress: () => {
                    if (submission.data?.id)
                      submitTopo.mutate({
                        userPhotoContestTopoId: submission.data?.id,
                      });
                  },
                },
              ],
            );
            return;
          }

          submitTopo.mutate({
            userPhotoContestTopoId: submission.data?.id,
          });
        }}
      />
    </Screen>
  );
};

export default UploadTopoScreen;
