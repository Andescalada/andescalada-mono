import { Box, Button, Header, Screen, ScrollView, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import SelectImage from "@features/components/SelectImage";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import { onSuccessPick } from "@hooks/usePickImage";
import { FC, useState } from "react";
import { Alert } from "react-native";

type Props =
  RoutesManagerScreenProps<RoutesManagerNavigationRoutes.UploadTopoImage>;

const AddTopoScreen: FC<Props> = ({
  navigation,
  route: {
    params: { wallId, wallName, zoneId },
  },
}) => {
  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const [imageInServerId, setImageInServerId] = useState<string | null>(null);

  const utils = trpc.useContext();

  const createTopo = trpc.topos.create.useMutation();

  const saveImage = trpc.images.save.useMutation();

  const { uploadImage } = useCloudinaryImage();

  const onPickImage: onSuccessPick = async (imageToUpload) => {
    setImageToDisplay(imageToUpload.localUri);
    setLoadingUpload(true);
    try {
      const image = await uploadImage(imageToUpload.base64Img);
      const savedImage = await saveImage.mutateAsync({
        image,
      });
      setImageInServerId(savedImage.id);
    } catch (error) {
      Alert.alert("No pudimos subir la foto", "Inténtalo de nuevo");
    }
    setLoadingUpload(false);
  };

  return (
    <Screen padding="m">
      <Header
        title="Subir imagen"
        onGoBack={navigation.goBack}
        showOptions={false}
      />
      <ScrollView>
        <Box marginVertical="m">
          <SelectImage
            image={imageToDisplay}
            onPickImage={onPickImage}
            isLoading={loadingUpload}
          />
        </Box>
        <Box>
          <Text variant="h1">Sube una imagen de la pared</Text>
          <Text variant="p1B">Consideraciones:</Text>
          <Text variant="p3R">
            - La imagen puede contener una o varias rutas de la pared.
          </Text>
          <Text variant="p3R">
            - Intenta que no hayan obstáculos que escondan la pared.
          </Text>
        </Box>
      </ScrollView>
      <Button
        disabled={createTopo.isLoading || !imageInServerId}
        isLoading={createTopo.isLoading}
        title="Continuar"
        variant={imageInServerId ? "info" : "transparent"}
        padding="m"
        marginBottom="l"
        onPress={async () => {
          if (!imageInServerId) return;
          const newTopo = await createTopo.mutateAsync({
            imageId: imageInServerId,
            wallId,
            name: wallName,
            zoneId,
          });
          utils.topos.invalidate();
          navigation.navigate(RoutesManagerNavigationRoutes.TopoManager, {
            topoId: newTopo.id,
            wallId,
            zoneId,
          });
        }}
      />
    </Screen>
  );
};

export default AddTopoScreen;
