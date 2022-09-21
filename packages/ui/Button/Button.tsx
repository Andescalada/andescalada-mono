import {
  composeRestyleFunctions,
  createVariant,
  useRestyle,
  VariantProps,
} from "@shopify/restyle";
import { ComponentProps, FC } from "react";

import ActivityIndicator from "../ActivityIndicator/ActivityIndicator";
import Pressable from "../Pressable/Pressable";
import Text from "../Text/Text";
import { Colors, Theme } from "../Theme/theme";

type RestyleProps = ComponentProps<typeof Pressable> &
  Required<VariantProps<Theme, "buttonVariants">>;

interface Props extends RestyleProps {
  isLoading?: boolean;
  title: string;
  titleVariant?: ComponentProps<typeof Text>["variant"];
  titleProps?: Omit<ComponentProps<typeof Text>, "variant">;
}

const buttonVariant = createVariant({ themeKey: "buttonVariants" });
const restyleFunction = composeRestyleFunctions<Theme, RestyleProps>([
  buttonVariant,
]);

const Button: FC<Props> = ({
  isLoading,
  title,
  titleVariant = "h3",
  titleProps,
  variant,
  ...rest
}) => {
  const props = useRestyle(restyleFunction, { variant, ...rest });
  return (
    <Pressable {...props}>
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
    </Pressable>
  );
};

export default Button;
