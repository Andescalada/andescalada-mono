import { SoftDeleteSchema } from "@andescalada/db/zod";
import { ScrollView, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import ListItem, { ListItemRef } from "@features/climbs/WallScreen/ListItem";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import useOwnInfo from "@hooks/useOwnInfo";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { Route } from "@prisma/client";
import { useRoute } from "@react-navigation/native";
import parseGrade, { ParseGrade } from "@utils/parseGrade";
import { FC, useMemo, useRef } from "react";
import { Alert } from "react-native";

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

const RoutesList: FC = () => {
  const route = useRoute<NavigationRoute>();
  const { zoneId, wallId } = route.params;
  const { permission } = usePermissions({ zoneId });
  const { data: user } = useOwnInfo();
  const utils = trpc.useContext();
  const {
    data,
    refetch,
    isFetching,
    isLoading: isLoadingWall,
  } = trpc.walls.byId.useQuery({ wallId });

  const { mutate } = trpc.routes.delete.useMutation({
    onMutate: async ({ routeId }) => {
      await utils.walls.byId.cancel({ wallId });
      const previousData = utils.walls.byId.getData({ wallId });

      utils.walls.byId.setData({ wallId }, (old) => {
        if (!old) return undefined;
        const routes = old.routes?.filter((route) => route.id !== routeId);
        return { ...old, routes };
      });
      return { previousData };
    },
    onError: (_, __, context) => {
      utils.walls.byId.setData({ wallId }, context?.previousData);
    },
    onSettled: () => {
      utils.walls.byId.invalidate({ wallId });
      if (data?.topos[0]?.id)
        utils.topos.byId.invalidate({ topoId: data?.topos[0]?.id });
    },
  });
  const refresh = useRefresh(refetch, isFetching);

  const { gradeSystem } = useGradeSystem();

  const mainTopo = data?.topos[0];

  const rootNavigation = useRootNavigation();

  const listItemRef = useRef<ListItemRef>(null);

  const onDelete = (id: string) => {
    mutate({
      isDeleted: SoftDeleteSchema.Enum.DeletedPublic,
      routeId: id,
      zoneId,
    });
  };

  const onEdit = (params: {
    id: Route["id"];
    name: Route["name"];
    kind: Route["kind"];
    grade?: ParseGrade;
  }) => {
    listItemRef?.current?.undoEdit();
    rootNavigation.navigate(RootNavigationRoutes.Climbs, {
      screen: ClimbsNavigationRoutes.AddRoute,
      params: { ...params, zoneId, wallId },
    });
  };

  const onDeleteTry = (id: string) => {
    Alert.alert("Eliminar ruta", "¿Seguro que quieres eliminar esta ruta?", [
      { text: "Borrar", onPress: () => onDelete(id), style: "destructive" },
      {
        text: "Cancelar",
        onPress: () => listItemRef?.current?.undoDelete(),
        style: "cancel",
      },
    ]);
  };
  const routesCount = useMemo(
    () => data?.routes.length || 0,
    [data?.routes.length],
  );

  if (isLoadingWall) return null;
  if (!data?.routes || routesCount === 0)
    return (
      <ScrollView
        refreshControl={refresh}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text variant="h3">Sin rutas</Text>
      </ScrollView>
    );

  return (
    <ScrollView.Gesture
      flex={1}
      refreshControl={refresh}
      paddingHorizontal="m"
      paddingTop="m"
      borderTopLeftRadius={5}
      borderTopRightRadius={5}
      backgroundColor="background"
      simultaneousHandlers={[listItemRef]}
      nestedScrollEnabled
    >
      {data?.routes.map((item, index) => {
        const n = item.RouteGrade?.grade;
        const grade = typeof n === "number" ? gradeSystem(n, item.kind) : "?";
        return (
          <ListItem
            key={item.id}
            ref={listItemRef}
            index={index}
            containerProps={{
              marginBottom: index === routesCount - 1 ? "xl" : "none",
            }}
            allowEdit={
              permission?.has("Update") || item.Author.email === user?.email
            }
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            onDelete={() => onDeleteTry(item.id)}
            onEdit={() =>
              onEdit({
                id: item.id,
                name: item.name,
                kind: item.kind,
                grade: parseGrade(item.RouteGrade),
              })
            }
            onPress={() => {
              if (!mainTopo?.id) return;
              rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
                screen: RoutesManagerNavigationRoutes.TopoViewer,
                params: {
                  topoId: mainTopo?.id,
                  routeId: item.id,
                },
              });
            }}
          >
            <Text variant="p2R">{`${item.position} - ${item.name}`}</Text>
            <Text variant="p2R">{grade}</Text>
          </ListItem>
        );
      })}
    </ScrollView.Gesture>
  );
};

export default RoutesList;
