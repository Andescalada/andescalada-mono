import { A, useButtonGroup } from "@andescalada/ui";
import { Octicons } from "@expo/vector-icons";
import { ZoneCarouselModes } from "@features/climbs/UserZonesScreen/types";
import { useAppTheme } from "@hooks/useAppTheme";
import { useMemo } from "react";
import {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ZoneCarouselSelector = ({ mode }: { mode: ZoneCarouselModes }) => {
  const { value, onChange, allowUndefined } = useButtonGroup();

  const optionsByMode = useMemo(() => {
    switch (mode) {
      case "favorites":
        return {
          width: 100,
          height: 42,
          iconName: "heart",
          label: "Favoritas",
          backgroundColor: "brand.secondaryA",
          textColor: "grayscale.black",
        } as const;
      case "recent":
        return {
          width: 104,
          height: 42,
          iconName: "history",
          label: "Historial",
          backgroundColor: "brand.primaryB",
          textColor: "grayscale.black",
        } as const;
      case "owner":
        return {
          width: 84.7,
          height: 42,
          iconName: "person",
          label: "Tuyas",
          backgroundColor: "brand.secondaryB",
          textColor: "grayscale.black",
        } as const;
      default:
        throw new Error("Invalid mode");
    }
  }, [mode]);
  const isSelected = value === mode;
  const localMode = useSharedValue(mode);

  const width = useDerivedValue(() =>
    localMode.value === value ? optionsByMode.width : 42,
  );

  const containerStyle = useAnimatedStyle(() => ({
    height: 42,
    width: withTiming(width.value),
  }));
  const textStyle = useAnimatedStyle(() => ({
    opacity: withTiming(localMode.value ? 1 : 0),
  }));

  const theme = useAppTheme();

  return (
    <A.Pressable
      flexDirection="row"
      justifyContent="center"
      borderRadius={42 / 2}
      gap="xs"
      alignItems="center"
      style={containerStyle}
      backgroundColor={
        isSelected ? optionsByMode.backgroundColor : ("buttonGroup" as const)
      }
      onPress={() => {
        if (isSelected && allowUndefined) {
          onChange(undefined);
          return;
        }
        localMode.value = mode;
        onChange(mode);
      }}
    >
      <Octicons
        size={14}
        name={optionsByMode.iconName}
        color={isSelected ? theme.colors[optionsByMode.textColor] : "white"}
      />
      {isSelected && (
        <A.Text
          color={optionsByMode.textColor}
          entering={FadeIn.delay(100)}
          exiting={FadeOut.duration(100)}
          style={textStyle}
        >
          {optionsByMode.label}
        </A.Text>
      )}
    </A.Pressable>
  );
};

export default ZoneCarouselSelector;
