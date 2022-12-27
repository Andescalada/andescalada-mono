import { A, Box, Ionicons, Pressable } from "@andescalada/ui";
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
          color={"zoneOptionsIcons"}
        />
      </Pressable>
      <Pressable marginHorizontal="s" onPress={onFavoritePress}>
        <Ionicons
          name={isFavorite ? "heart-circle" : "heart-circle-outline"}
          size={30}
          color={"zoneOptionsIcons"}
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
          color={"zoneOptionsIcons"}
        />
      </A.Pressable>
    </Box>
  );
};

export default ToolBar;
