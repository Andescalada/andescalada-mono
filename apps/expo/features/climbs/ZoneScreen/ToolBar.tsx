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
        <Box
          width={26}
          height={26}
          justifyContent="center"
          alignItems="center"
          borderWidth={1.8}
          borderRadius={14}
          borderColor="zoneOptionsIcons"
          backgroundColor={isDownloaded ? "zoneOptionsIcons" : "background"}
        >
          {!isDownloading ? (
            <Ionicons
              name={"arrow-down-outline"}
              size={18}
              style={{
                transform: [{ translateX: 0.5 }],
              }}
              color={isDownloaded ? "background" : "zoneOptionsIcons"}
              allowFontScaling
            />
          ) : (
            <ActivityIndicator
              color="zoneOptionsIcons"
              size="small"
              style={{ transform: [{ scale: 0.6 }] }}
            />
          )}
        </Box>
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
