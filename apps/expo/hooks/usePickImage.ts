import * as ImagePicker from "expo-image-picker";
import { UIImagePickerPresentationStyle } from "expo-image-picker";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export interface SelectedImage {
  localUri: string;
  base64Img: string;
}

const usePickImage = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage>();
  const pickFromLibrary = useCallback(async () => {
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
    });
    if (result.cancelled === true) {
      return;
    }

    const base64Img = `data:image/jpg;base64,${result.base64}`;

    setSelectedImage({ localUri: result.uri, base64Img });
  }, []);
  const pickFromCamera = useCallback(async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        presentationStyle: UIImagePickerPresentationStyle.FULL_SCREEN,
        base64: true,
      });
      if (result.cancelled === true) {
        return;
      }

      const base64Img = `data:image/jpg;base64,${result.base64}`;

      setSelectedImage({ localUri: result.uri, base64Img });
    }
  }, []);
  const pickImage = useCallback(() => {
    Alert.alert("Seleccionar imagen", "", [
      { text: "Tomar una foto", onPress: pickFromCamera },
      { text: "Seleccionar una foto", onPress: pickFromLibrary },
      {
        text: "Cancelar",
        onPress: () => setSelectedImage(undefined),
        style: "cancel",
      },
    ]);
  }, [pickFromCamera, pickFromLibrary]);
  return { pickImage, selectedImage };
};

export default usePickImage;
