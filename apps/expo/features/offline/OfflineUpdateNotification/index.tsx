import { A, Box, Text } from "@andescalada/ui";
import { useAppTheme } from "@hooks/useAppTheme";
import { isDownloadingAtom, progressAtom } from "hooks/useSetAssetsToDb";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { mixColor } from "react-native-redash";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OfflineUpdateNotification = () => {
  const [progress] = useAtom(progressAtom);
  const [isDownloading] = useAtom(isDownloadingAtom);

  const { width: screenWidth } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isDownloading) setVisible(true);
  }, [isDownloading]);

  const theme = useAppTheme();

  const hide = useCallback(() => {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, []);

  const p = useDerivedValue(
    () =>
      withTiming(progress * 100, undefined, (hasFinished) => {
        if (hasFinished) {
          runOnJS(hide)();
        }
      }),
    [progress],
  );

  const backgroundColor = useDerivedValue(() => {
    if (progress === 1)
      return withTiming(
        mixColor(
          progress,
          theme.colors["semantic.info"],
          theme.colors["semantic.success"],
        ),
      );
    return theme.colors["semantic.info"];
  }, [progress]);

  const style = useAnimatedStyle(() => {
    return {
      width: `${p.value}%`,
      height: 10,
      backgroundColor: backgroundColor.value,
    };
  }, [p, backgroundColor]);

  const { top } = useSafeAreaInsets();

  if (visible)
    return (
      <A.Box
        position="absolute"
        height={50}
        width={screenWidth}
        backgroundColor="background"
        top={0}
        left={0}
        entering={FadeIn}
        exiting={FadeOut}
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

  return <Box />;
};

export default OfflineUpdateNotification;
