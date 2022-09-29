import imageSchema from "@andescalada/api/schemas/image";
import user from "@andescalada/api/schemas/user";
import {
  Box,
  BoxWithKeyboard,
  Button,
  Pressable,
  Screen,
  Text,
  TextInput,
  Theme,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import {
  UserNavigationRoutes,
  UserScreenProps,
} from "@features/user/Navigation/types";
import { zodResolver } from "@hookform/resolvers/zod";
import usePickImage from "@hooks/usePickImage";
import useRootNavigation from "@hooks/useRootNavigation";
import useUploadImage from "@hooks/useUploadImage";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { createBox } from "@shopify/restyle";
import { ComponentProps, FC, useState } from "react";
import { useController, useForm } from "react-hook-form";
import Animated, { FadeIn } from "react-native-reanimated";
import { z } from "zod";

type Props = UserScreenProps<UserNavigationRoutes.FirstTimeLogin>;

const Image = createBox<Theme, ComponentProps<typeof Animated.Image>>(
  Animated.Image,
);

const responsiveImageSize = { mobile: 200, tablet: 400 };

const FirstTimeLoginScreen: FC<Props> = () => {
  const [namePosition, setNamePosition] = useState(0);
  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: true,
    quality: 0.5,
  });
  const { uploadImage } = useUploadImage();
  const form = useForm<z.infer<typeof user.schema>>({
    resolver: zodResolver(user.schema),
  });
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ control: form.control, name: "name" });

  const utils = trpc.useContext();
  const { mutateAsync } = trpc.user.edit.useMutation();

  const rootNavigation = useRootNavigation();

  const [loading, setLoading] = useState(false);
  const onSubmit = form.handleSubmit(async ({ name }) => {
    setLoading(true);
    let image: z.infer<typeof imageSchema.schema> | undefined;
    if (selectedImage) {
      image = await uploadImage(selectedImage.base64Img);
    }
    await mutateAsync({ name, image });
    await utils.user.ownInfo.invalidate();
    setLoading(false);
    // rootNavigation.navigate(RootNavigationRoutes.Climbs, {
    //   screen: ClimbsNavigationRoutes.ZonesList,
    // });
  });

  return (
    <Screen margin={{ mobile: "m", tablet: "xxl" }}>
      <BoxWithKeyboard keyboardOffset={-namePosition + 20}>
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

          <Box
            marginTop={"m"}
            onLayout={(e) => {
              setNamePosition(e.nativeEvent.layout.y);
            }}
          >
            <Text variant="p1B" marginBottom="s">
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
