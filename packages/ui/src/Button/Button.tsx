import {
  composeRestyleFunctions,
  createVariant,
  useRestyle,
  VariantProps,
} from "@shopify/restyle";
import { ComponentProps, FC } from "react";

import ActivityIndicator from "../ActivityIndicator";
import Box from "../Box/Box";
import Ionicons, { IoniconsNames } from "../Ionicons/Ionicons";
import Pressable from "../Pressable/Pressable";
import Text from "../Text/Text";
import { Colors, Theme } from "../Theme/config";

type RestyleProps = ComponentProps<typeof Pressable> &
  Required<VariantProps<Theme, "buttonVariants">>;

interface Props extends RestyleProps {
  isLoading?: boolean;
  title: string;
  titleVariant?: ComponentProps<typeof Text>["variant"];
  titleProps?: Omit<ComponentProps<typeof Text>, "variant">;
  icon?: IoniconsNames;
  iconProps?: Omit<ComponentProps<typeof Ionicons>, "name">;
  iconContainerProps?: ComponentProps<typeof Box>;
}

const buttonVariant = createVariant<Theme, "buttonVariants">({
  themeKey: "buttonVariants",
});
const restyleFunction = composeRestyleFunctions<Theme, RestyleProps>([
  buttonVariant,
]);

const Button: FC<Props> = ({
  isLoading,
  title,
  titleVariant = "button",
  titleProps,
  variant,
  icon,
  iconProps,
  iconContainerProps,
  ...rest
}) => {
  const props = useRestyle(restyleFunction, { variant, ...rest });
  return (
    <Pressable flexDirection="row" {...props}>
      {isLoading ? (
        <ActivityIndicator color={`${variant}ButtonText` as Colors} />
      ) : (
        <Text
          variant={titleVariant}
          color={`${variant}ButtonText` as Colors}
          {...titleProps}
        >
          {title}
        </Text>
      )}
      {icon && (
        <Box {...iconContainerProps}>
          <Ionicons
            name={icon}
            color={`${variant}ButtonText` as Colors}
            {...iconProps}
          />
        </Box>
      )}
    </Pressable>
  );
};

export default Button;
