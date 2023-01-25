import imageSchema from "@andescalada/api/schemas/image";
import user from "@andescalada/api/schemas/user";
import {
  Box,
  Button,
  KeyboardAvoidingBox,
  KeyboardDismiss,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  OnboardingRoutes,
  OnboardingScreenProps,
} from "@features/onboarding/Navigation/types";
import ProfileImagePicker from "@features/user/components/ProfileImagePicker/ProfileImagePicker";
import UsernameInput from "@features/user/components/UsernameInput/UsernameInput";
import usePickImage from "@hooks/usePickImage";
import useUploadImage from "@hooks/useUploadImage";
import useZodForm from "@hooks/useZodForm";
import { FC, useState } from "react";
import { FormProvider, useController } from "react-hook-form";
import { z } from "zod";

type Props = OnboardingScreenProps<OnboardingRoutes.UsernameAndImage>;

const UsernameAndImageScreen: FC<Props> = ({ navigation }) => {
  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: true,
    quality: 0.5,
  });
  const { uploadImage } = useUploadImage();
  const form = useZodForm({
    schema: user.schema,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ control: form.control, name: "name" });

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
      utils.user.ownInfo.invalidate();
      navigation.navigate(OnboardingRoutes.FirstTimeGradingSystem);
    } catch (err) {}
    setLoading(false);
  });

  return (
    <KeyboardAvoidingBox>
      <Screen margin={{ mobile: "m", tablet: "xxl" }}>
        <KeyboardDismiss>
          <Box marginVertical={"ll"}>
            <Text variant={"h1"}>Comencemos</Text>
            <Text>
              Para comenzar ingresa tu nombre y elige una foto de perfil
            </Text>
          </Box>

          <Box marginTop={{ mobile: "m", tablet: "xxl" }}>
            <Box justifyContent="center" alignItems="center">
              <ProfileImagePicker
                pickImage={pickImage}
                selectedImage={selectedImage}
              />
            </Box>
            <FormProvider {...form}>
              <Text variant="p1R" marginBottom="s">
                Nombre
              </Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                containerProps={{ height: 40 }}
              />
              <Text marginTop={"xs"} color="semantic.error">
                {error?.message}
              </Text>

              <Text variant="p1R" marginBottom="s">
                Usuario
              </Text>
              <UsernameInput />
            </FormProvider>
          </Box>
          <Button
            variant={"info"}
            title="Continuar"
            alignSelf={"center"}
            marginTop="xxl"
            onPress={onSubmit}
            isLoading={loading}
            disabled={
              loading || !form.formState.isDirty || !form.formState.isValid
            }
          />
        </KeyboardDismiss>
      </Screen>
    </KeyboardAvoidingBox>
  );
};

export default UsernameAndImageScreen;
