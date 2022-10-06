import { createContext, FC, ReactNode, useContext } from "react";

import Pressable from "../Pressable/Pressable";
import Text from "../Text/Text";

interface ButtonItemProps {
  label: string;
  value: string | number | undefined;
}

const ButtonItem: FC<ButtonItemProps> = ({ label, value: localValue }) => {
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
      margin={"s"}
      backgroundColor={isSelected ? "selectedButtonGroup" : "buttonGroup"}
      borderRadius={100}
    >
      <Text variant={isSelected ? "p2B" : "p2R"}>{label}</Text>
    </Pressable>
  );
};

interface ButtonGroupProps {
  value: string | number | undefined;
  onChange: (v: string | number | undefined) => void;
  children: ReactNode;
  allowUndefined?: boolean;
}

const ButtonGroupContext = createContext<ButtonGroupProps | null>(null);

const ButtonGroup: FC<ButtonGroupProps> & { Item: FC<ButtonItemProps> } = ({
  children,
  value,
  allowUndefined = true,
  onChange,
}) => {
  return (
    <ButtonGroupContext.Provider
      value={{ value, onChange, children, allowUndefined }}
    >
      {children}
    </ButtonGroupContext.Provider>
  );
};

const useButtonGroup = () => {
  const methods = useContext(ButtonGroupContext);

  return methods as unknown as ButtonGroupProps;
};

ButtonGroup.Item = ButtonItem;

export default ButtonGroup;
