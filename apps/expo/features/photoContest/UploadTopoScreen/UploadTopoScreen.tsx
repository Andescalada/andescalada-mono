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
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import usePickImage from "@hooks/usePickImage";
import { FC } from "react";

type Props = PhotoContestScreenProps<PhotoContestRoutes.UploadTopo>;

const UploadTopoScreen: FC<Props> = ({
  route: {
    params: { wallName },
  },
  navigation,
}) => {
  const { pickImage, selectedImage } = usePickImage({ allowsEditing: false });

  return (
    <Screen padding="m">
      <Header
        title={wallName}
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <Box flex={1} marginTop="m">
        <Pressable
          height={250}
          borderColor={selectedImage ? "transparent" : "semantic.info"}
          borderWidth={2}
          borderRadius={10}
          borderStyle={"dashed"}
          justifyContent="center"
          alignItems={"center"}
          overflow="hidden"
          onPress={() => pickImage(selectedImage)}
        >
          {!selectedImage ? (
            <Box justifyContent="center" alignItems={"center"}>
              <Ionicons name="camera-outline" size={30} />
              <Text marginTop="xs">Subir foto de esta pared</Text>
            </Box>
          ) : (
            <Image
              source={{ uri: selectedImage.localUri }}
              height={250}
              width="100%"
            />
          )}
        </Pressable>
      </Box>
      <Button variant="info" title="Enviar" marginBottom="l" />
    </Screen>
  );
};

export default UploadTopoScreen;
