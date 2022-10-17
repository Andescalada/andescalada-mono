import { A, Box, Text } from "@andescalada/ui";
import useOfflineMode from "@hooks/useOfflineMode";
import { SCREEN_WIDTH } from "@utils/Dimensions";
import { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OfflineNotification = () => {
  const insets = useSafeAreaInsets();
  const { isOfflineMode } = useOfflineMode();
  console.log({ isOfflineMode });
  if (!isOfflineMode) return <Box />;
  return (
    <A.Pressable
      height={5 + insets.bottom}
      width={SCREEN_WIDTH}
      key="hola"
      entering={SlideInDown.duration(500)}
      exiting={SlideOutDown.restDisplacementThreshold(5).duration(1000)}
      bg="grayscale.900"
      alignItems="center"
      paddingTop="xs"
    >
      <Text>Modo offline activado</Text>
    </A.Pressable>
  );
};

export default OfflineNotification;
