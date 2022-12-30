import { Box, Colors, Ionicons, Pressable } from "@andescalada/ui";
import { ComponentProps, FC, useMemo, useState } from "react";

interface Props extends ComponentProps<typeof Box> {
  setMapType: (mapType: "satellite" | "standard") => void;
  mapType: "satellite" | "standard";
}

const MapTypeToolbar: FC<Props> = ({ mapType, setMapType, ...props }) => {
  const mapTypeIconsColor = useMemo(
    () => (mapType === "standard" ? "grayscale.700" : "grayscale.white"),
    [mapType],
  );
  return (
    <Box
      position="absolute"
      top={50}
      right={16}
      backgroundColor="transparentButtonBackground"
      borderRadius={8}
      overflow="hidden"
      marginTop="l"
      {...props}
    >
      <Pressable
        paddingTop="s"
        paddingHorizontal="xs"
        paddingBottom="xs"
        onPress={() => setMapType("standard")}
      >
        <Ionicons name="car-sharp" size={25} color={mapTypeIconsColor} />
      </Pressable>
      <Box height={1} width="100%" backgroundColor={mapTypeIconsColor} />
      <Pressable
        paddingHorizontal="xs"
        paddingTop="xs"
        paddingBottom="s"
        onPress={() => setMapType("satellite")}
      >
        <Ionicons name="earth-sharp" size={25} color={mapTypeIconsColor} />
      </Pressable>
    </Box>
  );
};

export const useMapType = () => {
  const [mapType, setMapType] = useState<"satellite" | "standard">("satellite");
  const mapTypeIconsColor = useMemo(
    (): Colors =>
      mapType === "standard" ? "grayscale.700" : "grayscale.white",
    [mapType],
  );
  return { mapType, setMapType, mapTypeIconsColor };
};

export default MapTypeToolbar;
