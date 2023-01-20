import { A, Box, Ionicons, Pressable } from "@andescalada/ui";
import { atom, useAtom } from "jotai";
import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

export const toggleWalls = atom(false);

interface ToolBarProps {
  isDownloaded: boolean;
  isFavorite: boolean;
  onDownloadPress: () => void;
  onFavoritePress: () => void;
}

const ToolBar = ({
  isDownloaded,
  isFavorite,
  onDownloadPress,
  onFavoritePress,
}: ToolBarProps) => {
  const [openAll, setOpenAll] = useAtom(toggleWalls);
  const open = useDerivedValue(() => (openAll ? 0 : -180));
  const degrees = useDerivedValue(() => withTiming(open.value));

  const toggleButtonStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${degrees.value}deg` }],
  }));

  return (
    <Box flexDirection="row" justifyContent="flex-end" marginTop="s">
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
