import { A, Box, Text } from "@andescalada/ui";
import useOffline from "@features/offline/useOffline";
import { useAppTheme } from "@hooks/useAppTheme";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { mixColor } from "react-native-redash";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OfflineUpdateNotification = () => {
  const { isDownloading, progress } = useOffline();

  const { width: screenWidth } = useWindowDimensions();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isDownloading && progress > 0) {
      setShow(true);
    }
    if (!isDownloading) {
      setTimeout(() => setShow(false), 1000);
    }
  }, [isDownloading, progress]);

  const theme = useAppTheme();

  const p = useDerivedValue(() => withTiming(progress * 100), [progress]);

  const backgroundColor = useDerivedValue(() => {
    if (progress === 1)
      return withTiming(
        mixColor(
          progress,
          theme.colors["semantic.info"],
          theme.colors["semantic.success"],
        ),
        { duration: 500 },
      );
    return theme.colors["semantic.info"];
  }, [progress]);

  const style = useAnimatedStyle(() => {
    return {
      width: `${p.value}%`,
      height: 10,
      backgroundColor: backgroundColor.value,
    };
  });

  const { top } = useSafeAreaInsets();

  if (show)
    return (
      <A.Box
        position="absolute"
        height={50}
        width={screenWidth}
        backgroundColor="background"
        top={0}
        left={0}
        entering={FadeIn}
        exiting={FadeOut.delay(500)}
        zIndex={10000}
        style={{ marginTop: top ? top : 30 }}
      >
        <Box flex={1} justifyContent="center" paddingLeft="m">
          <Text variant="p3R">Actualizando zonas descargadas</Text>
        </Box>
        <Box flex={1} marginHorizontal="s">
          <A.Box
            style={style}
            backgroundColor={"semantic.success"}
            borderRadius={10}
          />
        </Box>
      </A.Box>
    );

  return null;
};

export default OfflineUpdateNotification;
