import { Box, Image, Ionicons, Pressable, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import usePickImage from "@hooks/usePickImage";
import { FC, useState } from "react";
import { Alert } from "react-native";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.UploadTopoImage>;

const AddTopoScreen: FC<Props> = (props) => {
  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const utils = trpc.useContext();

  const { uploadImage } = useCloudinaryImage();

  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: false,
    onSuccess: async (imageToUpload) => {
      setImageToDisplay(imageToUpload.localUri);
      setLoadingUpload(true);
      try {
        const image = await uploadImage(imageToUpload.base64Img);
        // await uploadImageSubmission.mutateAsync({
        //   image,
        //   wallId,
        //   wallName,
        // });
        await utils.photoContest.invalidate();
        utils.topos.invalidate();
      } catch (error) {
        Alert.alert("No pudimos subir la foto", "Inténtalo de nuevo");
      }
      setLoadingUpload(false);
    },
  });

  return (
    <Screen>
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
          // disabled={currentContest.data && currentContest.data?.daysLeft <= 0}
          // onPress={() => pickImage(selectedImage)}
        >
          {!imageToDisplay ? (
            <Box justifyContent="center" alignItems={"center"}>
              <Ionicons name="camera-outline" size={30} />
              <Text marginTop="xs">Subir foto</Text>
            </Box>
          ) : (
            <Image source={{ uri: imageToDisplay }} height={250} width="100%" />
          )}
        </Pressable>
      </Box>
    </Screen>
  );
};

export default AddTopoScreen;
