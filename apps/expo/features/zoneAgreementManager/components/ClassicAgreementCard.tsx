import type { IconNames } from "@andescalada/icons";
import { Box, Icon, Pressable, Text, useButtonGroup } from "@andescalada/ui";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps, useCallback } from "react";

interface Props extends ComponentProps<typeof Box> {
  id: string;
  title: string;
  subTitle: string;
  iconName: IconNames;
}

const ClassicAgreementCard = ({
  id,
  iconName,
  subTitle,
  title,
  ...props
}: Props) => {
  const { value, onChange, allowUndefined } = useButtonGroup();

  const isSelected = value !== undefined ? value === id : undefined;

  const onSelect = useCallback(() => {
    if (isSelected && allowUndefined) {
      onChange(undefined);
      return;
    }
    onChange(id);
  }, [allowUndefined, id, isSelected, onChange]);

  return (
    <Pressable
      width="100%"
      borderRadius={30}
      backgroundColor="grayscale.100"
      flexDirection="row"
      padding="l"
      alignItems="center"
      justifyContent="space-between"
      onPress={onSelect}
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
      <Box padding="s" flex={1} height="100%">
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
        onPress={onSelect}
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
    </Pressable>
  );
};

export default ClassicAgreementCard;
