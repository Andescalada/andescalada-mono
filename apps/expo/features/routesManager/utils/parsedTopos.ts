import { AppRouter } from "@andescalada/api/src/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type Topo = inferRouterOutputs<AppRouter>["topos"]["byId"];

const parsedTopo = (topo: Topo, routeId: string) => {
  const otherRoutes = topo?.RoutePath.filter((r) => r.Route.id !== routeId);

  const selectedRoute = topo?.RoutePath?.find((r) => r.Route.id === routeId);

  return {
    otherRoutes,
    selectedRoute,
    routeStrokeWidth: Number(topo.routeStrokeWidth),
  };
};

export type ParsedTopo = ReturnType<typeof parsedTopo>;

export default parsedTopo;
