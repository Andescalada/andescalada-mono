import { Box, Icon, Screen, Text } from "@andescalada/ui";

const FallbackErrorScreen = () => {
  return (
    <Screen padding="m" backgroundColor="brand.primaryA">
      <Text variant="h1" color="brand.secondaryA">
        ¡Tuvimos un error!
      </Text>
      <Box flex={1} marginTop="xl">
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
    </Screen>
  );
};

export default FallbackErrorScreen;
