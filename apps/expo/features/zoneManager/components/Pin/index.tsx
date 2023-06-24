import Mapbox from "@andescalada/maps/mapbox";
import { Box, Colors, Text } from "@andescalada/ui";
import { images } from "@assets/images";
import { useAppTheme } from "@hooks/useAppTheme";
import { ComponentProps, useMemo } from "react";
import { Image } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";

export const ARROW_SIZE = 10;

export type OnPinSelected = (params: {
  id: string;
  latitude: number;
  longitude: number;
}) => void;

type PinProps = {
  id: string;
  isSelected?: boolean;
  latitude: number;
  longitude: number;
  calloutText: string;
  variant?: "main" | "orange";
  onPinSelected?: OnPinSelected;
} & Omit<
  ComponentProps<typeof Mapbox.MapView>,
  "children" | "coordinate" | "isSelected" | "id"
>;

const Pin = ({
  id,
  latitude,
  longitude,
  isSelected,
  calloutText,
  variant = "main",
  ...props
}: PinProps) => {
  const variantInfo = useMemo(() => {
    switch (variant) {
      case "main":
        return {
          image: images.marker.file,
          backgroundColor: "brand.primaryA" as Colors,
        };
      case "orange":
        return {
          image: images.markerOrange.file,
          backgroundColor: "grayscale.800" as Colors,
        };
    }
  }, [variant]);

  const theme = useAppTheme();

  return (
    <Mapbox.MarkerView
      allowOverlap
      anchor={{ x: 0.5, y: 1 }}
      coordinate={[longitude, latitude]}
      isSelected={isSelected}
      {...props}
    >
      <TapGestureHandler
        onBegan={() => {
          if (props.onPinSelected)
            props?.onPinSelected({
              id,
              latitude,
              longitude,
            });
        }}
      >
        <Box justifyContent="center" alignItems="center">
          <Box
            bg={variantInfo.backgroundColor}
            p="s"
            borderRadius={16}
            mb="m"
            opacity={isSelected ? 1 : 0}
          >
            <Text>{calloutText}</Text>
            <Box
              position="absolute"
              bottom={-ARROW_SIZE}
              left={"50%"}
              alignItems="center"
              borderLeftWidth={ARROW_SIZE}
              borderLeftColor="transparent"
              borderStyle="solid"
              borderRightWidth={ARROW_SIZE}
              borderRightColor="transparent"
              borderTopColor={variantInfo.backgroundColor}
              borderTopWidth={ARROW_SIZE}
              style={{
                transform: [
                  { translateX: -(ARROW_SIZE - theme.spacing.s / 2) / 2 },
                ],
              }}
            />
          </Box>
          <Image source={variantInfo.image} />
        </Box>
      </TapGestureHandler>
    </Mapbox.MarkerView>
  );
};

export default Pin;
