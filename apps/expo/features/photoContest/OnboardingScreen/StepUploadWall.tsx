import { Box, Image, Screen, Text } from "@andescalada/ui";
import { images } from "@assets/images";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { ComponentProps, FC } from "react";
import { useWindowDimensions } from "react-native";
interface Props {
  onNext: () => void;
  index: number;
}

const GrayText = (props: ComponentProps<typeof Text>) => (
  <Text color="grayscale.800" {...props} />
);

const StepUploadWall: FC<Props> = () => {
  const { width: screenWidth } = useWindowDimensions();
  const exampleImage = useCloudinaryUrl("optimizedImage", {
    publicId: "andescalada-app-dev/heokmbaf6cd7txkybhlp",
    quality: 50,
  });
  return (
    <Screen
      width={screenWidth}
      bg="brand.secondaryA"
      padding="m"
      alignItems="center"
    >
      <Box borderRadius={8} overflow="hidden">
        <Image
          source={exampleImage?.url}
          width={screenWidth * 0.9}
          placeholder={images.placeholder}
          placeholderContentFit="cover"
          height={250}
          contentFit="cover"
        />
      </Box>
      <Box gap="m" alignItems="flex-start" padding="l">
        <GrayText variant="p1R" numberOfLines={3}>
          2º Paso: Sube una foto de la pared considerando los siguientes
          criterios:
        </GrayText>
        <GrayText variant="p2R" numberOfLines={3}>
          - <GrayText variant="p2B"> Calidad de la foto</GrayText>, mientras más
          pixeles mejor.
        </GrayText>
        <GrayText variant="p2R" numberOfLines={3}>
          - <GrayText variant="p2B">Alcance</GrayText>, revisa la lista de rutas
          que deberían aparecer en la foto,
        </GrayText>
        <GrayText variant="p2R" numberOfLines={3}>
          - <GrayText variant="p2B">Visibilidad</GrayText>, intenta evitar
          obstáculos como árboles que tapen la pared.
        </GrayText>
        <GrayText variant="p2R" numberOfLines={3}>
          - <GrayText variant="p2B">Rareza</GrayText>, intenta subir fotos de
          paredes donde nadie ha concursado.
        </GrayText>
      </Box>
    </Screen>
  );
};

export default StepUploadWall;
