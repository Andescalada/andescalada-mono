import { InfoAccessSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  ListItem,
  Screen,
  SemanticButton,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { useAppDispatch } from "@hooks/redux";
import useRefresh from "@hooks/useRefresh";
import { logoutAuth0 } from "@store/auth";
import { useCallback } from "react";
import { Alert, FlatList } from "react-native";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZonesList>;

type InfoAccess = keyof typeof InfoAccessSchema.Enum;

const InfoAccessColor = (infoAccess: InfoAccess) => {
  switch (infoAccess) {
    case InfoAccessSchema.Enum.Community:
      return "semantic.warning" as const;
    case InfoAccessSchema.Enum.Private:
      return "private" as const;
    case InfoAccessSchema.Enum.Public:
      return "semantic.success" as const;
  }
};

const ZonesScreen = ({ navigation }: Props) => {
  const { data, refetch, isLoading, isFetching } = trpc.zones.all.useQuery();
  const refresh = useRefresh(refetch, isFetching);
  const dispatch = useAppDispatch();
  const onLogout = useCallback(() => {
    Alert.alert("Cerrar Sesión", "¿Seguro que quieres cerrar sesión?", [
      {
        text: "Si",
        onPress: () => dispatch(logoutAuth0()),
        style: "destructive",
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  }, [dispatch]);

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );
  return (
    <Screen padding="m" safeAreaDisabled>
      <Text variant="h2">Zonas</Text>
      <FlatList
        data={data}
        refreshControl={refresh}
        renderItem={({ item }) => (
          <ListItem
            marginVertical={"s"}
            onPress={() =>
              navigation.navigate(ClimbsNavigationRoutes.Zone, {
                zoneId: item.id,
                zoneName: item.name,
              })
            }
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
            backgroundColor="primary"
          >
            <Text variant="p1R">{item.name}</Text>
            <Box
              width={15}
              height={15}
              backgroundColor={InfoAccessColor(item.infoAccess)}
              borderRadius={10}
            />
          </ListItem>
        )}
      />
      <SemanticButton
        title="Cerrar sesión"
        variant="info"
        marginBottom="l"
        onPress={onLogout}
      />
    </Screen>
  );
};

export default ZonesScreen;
