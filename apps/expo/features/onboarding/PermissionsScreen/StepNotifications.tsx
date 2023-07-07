import { Box, Icon, Screen, Text } from "@andescalada/ui";
import NextButton from "@features/components/NextButton";
import * as Notifications from "expo-notifications";
import { FC } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
}

const StepNotifications: FC<Props> = ({ onNext }) => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen
      flex={1}
      backgroundColor="brand.primaryB"
      width={screenWidth}
      padding="m"
      alignItems="stretch"
      justifyContent="space-between"
    >
      <Box flex={1} alignItems="center" justifyContent="center" gap="l">
        <Box
          borderColor="grayscale.600"
          backgroundColor="grayscale.white"
          borderWidth={2}
          borderStyle="dashed"
          width={150}
          height={150}
          borderRadius={75}
          alignItems="center"
          justifyContent="center"
          padding="m"
        >
          <Icon name="message-color" size={80} />
        </Box>
        <Text variant="h1">Notificaciones</Text>
        <Text variant="p1R" textAlign="center">
          Recibe notificaciones cuando te inviten o acepten en una zona
        </Text>
        <Text variant="p3R" textAlign="center" padding="m">
          Respetamos mucho tu calma, solo serán notificaciones relevantes.
        </Text>
      </Box>

      <NextButton
        onPress={async () => {
          await Notifications.getPermissionsAsync();
          onNext();
        }}
        alignSelf="center"
      />
    </Screen>
  );
};

export default StepNotifications;
