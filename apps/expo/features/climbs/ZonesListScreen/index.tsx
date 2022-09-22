import {
  ActivityIndicator,
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
import React from "react";
import { FlatList } from "react-native";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZonesList>;

const ZonesScreen = ({ navigation }: Props) => {
  const { data, refetch, isLoading, isFetching } = trpc.zones.all.useQuery();
  const refresh = useRefresh(refetch, isFetching);
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logoutAuth0());
  };
  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );
  return (
    <Screen padding="m">
      <Text variant="h1">Zonas</Text>
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
          >
            <Text variant="p1R">{item.name}</Text>
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
