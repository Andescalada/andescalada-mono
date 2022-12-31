import { InfoAccessSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  BackButton,
  Box,
  ListItem,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import useRefresh from "@hooks/useRefresh";
import { FlatList } from "react-native";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ZonesList>;

type InfoAccess = keyof typeof InfoAccessSchema.Enum;

const INFO_ACCESS_FLAG = false;

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

const ZonesListScreen = ({ navigation }: Props) => {
  const { data, refetch, isLoading, isFetching } =
    trpc.zones.all.useQuery(undefined);
  const refresh = useRefresh(refetch, isFetching && !isLoading);

  if (isLoading)
    return (
      <Screen justifyContent="center" alignItems="center">
        <ActivityIndicator size={"large"} />
      </Screen>
    );
  return (
    <Screen padding="m">
      <Box flexDirection="row" alignItems="center" marginBottom="s">
        <BackButton onPress={navigation.goBack} />
        <Text variant="h2" marginLeft="m">
          Todas las zonas
        </Text>
      </Box>
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
          >
            <Text variant="p1R">{item.name}</Text>
            {INFO_ACCESS_FLAG && (
              <Box
                width={15}
                height={15}
                backgroundColor={InfoAccessColor(item.infoAccess)}
                borderRadius={10}
              />
            )}
          </ListItem>
        )}
      />
    </Screen>
  );
};

export default ZonesListScreen;
