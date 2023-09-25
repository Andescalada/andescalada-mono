import {
  Box,
  Button,
  LoadingModal,
  LoadingScreen,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import SelectImage from "@features/components/SelectImage";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { onSuccessPick } from "@hooks/usePickImage";
import { useNotifications } from "@utils/notificated";
import { FC, useCallback, useState } from "react";
import { Alert } from "react-native";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ManageZoneCoverPhotoScreen>;

const ManageZoneCoverPhotoScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  const [imageToDisplay, setImageToDisplay] = useState<
    Parameters<onSuccessPick>[0] | null
  >(null);

  const coverPhoto = trpc.zones.getCoverPhoto.useQuery({ zoneId });
  const imageInServer = useCloudinaryUrl("optimizedImage", {
    publicId: coverPhoto?.data?.publicId,
    quality: 50,
  });
  const [loadingUpload, setLoadingUpload] = useState(false);

  const pickImageHandler: onSuccessPick = useCallback(async (imageToUpload) => {
    const proportion = imageToUpload.asset.width / imageToUpload.asset.height;
    const aspectRatio = proportion > 1 ? "landscape" : "portrait";

    if (aspectRatio === "portrait") {
      Alert.alert("La foto debe ser de horizontal");
      throw new Error("cover photo is not landscape");
    }

    setImageToDisplay(imageToUpload);

    console.log({ aspectRatio, proportion });
    console.log({
      height: imageToUpload.asset.height,
      width: imageToUpload.asset.width,
    });
  }, []);

  const { uploadImage } = useCloudinaryImage();

  const utils = trpc.useContext();

  const onSuccessMutation = () => {
    utils.zones.invalidate();
  };

  const notification = useNotifications();

  const addCoverPhoto = trpc.zones.addCoverPhoto.useMutation({
    onSuccess: async () => {
      await utils.zones.invalidate();
      notification.notify("success", {
        params: {
          title: "Foto de portada agregada",
          description: "La foto de portada se agregó correctamente",
        },
      });
      navigation.goBack();
    },
  });
  const deleteCoverPhoto = trpc.zones.deleteCoverPhoto.useMutation({
    onSuccess: async () => {
      await utils.zones.invalidate();
      notification.notify("info", {
        params: {
          title: "Foto de portada eliminada",
          description: "La foto de portada se eliminó correctamente",
        },
      });
      navigation.goBack();
    },
  });

  const onSubmit = async () => {
    setLoadingUpload(true);
    try {
      if (!imageToDisplay) return;
      const image = await uploadImage(imageToDisplay.base64Img);
      await addCoverPhoto.mutateAsync({ zoneId, image });
      utils.zones.invalidate();
    } catch (e) {
      console.error(e);
    }
    setLoadingUpload(false);
  };

  if (coverPhoto.isLoading) return <LoadingScreen />;

  return (
    <Screen safeAreaDisabled padding="m" justifyContent="space-between">
      <LoadingModal
        text="Eliminando foto de portada"
        isLoading={deleteCoverPhoto.isLoading}
      />
      <Box>
        <SelectImage
          image={imageInServer?.url ?? imageToDisplay?.localUri}
          onPickImage={pickImageHandler}
        />
        {imageInServer && (
          <Button
            variant="errorSimplified"
            title="Eliminar foto"
            titleVariant="p2B"
            padding="s"
            onPress={() => {
              const imageId = coverPhoto.data?.id;
              if (!imageId) return;
              Alert.alert("¿Estás seguro?", "La foto se eliminará", [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Eliminar",
                  onPress: () => {
                    deleteCoverPhoto.mutate({
                      zoneId,
                      imageId,
                    });
                  },
                },
              ]);
            }}
          />
        )}
        <Box>
          <Text variant="h1">Consideraciones</Text>
          <Text variant="p2R">1. Elige una foto llamativa</Text>
          <Text variant="p2R">2. La foto debe ser de buena calidad</Text>
          <Text variant="p2R">
            3. La foto debe ser de <Text variant="p2B">paisaje</Text>
          </Text>
        </Box>
      </Box>
      <Button
        variant={imageToDisplay ? "infoSimplified" : "transparentSimplified"}
        title="Enviar"
        padding="m"
        marginBottom="l"
        marginTop="m"
        onPress={onSubmit}
        isLoading={loadingUpload}
      />
    </Screen>
  );
};

export default ManageZoneCoverPhotoScreen;
