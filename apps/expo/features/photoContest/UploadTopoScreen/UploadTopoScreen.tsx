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
import { FC, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

type Props = PhotoContestScreenProps<PhotoContestRoutes.UploadTopo>;

const UploadTopoScreen: FC<Props> = ({
  route: {
    params: { wallName, wallId },
  },
  navigation,
}) => {
  const submission = trpc.photoContest.getUserTopoSubmission.useQuery({
    wallId,
  });

  const utils = trpc.useContext();

  const uploadImageSubmission = trpc.photoContest.uploadImageTopo.useMutation({
    onSuccess: () => {
      utils.photoContest.invalidate();
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
      const image = await uploadImage(imageToUpload.base64Img);
      uploadImageSubmission.mutate({
        image,
        wallId,
        userPhotoContestTopoId: submission.data?.id,
        wallName,
      });
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
        variant={submission.data?.isSubmitted ? "transparent" : "info"}
        title={submission.data?.isSubmitted ? "Enviada" : "Enviar"}
        marginBottom="l"
        isLoading={submitTopo.isLoading}
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
