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
import {
  UserNavigationRoutes,
  UserScreenProps,
} from "@features/user/Navigation/types";
import usePickImage from "@hooks/usePickImage";
import { createBox } from "@shopify/restyle";
import { ComponentProps, FC, useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";

type Props = UserScreenProps<UserNavigationRoutes.FirstTimeLogin>;

const Image = createBox<Theme, ComponentProps<typeof Animated.Image>>(
  Animated.Image,
);

const responsiveImageSize = { mobile: 200, tablet: 400 };

const FirstTimeLoginScreen: FC<Props> = () => {
  const [namePosition, setNamePosition] = useState(0);
  const { pickImage, selectedImage } = usePickImage({
    allowsEditing: true,
    quality: 0.7,
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
            <TextInput containerProps={{ height: 40 }} />
          </Box>
        </Box>
        <Button
          variant={"info"}
          title="Continuar"
          alignSelf={"center"}
          marginTop="xxl"
        />
      </BoxWithKeyboard>
    </Screen>
  );
};

export default FirstTimeLoginScreen;
