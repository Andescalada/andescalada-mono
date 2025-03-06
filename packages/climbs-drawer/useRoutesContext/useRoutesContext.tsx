import React, { createContext, useContext } from "react";

import { RoutesReturnTypes } from "../useRoutes/useRoutes";
import { omit } from "../utils";

const RoutesContext = createContext<RoutesReturnTypes | null>(null);

export const useRoutesContext = (): RoutesReturnTypes =>
  useContext(RoutesContext) as unknown as RoutesReturnTypes;

interface RoutesProviderProps extends RoutesReturnTypes {
  children: React.ReactNode;
}

export const RoutesProvider = (props: RoutesProviderProps) => {
  return (
    <RoutesContext.Provider
      value={omit(props, "children") as unknown as RoutesReturnTypes}
    >
      {props.children}
    </RoutesContext.Provider>
  );
};
