import {
  A,
  Box,
  Button,
  Header,
  Image,
  Ionicons,
  Pressable,
  Screen,
  ScrollView,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  RoutesManagerNavigationRoutes,
  RoutesManagerScreenProps,
} from "@features/routesManager/Navigation/types";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import usePickImage from "@hooks/usePickImage";
import useViewImage from "@hooks/useViewImage";
import { FC, useState } from "react";
import { Alert } from "react-native";
import { StretchInY } from "react-native-reanimated";

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

  const [topoId, setTopoId] = useState<string | null>(null);

  const utils = trpc.useContext();

  const createTopo = trpc.topos.create.useMutation({
    onSuccess: (data) => {
      setTopoId(data.id);
    },
  });

  const { uploadImage } = useCloudinaryImage();

  const viewImage = useViewImage();

  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: false,
    onSuccess: async (imageToUpload) => {
      setImageToDisplay(imageToUpload.localUri);
      setLoadingUpload(true);
      try {
        const image = await uploadImage(imageToUpload.base64Img);
        await createTopo.mutateAsync({
          image,
          wallId,
          name: wallName,
          zoneId,
        });
        await utils.photoContest.invalidate();
        utils.topos.invalidate();
      } catch (error) {
        Alert.alert("No pudimos subir la foto", "Inténtalo de nuevo");
      }
      setLoadingUpload(false);
    },
  });

  return (
    <Screen padding="m">
      <Header
        title="Subir imagen"
        onGoBack={navigation.goBack}
        showOptions={false}
      />
      <ScrollView>
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
                <Text marginTop="xs">Seleccionar</Text>
              </Box>
            ) : (
              <Image
                source={{ uri: imageToDisplay }}
                height={250}
                width="100%"
              />
            )}
          </Pressable>
          {selectedImage && (
            <A.Box entering={StretchInY}>
              <Button
                title="Ver"
                variant="infoSimplified"
                titleVariant="p2R"
                marginTop="s"
                padding="s"
                onPress={() =>
                  viewImage({
                    source: {
                      uri: selectedImage.localUri,
                      height: selectedImage.asset.height,
                      width: selectedImage.asset.width,
                    },
                  })
                }
              />
            </A.Box>
          )}
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
        disabled={loadingUpload || !topoId}
        isLoading={loadingUpload}
        title="Continuar"
        variant={topoId ? "info" : "transparent"}
        padding="m"
        marginBottom="l"
        onPress={() => {
          if (!topoId) return;
          navigation.navigate(RoutesManagerNavigationRoutes.TopoManager, {
            topoId,
            wallId,
            zoneId,
          });
        }}
      />
    </Screen>
  );
};

export default AddTopoScreen;
