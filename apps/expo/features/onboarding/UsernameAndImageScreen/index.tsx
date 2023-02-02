import imageSchema from "@andescalada/api/schemas/image";
import user from "@andescalada/api/schemas/user";
import {
  Box,
  Button,
  KeyboardAvoidingBox,
  KeyboardDismiss,
  ScrollView,
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
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import useOwnInfo from "@hooks/useOwnInfo";
import usePickImage from "@hooks/usePickImage";
import useRefresh from "@hooks/useRefresh";
import { validUsername } from "@hooks/useUsernameValidation";
import useZodForm from "@andescalada/hooks/useZodForm";
import { useAtom } from "jotai";
import { FC, useState } from "react";
import { FormProvider, useController } from "react-hook-form";
import { z } from "zod";

type Props = OnboardingScreenProps<OnboardingRoutes.UsernameAndImage>;

const UsernameAndImageScreen: FC<Props> = ({ navigation }) => {
  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: true,
    quality: 0.5,
  });
  const { uploadImage, destroyImage } = useCloudinaryImage();
  const form = useZodForm({
    schema: user.schema,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ control: form.control, name: "name" });

  const [isValidUsername] = useAtom(validUsername);

  const utils = trpc.useContext();
  const { mutateAsync } = trpc.user.edit.useMutation();

  const [loading, setLoading] = useState(false);
  const onSubmit = form.handleSubmit(async ({ name, username }) => {
    setLoading(true);

    let image: z.infer<typeof imageSchema.schema> | undefined;

    if (selectedImage) {
      image = await uploadImage(selectedImage.base64Img);
    }

    try {
      await mutateAsync({ name, image, username });
      utils.user.ownInfo.invalidate();
      navigation.navigate(OnboardingRoutes.FirstTimeGradingSystem);
    } catch (err) {
      if (image) {
        destroyImage(image.publicId);
      }
    }
    setLoading(false);
  });

  const { refetch, isRefetching } = useOwnInfo();

  const refresh = useRefresh(refetch, isRefetching);

  const submitButtonVariant =
    !form.formState.isValid || !isValidUsername ? "transparent" : "info";

  return (
    <KeyboardAvoidingBox>
      <ScrollView
        margin={{ mobile: "m", tablet: "xxl" }}
        refreshControl={refresh}
      >
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
            variant={submitButtonVariant}
            title="Continuar"
            alignSelf={"center"}
            marginTop="xxl"
            onPress={onSubmit}
            isLoading={loading}
            disabled={
              loading ||
              !form.formState.isDirty ||
              !form.formState.isValid ||
              !isValidUsername
            }
          />
        </KeyboardDismiss>
      </ScrollView>
    </KeyboardAvoidingBox>
  );
};

export default UsernameAndImageScreen;
