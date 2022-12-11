import { A, Box, Pressable } from "@andescalada/ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@hooks/useAppTheme";
import { Dispatch, SetStateAction } from "react";
import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

interface ToolBarProps {
  isDownloaded: boolean;
  isFavorite: boolean;
  onDownloadPress: () => void;
  onFavoritePress: () => void;
  openAll: boolean;
  setOpenAll: Dispatch<SetStateAction<boolean>>;
}

const ToolBar = ({
  isDownloaded,
  isFavorite,
  onDownloadPress,
  onFavoritePress,
  openAll,
  setOpenAll,
}: ToolBarProps) => {
  const theme = useAppTheme();

  const open = useDerivedValue(() => (openAll ? 0 : -180));
  const degrees = useDerivedValue(() => withTiming(open.value));

  const toggleButtonStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${degrees.value}deg` }],
  }));
  return (
    <Box flexDirection="row" justifyContent="flex-end">
      <Pressable onPress={onDownloadPress}>
        <Ionicons
          name={
            isDownloaded ? "arrow-down-circle" : "arrow-down-circle-outline"
          }
          size={30}
          color={theme.colors["zoneOptionsIcons"]}
        />
      </Pressable>
      <Pressable marginHorizontal="s" onPress={onFavoritePress}>
        <Ionicons
          name={isFavorite ? "heart-circle" : "heart-circle-outline"}
          size={30}
          color={theme.colors["zoneOptionsIcons"]}
        />
      </Pressable>
      <A.Pressable
        onPress={() => {
          setOpenAll((prev) => !prev);
        }}
        style={toggleButtonStyle}
      >
        <Ionicons
          name={openAll ? "caret-down-circle" : "caret-down-circle-outline"}
          size={30}
          color={theme.colors["zoneOptionsIcons"]}
        />
      </A.Pressable>
    </Box>
  );
};

export default ToolBar;
