import { ComponentProps, FC } from "react";

import Ionicons from "../Ionicons/Ionicons";
import Pressable from "../Pressable/Pressable";

interface Props extends ComponentProps<typeof Pressable> {
  size?: number;
  iconProps?: ComponentProps<typeof Ionicons>;
  iconSize?: number;
}

const AddButton: FC<Props> = ({ size = 30, iconProps, iconSize, ...props }) => {
  return (
    <Pressable
      backgroundColor="semantic.info"
      borderRadius={size / 3}
      height={size}
      width={size}
      justifyContent="center"
      alignItems="center"
      overflow={"hidden"}
      {...props}
    >
      <Ionicons
        name={"add-sharp"}
        size={iconSize || (2 / 3) * size}
        color="grayscale.white"
        {...iconProps}
      />
    </Pressable>
  );
};

export default AddButton;
