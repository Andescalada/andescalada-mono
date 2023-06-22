import Mapbox from "@andescalada/maps/mapbox";
import { Box, Colors, Text } from "@andescalada/ui";
import { images } from "@assets/images";
import { useAppTheme } from "@hooks/useAppTheme";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image } from "react-native";

export const ARROW_SIZE = 10;

export type OnPinSelected = (params: {
  id: string;
  latitude: number;
  longitude: number;
  isSelected: boolean;
}) => void;

type PinProps = {
  latitude: number;
  longitude: number;
  calloutText: string;
  startsOpen?: boolean;
  variant?: "main" | "orange";
  onPinSelected?: OnPinSelected;
} & Omit<
  ComponentProps<typeof Mapbox.PointAnnotation>,
  "children" | "coordinate" | "onSelected"
>;

const Pin = ({
  latitude,
  longitude,
  calloutText,
  startsOpen = false,
  variant = "main",
  ...props
}: PinProps) => {
  const [isPointerSelected, setIsPointerSelected] = useState(startsOpen);

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

  useEffect(() => {
    pointAnnotation?.current?.refresh();
  }, []);

  const pointAnnotation = useRef<Mapbox.PointAnnotation>(null);

  const onPointSelected = useCallback(() => {
    setIsPointerSelected((prev) => !prev);
    pointAnnotation.current?.refresh();
  }, []);

  return (
    <Mapbox.PointAnnotation
      ref={pointAnnotation}
      anchor={{ x: 0.5, y: 1 }}
      coordinate={[longitude, latitude]}
      onSelected={() => {
        if (props.onPinSelected)
          props?.onPinSelected({
            id: props.id,
            latitude,
            longitude,
            isSelected: isPointerSelected,
          });
        onPointSelected();
      }}
      {...props}
    >
      <Box justifyContent="center" alignItems="center">
        <Box
          bg={variantInfo.backgroundColor}
          p="s"
          borderRadius={16}
          mb="m"
          opacity={isPointerSelected ? 1 : 0}
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
        <Image
          source={variantInfo.image}
          onLoad={() => pointAnnotation.current?.refresh()}
        />
      </Box>
    </Mapbox.PointAnnotation>
  );
};

export default Pin;
