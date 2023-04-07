import { Box, Icon, Ionicons, Pressable, Screen, Text } from "@andescalada/ui";
import { FC, useState } from "react";
interface Props {
  error?: Error;
  resetError?: () => void;
}

const FallbackErrorScreen = ({ error }: Props) => {
  const [moreInfo, setMoreInfo] = useState(false);
  return (
    <Screen padding="m" backgroundColor="brand.primaryA">
      <Text variant="h1" color="brand.secondaryA">
        ¡Tuvimos un error!
      </Text>
      <Box marginVertical="xl">
        <Text variant="h4" marginTop="m" color="grayscale.white">
          Se nos cayó el ATC en la mitad de un multi-largo.
        </Text>
        <Box marginVertical="m" alignSelf="center">
          <Icon name="climber-rappeling" size={100} />
        </Box>
        <Text variant="p1R" marginTop="m" color="grayscale.white">
          Reinicia la app, si el error persiste bórrala y vuelve a descargarla.
        </Text>
      </Box>
      <Pressable
        backgroundColor="semantic.info"
        borderRadius={16}
        padding="m"
        onPress={() => setMoreInfo((prev) => !prev)}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>Más información</Text>
          <Ionicons name="information-circle-sharp" size={20} />
        </Box>
        {moreInfo && (
          <Box>
            <Text variant="p2R" color="grayscale.white">
              {JSON.stringify(error)}
            </Text>
          </Box>
        )}
      </Pressable>
    </Screen>
  );
};

export default FallbackErrorScreen;
