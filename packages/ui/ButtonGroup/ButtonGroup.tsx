import {
  ComponentProps,
  createContext,
  FC,
  ReactNode,
  useContext,
} from "react";

import Pressable from "../Pressable/Pressable";
import Text from "../Text/Text";

interface ButtonItemProps {
  label: string;
  value: string | number | undefined;
  backgroundColor?: ComponentProps<typeof Pressable>["backgroundColor"];
  selectedBackgroundColor?: ComponentProps<typeof Pressable>["backgroundColor"];
  textColor?: ComponentProps<typeof Text>["color"];
  selectedTextColor?: ComponentProps<typeof Text>["color"];
}

const ButtonItem: FC<ButtonItemProps> = ({
  label,
  value: localValue,
  backgroundColor = "buttonGroup",
  selectedBackgroundColor = "selectedButtonGroup",
  textColor,
  selectedTextColor = "grayscale.white",
}) => {
  const { value, onChange, allowUndefined } = useButtonGroup();
  const isSelected = value === localValue;
  return (
    <Pressable
      onPress={() => {
        if (isSelected && allowUndefined) {
          onChange(undefined);
          return;
        }
        onChange(localValue);
      }}
      padding="m"
      margin="s"
      backgroundColor={isSelected ? selectedBackgroundColor : backgroundColor}
      borderRadius={100}
    >
      <Text
        variant={isSelected ? "p2B" : "p2R"}
        color={isSelected ? selectedTextColor : textColor}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export interface ButtonGroupProps {
  value: string | number | undefined;
  onChange: (v: string | number | undefined) => void;
  children: ReactNode;
  allowUndefined?: boolean;
}

const ButtonGroupContext = createContext<ButtonGroupProps | null>(null);

export const ButtonGroup: FC<ButtonGroupProps> & {
  Item: FC<ButtonItemProps>;
} = ({ children, value, allowUndefined = true, onChange }) => {
  return (
    <ButtonGroupContext.Provider
      value={{ value, onChange, children, allowUndefined }}
    >
      {children}
    </ButtonGroupContext.Provider>
  );
};

export const useButtonGroup = () => {
  const methods = useContext(ButtonGroupContext);

  return methods as unknown as ButtonGroupProps;
};

ButtonGroup.Item = ButtonItem;

export default ButtonGroup;
