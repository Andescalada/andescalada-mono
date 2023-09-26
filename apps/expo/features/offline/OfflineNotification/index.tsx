import { A, Box, Text } from "@andescalada/ui";
import useOfflineMode from "@hooks/useOfflineMode";
import { memo } from "react";
import { Alert, useWindowDimensions } from "react-native";
import { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OfflineNotification = () => {
  const insets = useSafeAreaInsets();
  const { isOfflineMode, setIsOfflineMode } = useOfflineMode();

  const { width: screenWidth } = useWindowDimensions();

  if (!isOfflineMode) return <Box key="OFFLINE_NOTIFICATION" />;
  return (
    <A.Pressable
      height={insets.bottom > 0 ? insets.bottom + 5 : 40}
      width={screenWidth}
      key="OFFLINE_NOTIFICATION"
      entering={SlideInDown.duration(500)}
      exiting={SlideOutDown.duration(1000)}
      bg="grayscale.900"
      alignItems="center"
      paddingTop="xs"
      onPress={() => {
        Alert.alert("Desactivar modo offline", "¿Estás seguro?", [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Desactivar",
            onPress: setIsOfflineMode,
          },
        ]);
      }}
    >
      <Text>Modo offline activado</Text>
    </A.Pressable>
  );
};

export default memo(OfflineNotification);
