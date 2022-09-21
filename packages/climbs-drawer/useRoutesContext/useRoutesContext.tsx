import { RoutesReturnTypes } from "@andescalada/climbs-drawer/useRoutes/useRoutes";
import omit from "@andescalada/utils/omit";
import React, { createContext, useContext } from "react";

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
