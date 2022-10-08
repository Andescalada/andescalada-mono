import imageSchema from "@andescalada/api/schemas/image";
import user from "@andescalada/api/schemas/user";
import {
  Box,
  BoxWithKeyboard,
  Button,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import ProfileImagePicker from "@features/user/components/ProfileImagePicker/ProfileImagePicker";
import UsernameInput from "@features/user/components/UsernameInput/UsernameInput";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import useOwnInfo from "@hooks/useOwnInfo";
import usePickImage from "@hooks/usePickImage";
import useUploadImage from "@hooks/useUploadImage";
import useZodForm from "@hooks/useZodForm";
import { FC, useMemo, useState } from "react";
import { FormProvider, useController } from "react-hook-form";
import { z } from "zod";

type Props = UserNavigationScreenProps<UserNavigationRoutes.PersonalInfo>;

const PersonalInfoConfigScreen: FC<Props> = ({ navigation }) => {
  const { data } = useOwnInfo();
  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: true,
    quality: 0.5,
  });
  const { uploadImage } = useUploadImage();
  const form = useZodForm({
    schema: user.schema,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    control: form.control,
    name: "name",
    defaultValue: data?.name,
  });

  const utils = trpc.useContext();
  const {
    mutateAsync,
    isSuccess,
    reset: resetMutation,
  } = trpc.user.edit.useMutation({
    onSettled: (data) => {
      if (data) {
        const { name, username } = data;
        setTimeout(() => {
          form.reset({
            name,
            username,
          }),
            resetMutation();
          navigation.goBack();
        }, 1500);
        utils.user.ownInfo.invalidate();
      }
    },
  });

  const [loading, setLoading] = useState(false);
  const onSubmit = form.handleSubmit(async ({ name, username }) => {
    setLoading(true);
    let image: z.infer<typeof imageSchema.schema> | undefined;
    if (selectedImage) {
      image = await uploadImage(selectedImage.base64Img);
    }
    await mutateAsync({ name, image, username });
    await utils.user.ownInfo.invalidate();

    setLoading(false);
  });

  const saveButton = useMemo(() => {
    if (!form.formState.isDirty && !selectedImage) {
      return { variant: "transparent" as const, title: "Guardar" };
    }
    if (isSuccess) {
      return { variant: "success" as const, title: "Guardado" };
    }
    return { variant: "info" as const, title: "Guardar" };
  }, [form.formState.isDirty, isSuccess, selectedImage]);

  return (
    <Screen margin={{ mobile: "m", tablet: "xxl" }} safeAreaDisabled>
      <BoxWithKeyboard>
        <Box marginVertical={"ll"}>
          <Text variant="h3">Edita tu información personal</Text>
        </Box>

        <Box marginTop={{ mobile: "m", tablet: "xxl" }}>
          <Box justifyContent="center" alignItems="center">
            <ProfileImagePicker
              pickImage={pickImage}
              selectedImage={selectedImage}
              defaultValue={data?.profilePhoto?.publicId || undefined}
            />
          </Box>
          <FormProvider {...form}>
            <Box marginTop={"m"}>
              <Text variant="p1R" marginBottom="s">
                Nombre
              </Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                containerProps={{ height: 40, paddingLeft: "s" }}
              />
              <Text marginTop={"xs"} color="semantic.error">
                {error?.message}
              </Text>
            </Box>

            <Box>
              <Text variant="p1R" marginBottom="s">
                Usuario
              </Text>
              <UsernameInput defaultValue={data?.username} />
            </Box>
          </FormProvider>
        </Box>
        <Button
          title={saveButton.title}
          variant={saveButton.variant}
          alignSelf={"center"}
          marginTop="s"
          onPress={onSubmit}
          isLoading={loading}
          disabled={
            loading || (!form.formState.isDirty && !selectedImage) || isSuccess
          }
        />
      </BoxWithKeyboard>
    </Screen>
  );
};

export default PersonalInfoConfigScreen;
