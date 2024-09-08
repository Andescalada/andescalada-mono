import { ComponentProps, FC, useMemo } from "react";

import Box from "../Box/Box";
import SafeAreaView from "../SafeAreaView/SafeAreaView";

interface Props extends ComponentProps<typeof SafeAreaView> {
  safeAreaDisabled?: boolean;
}

const Screen: FC<Props> = ({
  children,
  safeAreaDisabled = false,
  ...props
}) => {
  const View = useMemo(
    () => (safeAreaDisabled ? Box : SafeAreaView),
    [safeAreaDisabled],
  );
  return (
    <View flex={1} edges={["top"]} {...props}>
      {children}
    </View>
  );
};

export default Screen;
