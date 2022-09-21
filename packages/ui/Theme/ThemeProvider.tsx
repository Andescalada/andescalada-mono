import {
  KnownBaseTheme,
  ThemeProvider as RestyleProvider,
} from "@shopify/restyle";
import deepmerge from "deepmerge";
import React, { FC, ReactNode, useMemo } from "react";

import baseTheme, { Theme as BaseTheme } from "./theme";

export type Theme<T> = BaseTheme & T;

interface Props {
  theme?: Partial<KnownBaseTheme & Record<`${string}variants`, unknown>>;
  children: ReactNode;
}

const ThemeProvider: FC<Props> = ({ children, theme = {} }) => {
  const mergeTheme = useMemo(() => deepmerge(baseTheme, theme), [theme]);

  return <RestyleProvider theme={mergeTheme}>{children}</RestyleProvider>;
};

export default ThemeProvider;
