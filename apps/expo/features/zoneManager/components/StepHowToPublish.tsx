import { Box, Button, Icon, Screen, Text } from "@andescalada/ui";
import { ComponentProps, FC, ReactNode } from "react";
import { useWindowDimensions } from "react-native";

interface Props {
  onNext: () => void;
  onNextButtonTitle?: string;
}

const StepHowToPublish: FC<Props> = ({
  onNextButtonTitle: title = "Comencemos",
  onNext,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen
      flex={1}
      backgroundColor="brand.secondaryB"
      width={screenWidth}
      padding="m"
      alignItems="stretch"
      justifyContent="space-between"
    >
      <Box flex={1}>
        <Text variant="h1" color="brand.primaryA">
          Cómo publicar la zona{" "}
        </Text>
        <Box
          alignSelf="center"
          marginVertical="l"
          style={{ transform: [{ rotateZ: "-20deg" }] }}
        >
          <Icon name="megaphone-color" color="semantic.success" size={70} />
        </Box>

        <InstructionContainer>
          <Icon name="eyes-color" color="semantic.success" size={50} />
          <Box flex={1}>
            <Text variant="p2R" color="grayscale.black" marginLeft={"m"}>
              La zona{" "}
              <Text variant="p2B" color="grayscale.black">
                no
              </Text>{" "}
              se publica automáticamente.
            </Text>
          </Box>
        </InstructionContainer>

        <InstructionContainer>
          <Icon name="checklist-color" color="semantic.success" size={50} />
          <Box flex={1}>
            <Text variant="p2R" color="grayscale.black" marginLeft={"m"}>
              En un principio, la zona estará{" "}
              <Text variant="p2B" color="grayscale.black">
                &quot;No publicada&quot;
              </Text>
              , cuando sientas que estas listo para que otros usuarios puedan
              verla, apreta el botón{" "}
              <Text variant="p2B" color="grayscale.black">
                &quot;Solicitar revisión&quot;
              </Text>
            </Text>
          </Box>
        </InstructionContainer>
        <InstructionContainer>
          <Icon name="approve-color" color="semantic.success" size={50} />
          <Box flex={1}>
            <Text variant="p2R" color="grayscale.black" marginLeft={"m"}>
              Una vez aprobada, cuando apretes el botón{" "}
              <Text variant="p2B" color="grayscale.black">
                &quot;Publicar&quot;
              </Text>{" "}
              la zona podrá ser encontrada por otros usuarios.
            </Text>
          </Box>
        </InstructionContainer>
      </Box>
      <Button
        variant="transparent"
        padding="m"
        title={title}
        marginBottom="xxl"
        onPress={onNext}
      />
    </Screen>
  );
};

export default StepHowToPublish;

interface InstructionContainerProps extends ComponentProps<typeof Box> {
  children: ReactNode;
}

const InstructionContainer = ({
  children,
  ...props
}: InstructionContainerProps) => {
  return (
    <Box
      backgroundColor="brand.secondaryA"
      padding="s"
      borderRadius={10}
      flexDirection="row"
      alignItems="center"
      marginVertical="xs"
      {...props}
    >
      {children}
    </Box>
  );
};
