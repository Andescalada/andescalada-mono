import { AppRouter } from "@andescalada/api/src/routers/_app";
import { SoftDeleteSchema } from "@andescalada/db/zod";
import { Box, Text } from "@andescalada/ui";
import { routeKindLabel } from "@andescalada/utils/routeKind";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import ListItem, { ListItemRef } from "@features/climbs/WallScreen/ListItem";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import useOfflineMode from "@hooks/useOfflineMode";
import useOwnInfo from "@hooks/useOwnInfo";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import type { Topo, Zone } from "@prisma/client";
import { inferProcedureOutput } from "@trpc/server";
import { ComponentProps, useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";

type Wall = inferProcedureOutput<AppRouter["walls"]["byId"]>;

type RouteItem = Wall["routes"][0] | Wall["routes"][0]["Extension"][0];

type CustomListItemProps = Omit<
  ComponentProps<typeof ListItem>,
  "children" | "routeName"
>;

interface Props extends CustomListItemProps {
  item: RouteItem & { routeRef: React.RefObject<ListItemRef> };
  index: number;
  resetOthers: () => void;
  zoneId: Zone["id"];
  topoId: Topo["id"] | undefined;
  hidePosition?: boolean;
  isExtension?: boolean;
}

const RouteItem = ({
  item,
  index,
  resetOthers,
  zoneId,
  topoId,
  hidePosition = false,
  isExtension,
  ...props
}: Props) => {
  const { gradeLabel } = useGradeSystem();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setTouchRouteId] = useState<string | null>(null);
  const utils = trpc.useContext();

  const { permission } = usePermissions({ zoneId });
  const { data: user } = useOwnInfo();
  const { isOfflineMode } = useOfflineMode();

  const wallId = useMemo(() => item.wallId, [item.wallId]);

  const { mutate } = trpc.routes.delete.useMutation({
    onMutate: async ({ routeId }) => {
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
    onError: (_, __, context) => {
      utils.walls.byId.setData({ wallId, zoneId }, context?.previousData);
    },
    onSettled: () => {
      utils.walls.byId.invalidate({ wallId, zoneId });
      if (topoId) utils.topos.byId.invalidate({ topoId, zoneId });
    },
  });

  const onDelete = useCallback(
    (id: string) => {
      mutate({
        isDeleted: SoftDeleteSchema.Enum.DeletedPublic,
        routeId: id,
        zoneId,
      });
    },
    [mutate, zoneId],
  );

  const onDeleteTry = useCallback(() => {
    Alert.alert("Eliminar ruta", "¿Seguro que quieres eliminar esta ruta?", [
      {
        text: "Borrar",
        onPress: () => onDelete(item.id),
        style: "destructive",
      },
      {
        text: "Cancelar",
        onPress: () => {
          item.routeRef?.current?.reset();
        },
        style: "cancel",
      },
    ]);
  }, [item.id, item.routeRef, onDelete]);

  const rootNavigation = useRootNavigation();

  const onPress = useCallback(() => {
    if (!topoId) return;
    rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
      screen: RoutesManagerNavigationRoutes.TopoViewer,
      params: {
        topoId,
        routeId: item.id,
        zoneId,
      },
    });
  }, [item.id, rootNavigation, topoId, zoneId]);

  const onOptions = useCallback(() => {
    item.routeRef?.current?.reset();
    rootNavigation.navigate(RootNavigationRoutes.Climbs, {
      screen: ClimbsNavigationRoutes.RouteOptions,
      params: { routeId: item.id, zoneId, wallId },
    });
  }, [item.id, item.routeRef, rootNavigation, wallId, zoneId]);

  const grade = useMemo(
    () => gradeLabel(item.RouteGrade, item.kind),
    [gradeLabel, item.kind, item.RouteGrade],
  );

  return (
    <ListItem
      {...props}
      ref={item.routeRef}
      routeName={item.name}
      index={index}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      allowEdit={
        (permission?.has("Update") || item.Author.email === user?.email) &&
        !isOfflineMode
      }
      onTouch={() => {
        setTouchRouteId((prev) => {
          if (prev !== item.id) {
            resetOthers();
          }
          return item.id;
        });
        utils.routes.byId.prefetch(item.id);
      }}
      onRightAction={onDeleteTry}
      onLeftAction={onOptions}
      onPress={onPress}
    >
      <Box flex={1} flexDirection="row" alignItems="center">
        {!hidePosition && (
          <Box
            borderWidth={1}
            borderColor="text"
            borderRadius={15}
            height={30}
            width={30}
            justifyContent="center"
            alignItems="center"
            marginRight="s"
          >
            <Text
              variant="p2B"
              paddingHorizontal="xs"
              textAlign="center"
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.position}
            </Text>
          </Box>
        )}
        <Box>
          <Text variant="p2R" ellipsizeMode="tail" numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="caption" color="grayscale.400">
            {routeKindLabel(item.kind).long}
          </Text>
        </Box>
      </Box>
      <Box flexDirection="row" alignItems="center">
        <Text variant="p2R">{grade}</Text>
      </Box>
    </ListItem>
  );
};

export default RouteItem;
