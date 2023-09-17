import {
  A,
  ActivityIndicator,
  Box,
  Button,
  Image,
  Ionicons,
  Pressable,
  Text,
} from "@andescalada/ui";
import usePickImage, { onSuccessPick } from "@hooks/usePickImage";
import useViewImage from "@hooks/useViewImage";
import { FC } from "react";
import { FadeIn, FadeOut, StretchInY } from "react-native-reanimated";

interface Props {
  onPickImage?: onSuccessPick;
  onDeletePickedImage?: () => void;
  isLoading?: boolean;
  image?: string | null;
  selectText?: string;
}

const SelectImage: FC<Props> = ({
  image,
  onPickImage,
  isLoading,
  onDeletePickedImage,
  selectText = "Seleccionar",
}) => {
  const viewImage = useViewImage();
  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: false,
    onSuccess: onPickImage,
    onDelete: onDeletePickedImage,
  });
  return (
    <Box marginVertical="m">
      <Pressable
        height={250}
        borderColor={image ? "transparent" : "semantic.info"}
        borderWidth={2}
        borderRadius={10}
        borderStyle="dashed"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        onPress={() => pickImage(selectedImage)}
      >
        {isLoading && (
          <A.Box
            entering={FadeIn}
            exiting={FadeOut}
            position="absolute"
            top={0}
            zIndex={100}
            left={0}
            right={0}
            bottom={0}
            borderRadius={10}
            justifyContent="center"
            alignItems="center"
            bg="grayscale.transparent.50.300"
          >
            <ActivityIndicator size="large" color="grayscale.white" />
          </A.Box>
        )}
        {!image ? (
          <Box justifyContent="center" alignItems={"center"}>
            <Ionicons name="camera-outline" size={30} />
            <Text marginTop="xs" textAlign="center">
              {selectText}
            </Text>
          </Box>
        ) : (
          <Image source={{ uri: image }} height={250} width="100%" />
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
  );
};

export default SelectImage;
