import { A, Box, Text } from "@andescalada/ui";
import useOfflineMode from "@hooks/useOfflineMode";
import { memo } from "react";
import { useWindowDimensions } from "react-native/types";
import { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OfflineNotification = () => {
  const insets = useSafeAreaInsets();
  const { isOfflineMode } = useOfflineMode();

  const { width: screenWidth } = useWindowDimensions();

  if (!isOfflineMode) return <Box key="OFFLINE_NOTIFICATION" />;
  return (
    <A.Pressable
      height={5 + insets.bottom}
      width={screenWidth}
      key="OFFLINE_NOTIFICATION"
      entering={SlideInDown.duration(500)}
      exiting={SlideOutDown.duration(1000)}
      bg="grayscale.900"
      alignItems="center"
      paddingTop="xs"
    >
      <Text>Modo offline activado</Text>
    </A.Pressable>
  );
};

export default memo(OfflineNotification);
