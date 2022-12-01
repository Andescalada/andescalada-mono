import { ComponentProps, ReactNode } from "react";

import ListItem from "../ListItem/ListItem";
import Text from "../Text/Text";

interface Props extends ComponentProps<typeof ListItem> {
  children: ReactNode;
}

const ListItemOption = ({ children, ...props }: Props) => {
  return (
    <ListItem marginVertical="s" {...props}>
      <Text variant="p2R">{children}</Text>
    </ListItem>
  );
};

export default ListItemOption;
