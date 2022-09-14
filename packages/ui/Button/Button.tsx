import {
  Text,
  Pressable,
  ActivityIndicator,
  Theme,
  Colors,
} from '@andescalada/ui';
import {
  composeRestyleFunctions,
  createVariant,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import { FC, ComponentProps } from 'react';

type RestyleProps = ComponentProps<typeof Pressable> &
  Required<VariantProps<Theme, 'buttonVariants'>>;

interface Props extends RestyleProps {
  isLoading?: boolean;
  title: string;
  titleVariant?: ComponentProps<typeof Text>['variant'];
  titleProps?: Omit<ComponentProps<typeof Text>, 'variant'>;
}

const buttonVariant = createVariant({ themeKey: 'buttonVariants' });
const restyleFunction = composeRestyleFunctions<Theme, RestyleProps>([
  buttonVariant,
]);

const Button: FC<Props> = ({
  isLoading,
  title,
  titleVariant = 'h3',
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
          {...titleProps}
          color={`${variant}ButtonText` as Colors}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
