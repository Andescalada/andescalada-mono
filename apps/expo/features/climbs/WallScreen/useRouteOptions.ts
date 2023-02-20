import { SoftDeleteSchema } from "@andescalada/db/zod";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import { MultiPitchManagerRoutes } from "@features/multiPitchManager/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useCallback } from "react";
import { Alert } from "react-native";

const useRouteOptions = ({
  wallId,
  topoId,
  reset,
}: {
  wallId: string;
  topoId?: string;
  reset: () => void;
}) => {
  const utils = trpc.useContext();

  const { mutate: deleteRoute } = trpc.routes.delete.useMutation({
    onMutate: async ({ routeId, zoneId, isExtension }) => {
      await utils.walls.byId.cancel({ wallId, zoneId });
      const previousData = utils.walls.byId.getData({ wallId, zoneId });

      utils.walls.byId.setData({ wallId, zoneId }, (old) => {
        if (!old) return undefined;

        let routes;
        if (isExtension) {
          routes = old.routes?.map((r) => {
            const Extension = r.Extension?.filter((e) => e.id !== routeId);
            return { ...r, Extension };
          });
        } else {
          routes = old.routes?.filter((route) => route.id !== routeId);
        }
        return { ...old, routes };
      });
      return { previousData };
    },
    onError: (_, { zoneId }, context) => {
      utils.walls.byId.setData({ wallId, zoneId }, context?.previousData);
    },
    onSettled: (_, __, params) => {
      const { zoneId } = params;
      utils.walls.byId.invalidate({ wallId, zoneId });
      if (topoId) utils.topos.byId.invalidate({ topoId, zoneId });
    },
  });

  const { mutate: deleteMultiPitch } = trpc.multiPitch.deleteById.useMutation({
    onMutate: async ({ multiPitchId, zoneId }) => {
      await utils.walls.byId.cancel({ wallId, zoneId });
      const previousData = utils.walls.byId.getData({ wallId, zoneId });

      utils.walls.byId.setData({ wallId, zoneId }, (old) => {
        if (!old) return undefined;

        const MultiPitch = old.MultiPitch.filter(
          (mp) => mp.id !== multiPitchId,
        );

        return { ...old, MultiPitch };
      });
      return { previousData };
    },
    onError: (_, { zoneId }, context) => {
      utils.walls.byId.setData({ wallId, zoneId }, context?.previousData);
    },
    onSettled: (_, __, params) => {
      const { zoneId } = params;
      utils.walls.byId.invalidate({ wallId, zoneId });
      if (topoId) utils.topos.byId.invalidate({ topoId, zoneId });
    },
  });

  const onDelete = useCallback(
    (
      id: string,
      zoneId: string,
      isExtension: boolean,
      isMultiPitch: boolean,
    ) => {
      if (isMultiPitch) {
        deleteMultiPitch({ multiPitchId: id, zoneId });
        return;
      }
      deleteRoute({
        isDeleted: SoftDeleteSchema.Enum.DeletedPublic,
        routeId: id,
        zoneId,
        isExtension,
      });
    },
    [deleteMultiPitch, deleteRoute],
  );

  const onDeleteTry = useCallback(
    ({
      id,
      zoneId,
      isExtension = false,
      isMultiPitch = false,
    }: {
      id: string;
      zoneId: string;
      isExtension?: boolean;
      isMultiPitch?: boolean;
    }) => {
      Alert.alert("Eliminar ruta", "¿Seguro que quieres eliminar esta ruta?", [
        {
          text: "Borrar",
          onPress: () => onDelete(id, zoneId, isExtension, isMultiPitch),
          style: "destructive",
        },
        {
          text: "Cancelar",
          onPress: reset,
          style: "cancel",
        },
      ]);
    },
    [onDelete, reset],
  );

  const rootNavigation = useRootNavigation();

  const onPress = useCallback(
    ({
      routeId,
      zoneId,
      topoId,
    }: {
      topoId?: string;
      routeId: string;
      zoneId: string;
    }) => {
      if (!topoId) return;
      rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
        screen: RoutesManagerNavigationRoutes.TopoViewer,
        params: {
          topoId,
          routeId,
          zoneId,
        },
      });
    },
    [rootNavigation],
  );

  const onRouteOptions = ({
    routeId,
    zoneId,
  }: {
    routeId: string;
    zoneId: string;
  }) => {
    rootNavigation.navigate(RootNavigationRoutes.Climbs, {
      screen: ClimbsNavigationRoutes.RouteOptions,
      params: { routeId, zoneId, wallId },
    });
  };

  const onMultiPitchOptions = ({
    id,
    name,
    zoneId,
  }: {
    id: string;
    zoneId: string;
    name: string;
  }) => {
    rootNavigation.navigate(RootNavigationRoutes.MultiPitchManager, {
      screen: MultiPitchManagerRoutes.MultiPitchManager,
      params: {
        multiPitchId: id,
        multiPitchName: name,
        zoneId,
        topoId,
      },
    });
  };

  return { onRouteOptions, onMultiPitchOptions, onDeleteTry, onPress };
};

export default useRouteOptions;
