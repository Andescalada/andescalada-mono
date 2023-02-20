import { SCREEN_HEIGHT } from "@andescalada/climbs-drawer/SkiaRouteCanvas/SkiaRouteCanvas";
import { A, Box, Text } from "@andescalada/ui";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

interface InstructionProps {
  children: ReactNode;
  delay?: number;
}

export const SHOWING_TIME = 3000;

const Instructions = ({ children, delay = 0 }: InstructionProps) => {
  const [showInstruction, setShowInstructions] = useState(true);

  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const timeOut = useCallback((delay: number) => {
    timeRef.current = setTimeout(
      () => setShowInstructions(false),
      SHOWING_TIME + delay,
    );
  }, []);

  useEffect(() => {
    if (showInstruction) {
      timeOut(delay);
    }
  }, [showInstruction, timeOut, delay]);

  if (showInstruction)
    return (
      <A.Pressable
        position="absolute"
        bottom={SCREEN_HEIGHT * 0.25}
        backgroundColor="overPhotoOverlay"
        right={16}
        left={16}
        justifyContent="center"
        alignItems="center"
        padding="s"
        borderRadius={10}
        entering={FadeIn.delay(delay)}
        exiting={FadeOut}
        onPressIn={() => {
          if (timeRef.current) clearTimeout(timeRef.current);
          // setShowInstructions(false);
        }}
        onPressOut={() => {
          timeOut(2000);
        }}
      >
        <Text variant="p2R">{children}</Text>
      </A.Pressable>
    );

  return <Box />;
};

export default Instructions;
