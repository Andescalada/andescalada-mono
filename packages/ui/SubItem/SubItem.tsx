import { ComponentProps, FC } from "react";

import A from "../Animated/Animated";

interface Props extends Omit<ComponentProps<typeof A.Pressable>, "key"> {
  index?: number;
  maxIndex?: number;
}

const SubItem: FC<Props> = ({
  index = 0,
  maxIndex = 0,
  children,
  ...props
}) => {
  return (
    <A.Pressable
      height={48}
      justifyContent="center"
      paddingHorizontal="m"
      marginHorizontal="s"
      borderLeftWidth={2}
      borderRightWidth={2}
      borderColor="grayscale.400"
      borderBottomLeftRadius={index === maxIndex ? 5 : 0}
      borderBottomRightRadius={index === maxIndex ? 5 : 0}
      borderBottomWidth={index === maxIndex ? 2 : 1}
      {...props}
    >
      {children}
    </A.Pressable>
  );
};

export default SubItem;
