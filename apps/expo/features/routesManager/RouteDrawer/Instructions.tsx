import { SCREEN_HEIGHT } from "@andescalada/climbs-drawer/SkiaRouteCanvas/SkiaRouteCanvas";
import { A, Box, Text } from "@andescalada/ui";
import { useEffect, useMemo, useState } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

interface InstructionProps {
  isEditing: boolean;
}

const Instructions = ({ isEditing }: InstructionProps) => {
  const [showInstruction, setShowInstructions] = useState(true);

  useEffect(() => {
    if (showInstruction) {
      setTimeout(() => setShowInstructions(false), 3000);
    }
  }, [showInstruction]);

  const text = useMemo(() => {
    if (isEditing) {
      return 'Pulsa "deshacer" para borrar el último punto o "borrar" para borrar todo';
    }
    return "Pulsa sobre la imagen para dibujar la ruta";
  }, [isEditing]);

  if (showInstruction)
    return (
      <A.Box
        position="absolute"
        bottom={SCREEN_HEIGHT * 0.25}
        backgroundColor="grayscale.transparent.50.400"
        right={16}
        left={16}
        justifyContent="center"
        alignItems="center"
        padding="s"
        borderRadius={10}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <Text variant="p2R">{text}</Text>
      </A.Box>
    );

  return <Box />;
};

export default Instructions;
