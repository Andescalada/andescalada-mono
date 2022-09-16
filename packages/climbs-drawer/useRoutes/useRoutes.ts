import { createRef, useCallback, useReducer } from 'react';

import { RouteRef } from '../RoutePath/RoutePath';

type Path = string | undefined;
type Id = string;
type Finished = boolean;

export interface Route {
  ref: React.RefObject<RouteRef>;
  id: Id;
  path?: Path;
  finished?: Finished;
}

enum Actions {
  SavePath,
  FinishRoute,
  CreateRoute,
  RemoveRoute,
  SetRoute,
}

interface SavePath {
  type: typeof Actions.SavePath;
  id: Id;
  path: Path;
}

interface FinishRoute {
  type: typeof Actions.FinishRoute;
  id: Id;
  finished: Finished;
}

interface CreateRoute {
  type: typeof Actions.CreateRoute;
  id: Id;
}

interface RemoveRoute {
  type: typeof Actions.RemoveRoute;
  id: Id;
}

interface SetRoute {
  type: typeof Actions.SetRoute;
  id: Id;
}

type ActionTypes =
  | SavePath
  | FinishRoute
  | CreateRoute
  | RemoveRoute
  | SetRoute;

interface State {
  routes: Route[];
  route: Route | null;
}

const reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case Actions.SavePath: {
      const newState = state;
      const selectedRoute = newState.routes.findIndex(
        (r) => r.id === action.id,
      );
      newState.routes[selectedRoute].path = action.path;
      return newState;
    }
    case Actions.FinishRoute: {
      const newState = state;
      const selectedRoute = newState.routes.findIndex(
        (r) => r.id === action.id,
      );
      newState.routes[selectedRoute].finished = action.finished;
      return newState;
    }
    case Actions.CreateRoute: {
      return {
        ...state,
        routes: [
          ...state.routes,
          {
            id: action.id,
            ref: createRef<RouteRef>(),
            finished: false,
            path: undefined,
          },
        ],
      };
    }
    case Actions.RemoveRoute: {
      const routes = state.routes.filter((r) => r.id !== action.id);
      return { ...state, routes };
    }
    case Actions.SetRoute: {
      const route = state.routes.find((r) => r.id === action.id);
      if (!route) {
        console.warn(`Route not found with id ${action.id}`);
        return state;
      }
      return {
        ...state,
        route,
      };
    }
    default:
      return state;
  }
};

interface UseRoute {
  initialState?: State;
}

const useRoutes = ({
  initialState = { routes: [], route: null },
}: UseRoute = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const savePath = useCallback(({ id, path }: { id: Id; path: Path }) => {
    dispatch({ type: Actions.SavePath, id, path });
  }, []);

  const finish = ({ id, finished }: { id: Id; finished: Finished }) => {
    dispatch({ type: Actions.FinishRoute, finished, id });
  };

  const create = ({ id }: { id: Id }) => {
    dispatch({ type: Actions.CreateRoute, id });
  };

  const remove = ({ id }: { id: Id }) => {
    dispatch({ type: Actions.RemoveRoute, id });
  };
  const setRoute = ({ id }: { id: Id | undefined }) => {
    if (!id) return;
    dispatch({ type: Actions.SetRoute, id });
  };
  return { state, methods: { savePath, finish, create, remove, setRoute } };
};

export type RoutesReturnTypes = ReturnType<typeof useRoutes>;

export default useRoutes;
