import * as ImagePicker from "expo-image-picker";
import { UIImagePickerPresentationStyle } from "expo-image-picker";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export interface SelectedImage {
  localUri: string;
  base64Img: string;
  asset: ImagePicker.ImagePickerAsset;
}

type Args = ImagePicker.ImagePickerOptions & {
  onDelete?: () => void;
  onSuccess?: (selectedImage: {
    localUri: string;
    base64Img: string;
    asset: ImagePicker.ImagePickerAsset;
  }) => void;
};

export type PickImage = ReturnType<typeof usePickImage>["pickImage"];

const usePickImage = (args?: Args) => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage>();
  const pickFromLibrary = useCallback(
    async (prevImage?: SelectedImage) => {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert("Se require acceso a la librería de fotos");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        presentationStyle: UIImagePickerPresentationStyle.FULL_SCREEN,
        base64: true,
        ...args,
      });
      if (result.canceled === true) {
        setSelectedImage(prevImage);
        return;
      }

      const base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;

      if (args?.onSuccess)
        args.onSuccess({
          localUri: result.assets[0].uri,
          base64Img,
          asset: result.assets[0],
        });

      setSelectedImage({
        localUri: result.assets[0].uri,
        base64Img,
        asset: result.assets[0],
      });
    },
    [args],
  );
  const pickFromCamera = useCallback(
    async (prevImage?: SelectedImage) => {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted) {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          presentationStyle: UIImagePickerPresentationStyle.FULL_SCREEN,
          base64: true,
          ...args,
        });
        if (result.canceled === true) {
          setSelectedImage(prevImage);
          return;
        }

        const base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;

        if (result.assets) {
          if (args?.onSuccess)
            args.onSuccess({
              localUri: result.assets[0].uri,
              base64Img,
              asset: result.assets[0],
            });

          setSelectedImage({
            localUri: result.assets[0]?.uri,
            base64Img,
            asset: result.assets[0],
          });
        }
      }
    },
    [args],
  );
  const pickImage = useCallback(
    (prevImage?: SelectedImage) => {
      const options = [
        { text: "Tomar una foto", onPress: () => pickFromCamera(prevImage) },
        {
          text: "Seleccionar una foto",
          onPress: () => pickFromLibrary(prevImage),
        },
        {
          text: "Borrar",
          onPress: () => {
            if (args?.onDelete) args.onDelete();
            setSelectedImage(undefined);
          },
        },
        {
          text: "Cancelar",
          onPress: () => setSelectedImage(prevImage),
          style: "cancel" as const,
        },
      ];

      if (!prevImage) {
        options.splice(2, 1);
      }

      Alert.alert("Seleccionar imagen", "", options);
    },
    [pickFromCamera, pickFromLibrary, args],
  );
  return { pickImage, selectedImage };
};

export default usePickImage;
