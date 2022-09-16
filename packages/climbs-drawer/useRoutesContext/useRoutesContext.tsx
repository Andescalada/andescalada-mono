import React, { createContext, useContext } from 'react';
import omit from '@andescalada/utils/omit';

import { RoutesReturnTypes } from '@andescalada/climbs-drawer/useRoutes/useRoutes';

const RoutesContext = createContext<RoutesReturnTypes | null>(null);

export const useRoutesContext = (): RoutesReturnTypes =>
  useContext(RoutesContext) as unknown as RoutesReturnTypes;

interface RoutesProviderProps extends RoutesReturnTypes {
  children: React.ReactNode;
}

export const RoutesProvider = (props: RoutesProviderProps) => {
  return (
    <RoutesContext.Provider
      value={omit(props, 'children') as unknown as RoutesReturnTypes}
    >
      {props.children}
    </RoutesContext.Provider>
  );
};
