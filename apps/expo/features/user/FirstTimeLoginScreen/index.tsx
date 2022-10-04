import imageSchema from "@andescalada/api/schemas/image";
import user from "@andescalada/api/schemas/user";
import {
  Box,
  BoxWithKeyboard,
  Button,
  Image,
  Pressable,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import usePickImage from "@hooks/usePickImage";
import useUploadImage from "@hooks/useUploadImage";
import useZodForm from "@hooks/useZodForm";
import {
  RootNavigationRoutes,
  RootNavigationScreenProps,
} from "@navigation/AppNavigation/RootNavigation/types";
import { FC, useState } from "react";
import { useController } from "react-hook-form";
import { FadeIn } from "react-native-reanimated";
import { z } from "zod";

type Props = RootNavigationScreenProps<RootNavigationRoutes.FirstTimeLogin>;

const responsiveImageSize = { mobile: 200, tablet: 400 };

const FirstTimeLoginScreen: FC<Props> = () => {
  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: true,
    quality: 0.5,
  });
  const { uploadImage } = useUploadImage();
  const form = useZodForm({
    schema: user.schema,
  });
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ control: form.control, name: "name" });
  const {
    field: {
      onChange: onChangeUsername,
      onBlur: onBlurUsername,
      value: valueUsername,
    },
    fieldState: { error: errorUsername },
  } = useController({ control: form.control, name: "username" });

  const utils = trpc.useContext();
  const { mutateAsync } = trpc.user.edit.useMutation();

  const [loading, setLoading] = useState(false);
  const onSubmit = form.handleSubmit(async ({ name, username }) => {
    try {
      setLoading(true);
      let image: z.infer<typeof imageSchema.schema> | undefined;
      if (selectedImage) {
        image = await uploadImage(selectedImage.base64Img);
      }
      await mutateAsync({ name, image, username });
      await utils.user.ownInfo.invalidate();
    } catch (err) {}
    setLoading(false);
  });

  return (
    <Screen margin={{ mobile: "m", tablet: "xxl" }}>
      <BoxWithKeyboard>
        <Box marginVertical={"ll"}>
          <Text variant={"h1"}>Comencemos</Text>
          <Text>
            Para comenzar ingresa tu nombre y elige una foto de perfil
          </Text>
        </Box>

        <Box marginTop={{ mobile: "m", tablet: "xxl" }}>
          <Box justifyContent="center" alignItems="center">
            <Pressable
              borderColor="info"
              borderWidth={5}
              borderRadius={responsiveImageSize}
              borderStyle={"dashed"}
              justifyContent="center"
              alignItems={"center"}
              overflow="hidden"
              height={responsiveImageSize}
              width={responsiveImageSize}
              onPress={pickImage}
            >
              <Text variant={{ mobile: "p2R", tablet: "p1R" }}>
                Agregar foto de perfil
              </Text>
              {selectedImage?.localUri && (
                <Image
                  position={"absolute"}
                  height={responsiveImageSize}
                  width={responsiveImageSize}
                  entering={FadeIn}
                  source={{ uri: selectedImage?.localUri }}
                />
              )}
            </Pressable>
          </Box>

          <Box marginTop={"m"}>
            <Text variant="p1R" marginBottom="s">
              Nombre
            </Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              containerProps={{ height: 40 }}
            />
            <Text marginTop={"xs"} color="error">
              {error?.message}
            </Text>
          </Box>
        </Box>
        <Box>
          <Text variant="p1R" marginBottom="s">
            Usuario
          </Text>
          <TextInput
            value={valueUsername}
            onChangeText={onChangeUsername}
            onBlur={onBlurUsername}
            autoCapitalize="none"
            autoCorrect={false}
            containerProps={{ height: 40 }}
          />
          <Text marginTop={"xs"} color="error">
            {errorUsername?.message}
          </Text>
        </Box>
        <Button
          variant={"info"}
          title="Continuar"
          alignSelf={"center"}
          marginTop="xxl"
          onPress={onSubmit}
          isLoading={loading}
        />
      </BoxWithKeyboard>
    </Screen>
  );
};

export default FirstTimeLoginScreen;
