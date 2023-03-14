import {
  composeRestyleFunctions,
  createVariant,
  useRestyle,
  VariantProps,
} from "@shopify/restyle";
import { ComponentProps, FC } from "react";

import Pressable from "../Pressable/Pressable";
import Text from "../Text/Text";
import { Colors, Theme } from "../Theme/theme";

type RestyleProps = ComponentProps<typeof Pressable> &
  Required<VariantProps<Theme, "semanticButtonVariants">>;

interface Props extends RestyleProps {
  title: string;
  titleVariant?: ComponentProps<typeof Text>["variant"];
  titleProps?: Omit<ComponentProps<typeof Text>, "variant">;
}

const buttonVariant = createVariant({ themeKey: "semanticButtonVariants" });
const restyleFunction = composeRestyleFunctions<Theme, RestyleProps>([
  buttonVariant,
]);

const Button: FC<Props> = ({
  title,
  titleVariant = "h3",
  titleProps,
  variant,
  ...rest
}) => {
  const props = useRestyle(restyleFunction, { variant, ...rest });
  return (
    <Pressable {...props}>
      <Text
        variant={titleVariant}
        {...titleProps}
        color={`${variant}SemanticButtonText` as Colors}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
