/* eslint-disable react/display-name */
import { Box, Text } from "@andescalada/ui";
import ListItem, { ListItemRef } from "@features/climbs/WallScreen/ListItem";
import { ComponentProps, forwardRef, ForwardRefRenderFunction } from "react";

type CustomListItemProps = Omit<
  ComponentProps<typeof ListItem>,
  "children" | "routeName" | "position"
>;

interface Props extends CustomListItemProps {
  index: number;
  grade: string;
  title: string;
  kind: string;
  position?: number;
  onOptions?: () => void;
  onDelete?: () => void;
}

const RouteItem: ForwardRefRenderFunction<ListItemRef, Props> = (
  { index, onDelete, onOptions, title, grade, kind, position, ...props },
  ref,
) => {
  return (
    <ListItem
      {...props}
      ref={ref}
      index={index}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      onRightAction={onDelete}
      onLeftAction={onOptions}
    >
      <Box flex={1} flexDirection="row" alignItems="center">
        {!!position && (
          <Box
            borderWidth={1}
            borderColor="text"
            borderRadius={15}
            height={30}
            width={30}
            justifyContent="center"
            alignItems="center"
            marginRight="s"
          >
            <Text
              variant="p2B"
              paddingHorizontal="xs"
              textAlign="center"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {position}
            </Text>
          </Box>
        )}
        <Box>
          <Text variant="p2R" ellipsizeMode="tail" numberOfLines={1}>
            {title}
          </Text>
          <Text variant="caption" color="grayscale.400">
            {kind}
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" alignItems="center">
        <Text variant="p2R">{grade}</Text>
      </Box>
    </ListItem>
  );
};

export default forwardRef(RouteItem);
