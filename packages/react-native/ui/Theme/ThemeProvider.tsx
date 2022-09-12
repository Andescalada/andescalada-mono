import React, { FC, ReactNode, useMemo } from 'react';
import {
  ThemeProvider as RestyleProvider,
  KnownBaseTheme,
} from '@shopify/restyle';
import deepmerge from 'deepmerge';
import baseTheme, { Theme as BaseTheme } from '.';

export type Theme<T> = BaseTheme & T;

interface Props {
  theme?: Partial<KnownBaseTheme>;
  children: ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children, theme = {} }) => {
  const mergeTheme = useMemo(() => deepmerge(theme, baseTheme), [theme]);

  return <RestyleProvider theme={mergeTheme}>{children}</RestyleProvider>;
};
