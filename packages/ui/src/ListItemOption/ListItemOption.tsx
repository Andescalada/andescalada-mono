import { ComponentProps, ReactNode } from "react";

import Box from "../Box/Box";
import Ionicons, { IoniconsNames } from "../Ionicons/Ionicons";
import ListItem from "../ListItem/ListItem";
import Text from "../Text/Text";

interface Props extends ComponentProps<typeof ListItem> {
  children: ReactNode;
  icon?: IoniconsNames;
  iconSize?: ComponentProps<typeof Ionicons>["size"];
  iconProps?: ComponentProps<typeof Ionicons>;
}

const ListItemOption = ({
  children,
  icon,
  iconProps,
  iconSize = 20,
  ...props
}: Props) => {
  return (
    <ListItem
      flexDirection="row"
      alignItems="center"
      marginVertical="s"
      gap="s"
      {...props}
    >
      {icon && (
        <Box justifyContent="center">
          <Ionicons {...iconProps} name={icon} size={iconSize} />
        </Box>
      )}
      <Text variant="p2R">{children}</Text>
    </ListItem>
  );
};

export default ListItemOption;
