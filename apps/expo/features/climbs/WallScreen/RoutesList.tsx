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
import { useRoute } from "@react-navigation/native";
import { FC, useRef, useState } from "react";
import { Alert } from "react-native";

type NavigationRoute =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>["route"];

const RoutesList: FC = () => {
  const route = useRoute<NavigationRoute>();
  const { zoneId } = route.params;
  const { permission } = usePermissions({ zoneId });
  const { data: user } = useOwnInfo();
  const utils = trpc.useContext();
  const {
    data,
    refetch,
    isFetching,
    isLoading: isLoadingWall,
  } = trpc.walls.byId.useQuery(route.params.wallId, {
    onSuccess(data) {
      if (data) {
        setRoutes(data.routes);
      }
    },
  });

  const { mutate } = trpc.routes.delete.useMutation();
  const refresh = useRefresh(refetch, isFetching);

  const { gradeSystem } = useGradeSystem();

  const mainTopo = data?.topos[0];

  const rootNavigation = useRootNavigation();

  const [routes, setRoutes] = useState(data?.routes);

  const listItemRef = useRef<ListItemRef>(null);

  const onDelete = (id: string) => {
    const r = routes?.filter((route) => route.id !== id);
    if (r) setRoutes([...r]);
    console.log("here");
    mutate({
      isDeleted: SoftDeleteSchema.Enum.DeletedPublic,
      routeId: id,
      zoneId,
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

  if (isLoadingWall) return null;
  if (!route)
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
    <ScrollView flex={1} refreshControl={refresh}>
      {routes?.map((item, index) => {
        const n = item.RouteGrade?.grade;
        const grade = typeof n === "number" ? gradeSystem(n, item.kind) : "?";
        return (
          <ListItem
            key={item.id}
            ref={listItemRef}
            index={index}
            allowEdit={
              permission?.has("Update") || item.Author.email === user?.email
            }
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            onDelete={() => onDeleteTry(item.id)}
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
    </ScrollView>
  );
};

export default RoutesList;
