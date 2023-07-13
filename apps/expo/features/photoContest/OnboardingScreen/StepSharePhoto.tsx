import { Box, Button, Image, Screen, Text } from "@andescalada/ui";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  index: number;
}

const StepSharePhoto: FC<Props> = (props) => {
  const { width: screenWidth } = useWindowDimensions();
  const shareExample = useCloudinaryUrl("optimizedImage", {
    publicId: "andescalada.org/Bohemia_Principal_herfhg",
    quality: 50,
  });
  return (
    <Screen width={screenWidth} bg="brand.primaryA" padding="m">
      <Box justifyContent="center" alignItems="center">
        <Box style={{ transform: [{ rotateZ: "5deg" }] }} marginVertical="m">
          <Image
            source={shareExample?.url}
            contentFit="contain"
            width={screenWidth * 0.9}
            height={400}
          />
        </Box>
        <Button
          variant="transparentSimplified"
          title="Compartir"
          icon="ios-logo-instagram"
          iconProps={{ size: 25 }}
          gap="s"
          marginHorizontal="l"
          height={50}
          width={screenWidth * 0.9}
          marginBottom="l"
        />
        <Text variant="p1R" numberOfLines={3}>
          3º Paso: Comparte la foto en una historia de Instagram y etiqueta a
          @andescalada
        </Text>
      </Box>
    </Screen>
  );
};

export default StepSharePhoto;
