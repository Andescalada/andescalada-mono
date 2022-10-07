import { ComponentProps, FC, ReactNode, useCallback } from "react";

import Box from "../Box/Box";
import Text from "../Text/Text";

interface Props {
  startAdornment?: string | ReactNode;
  startAdornmentProps?: Omit<ComponentProps<typeof Text>, "variant">;
  startAdornmentContainerProps?: ComponentProps<typeof Box>;
  endAdornment?: string | ReactNode;
  endAdornmentProps?: Omit<ComponentProps<typeof Text>, "variant">;
  endAdornmentContainerProps?: ComponentProps<typeof Box>;
}

const InputAdornment: FC<Props> = ({
  startAdornment,
  startAdornmentProps,
  startAdornmentContainerProps,
  endAdornment,
  endAdornmentProps,
  endAdornmentContainerProps,
  children,
}) => {
  const startAdornmentComponent = useCallback(() => {
    if (typeof startAdornment === "string")
      return (
        <Box {...startAdornmentContainerProps}>
          <Text
            color="grayscale.black"
            marginRight="xs"
            {...startAdornmentProps}
          >
            {startAdornment}
          </Text>
        </Box>
      );
    return startAdornment;
  }, [startAdornment, startAdornmentContainerProps, startAdornmentProps]);

  const endAdornmentComponent = useCallback(() => {
    if (typeof endAdornment === "string")
      return (
        <Box {...endAdornmentContainerProps}>
          <Text color="grayscale.black" marginRight="xs" {...endAdornmentProps}>
            {endAdornment}
          </Text>
        </Box>
      );
    return endAdornment;
  }, [endAdornment, endAdornmentProps, endAdornmentContainerProps]);
  return (
    <Box flexDirection="row" flex={1}>
      {startAdornment && startAdornmentComponent()}
      <Box flex={1}>{children}</Box>
      {endAdornment && endAdornmentComponent()}
    </Box>
  );
};

export default InputAdornment;
