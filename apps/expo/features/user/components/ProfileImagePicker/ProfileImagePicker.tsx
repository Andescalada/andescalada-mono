import { Image, Pressable, Text } from "@andescalada/ui";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { PickImage, SelectedImage } from "@hooks/usePickImage";
import { useResponsiveProp } from "@shopify/restyle";
import { FC } from "react";

interface Props {
  selectedImage: SelectedImage | undefined;
  pickImage: PickImage;
  defaultValue?: string;
}

const responsiveImageSize = { mobile: 200, tablet: 400 };

const ProfileImagePicker: FC<Props> = ({
  pickImage,
  selectedImage,
  defaultValue,
}) => {
  const isTablet = useResponsiveProp({ mobile: 0, table: 1 });

  const defaultImage = useCloudinaryUrl("getProfileImage", {
    publicId: defaultValue,
    size: isTablet ? responsiveImageSize.tablet : responsiveImageSize.mobile,
  });

  return (
    <Pressable
      borderColor="semantic.info"
      borderWidth={5}
      borderRadius={responsiveImageSize}
      borderStyle={"dashed"}
      justifyContent="center"
      alignItems={"center"}
      overflow="hidden"
      height={responsiveImageSize}
      width={responsiveImageSize}
      onPress={() => pickImage(selectedImage)}
    >
      <Text variant={{ mobile: "p2R", tablet: "p1R" }}>
        Agregar foto de perfil
      </Text>
      {(selectedImage?.localUri || defaultImage?.url) && (
        <Image
          position={"absolute"}
          height={responsiveImageSize}
          width={responsiveImageSize}
          transition={500}
          source={{
            uri: selectedImage?.localUri
              ? selectedImage?.localUri
              : defaultImage?.url || "",
          }}
        />
      )}
    </Pressable>
  );
};

export default ProfileImagePicker;
