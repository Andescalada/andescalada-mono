import type { IconNames } from "@andescalada/icons";
import { A, Box, Button, Icon, Pressable, Screen, Text } from "@andescalada/ui";
// eslint-disable-next-line import/no-named-as-default
import ButtonGroup, {
  useButtonGroup,
} from "@andescalada/ui/ButtonGroup/ButtonGroup";
import { Ionicons } from "@expo/vector-icons";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { ComponentProps, FC, useState } from "react";
import { FadeIn, FadeOut } from "react-native-reanimated";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.PetsAgreement>;

const PetsAgreementScreen: FC<Props> = (props) => {
  const [selected, setSelected] = useState<CommonAgreementCardProps["id"]>();
  return (
    <Screen safeAreaDisabled padding="m">
      <Text variant="h2">Sobre mascotas:</Text>
      <Box flex={1} marginTop="m">
        <ButtonGroup
          value={selected}
          onChange={(v) => setSelected(v as string)}
          allowUndefined
        >
          <CommonAgreementCard
            id="2"
            title="Se permiten mascotas"
            subTitle="Tus mascotas son bienvenidas en esta zona de escalada. Se responsable y respetuoso"
            iconName="dog"
            marginBottom="xl"
          />
          <CommonAgreementCard
            id="1"
            title="No se permiten mascotas"
            subTitle=" Lamentamos que tus mascotas no puedan acompañarte en esta zona de
        escalada."
            iconName="no-dog"
            marginBottom="xl"
          />

          <UndefinedAgreementButton />
          <SubmitButton />
        </ButtonGroup>
      </Box>
    </Screen>
  );
};

export default PetsAgreementScreen;

interface CommonAgreementCardProps extends ComponentProps<typeof Box> {
  id: string;
  title: string;
  subTitle: string;
  iconName: IconNames;
}

const CommonAgreementCard = ({
  id,
  iconName,
  subTitle,
  title,
  ...props
}: CommonAgreementCardProps) => {
  const { value, onChange, allowUndefined } = useButtonGroup();

  const isSelected = value !== undefined ? value === id : undefined;

  return (
    <Box
      height={150}
      width="100%"
      borderRadius={30}
      backgroundColor="grayscale.100"
      flexDirection="row"
      padding="s"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Box flex={0.25} height="100%" alignItems="center" paddingTop="s">
        <Icon
          name={
            isSelected === false ? iconName : (`${iconName}-color` as IconNames)
          }
          size={50}
          color="grayscale.500"
        />
      </Box>
      <Box padding="s" flex={1}>
        <Text
          variant="p1B"
          color={isSelected === false ? "grayscale.500" : "grayscale.black"}
        >
          {title}
        </Text>
        <Text
          color={isSelected === false ? "grayscale.500" : "grayscale.black"}
        >
          {subTitle}
        </Text>
      </Box>
      <Pressable
        backgroundColor={
          isSelected
            ? "semantic.success"
            : isSelected === false
            ? "grayscale.500"
            : "semantic.info"
        }
        height={50}
        width={80}
        borderRadius={30}
        position="absolute"
        bottom={-25}
        borderWidth={5}
        borderColor="grayscale.black"
        right={32}
        justifyContent="center"
        alignItems="center"
        onPress={() => {
          if (isSelected && allowUndefined) {
            onChange(undefined);
            return;
          }
          onChange(id);
        }}
      >
        <Ionicons
          name={
            isSelected
              ? "md-checkmark-sharp"
              : isSelected === false
              ? "remove-sharp"
              : "add-sharp"
          }
          size={25}
        />
      </Pressable>
    </Box>
  );
};

const UndefinedAgreementButton = () => {
  const { value, onChange, allowUndefined } = useButtonGroup();

  const isSelected = value === "unknown";
  return (
    <Button
      variant={isSelected ? "info" : "contrast"}
      title="Sin definir"
      marginBottom="l"
      onPress={() => {
        if (isSelected && allowUndefined) {
          onChange(undefined);
          return;
        }
        onChange("unknown");
      }}
    />
  );
};
const SubmitButton = () => {
  const { value } = useButtonGroup();

  if (value !== undefined)
    return (
      <A.Box entering={FadeIn} exiting={FadeOut}>
        <Button variant="success" title="Continuar" />
      </A.Box>
    );
  return <Box />;
};
