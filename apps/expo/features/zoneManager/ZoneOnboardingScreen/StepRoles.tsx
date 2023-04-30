import { A, Box, Icon, Screen, Text } from "@andescalada/ui";
import NextButton from "@features/zoneManager/components/NextButton";
import { FC, ReactNode } from "react";
import { useWindowDimensions } from "react-native";
import { FadeIn } from "react-native-reanimated";

interface Props {
  onNext: () => void;
}

const StepRoles: FC<Props> = ({ onNext }) => {
  const { width: screenWidth } = useWindowDimensions();
  return (
    <Screen
      flex={1}
      backgroundColor="brand.primaryB"
      width={screenWidth}
      justifyContent="space-between"
      paddingHorizontal="m"
    >
      <A.Box flex={1} entering={FadeIn}>
        <Text variant="h1">Documenta en equipo</Text>
        <Box alignSelf="center" marginVertical="l">
          <Icon name="united-color" size={80} />
        </Box>
        <Text variant="h3" color="grayscale.300" marginBottom="l">
          Puedes invitar a más usuarios a compartir con diferentes roles:
        </Text>
        <RoleContainer
          title="Colaboradora"
          description=" Puede agregar información y modificar sus contribuciones."
        >
          <Icon name="backpacker-color" color="semantic.success" size={50} />
        </RoleContainer>
        <RoleContainer
          title="Editora"
          description="Puede agregar información y modificar información que otros han compartido."
        >
          <Icon
            name="backpacker-senior-color"
            color="semantic.success"
            size={50}
          />
        </RoleContainer>
        <RoleContainer
          title="Administradora"
          description="Tendrá los mismos permisos que tú."
        >
          <Icon
            name="backpacker-exporer-color"
            color="semantic.success"
            size={50}
          />
        </RoleContainer>
      </A.Box>
      <NextButton onPress={onNext} alignSelf="center" marginBottom="xxl" />
    </Screen>
  );
};

export default StepRoles;

const RoleContainer = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) => (
  <Box
    backgroundColor="brand.secondaryB"
    padding="s"
    borderRadius={10}
    flexDirection="row"
    alignItems="center"
    marginVertical="xs"
  >
    {children}
    <Box flex={1}>
      <Text variant="p1R" color="grayscale.black" marginLeft={"s"}>
        {title}
      </Text>
      <Text variant="p3R" color="grayscale.black" marginLeft={"s"}>
        {description}
      </Text>
    </Box>
  </Box>
);
