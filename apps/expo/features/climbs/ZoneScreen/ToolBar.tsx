import {
  A,
  ActivityIndicator,
  Box,
  Ionicons,
  Pressable,
} from "@andescalada/ui";
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
  isDownloading: boolean;
}

const ToolBar = ({
  isDownloaded,
  isFavorite,
  onDownloadPress,
  onFavoritePress,
  isDownloading,
}: ToolBarProps) => {
  const [openAll, setOpenAll] = useAtom(toggleWalls);

  const open = useDerivedValue(() => (openAll ? 0 : -180));
  const degrees = useDerivedValue(() => withTiming(open.value));

  const toggleButtonStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${degrees.value}deg` }],
  }));

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-end"
      marginTop="s"
    >
      <Pressable onPress={onDownloadPress} disabled={isDownloading}>
        {!isDownloading ? (
          <Ionicons
            name={
              isDownloaded ? "arrow-down-circle" : "arrow-down-circle-outline"
            }
            size={30}
            color={"zoneOptionsIcons"}
          />
        ) : (
          <Box
            width={26}
            height={26}
            justifyContent="center"
            borderWidth={2}
            borderRadius={14}
            borderColor="zoneOptionsIcons"
          >
            <ActivityIndicator
              color="zoneOptionsIcons"
              size="small"
              style={{ transform: [{ scale: 0.6 }] }}
            />
          </Box>
        )}
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
