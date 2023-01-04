import { StatusSchema } from "@andescalada/db/zod";
import {
  ActivityIndicator,
  Box,
  ListItem,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = UserNavigationScreenProps<UserNavigationRoutes.ZoneReviewManager>;

const ZoneReviewManagerScreen: FC<Props> = () => {
  const zonesToReview = trpc.zoneReview.currentStatus.useQuery({
    status: StatusSchema.Enum.InReview,
  });
  const rootNavigation = useRootNavigation();
  return (
    <Screen padding="m" safeAreaDisabled>
      <FlatList
        data={zonesToReview.data}
        ListEmptyComponent={() => (
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            marginTop="xxxl"
          >
            {zonesToReview.isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text>Sin zonas que revisar</Text>
            )}
          </Box>
        )}
        renderItem={({ item }) => (
          <ListItem
            marginBottom="m"
            onPress={() =>
              rootNavigation.navigate(RootNavigationRoutes.Climbs, {
                screen: ClimbsNavigationRoutes.Zone,
                params: { zoneId: item.id, zoneName: item.name },
              })
            }
          >
            <Text variant="p1R">{item.name}</Text>
            <Text marginTop="s">
              {`Enviada el ${item.status.createdAt.toLocaleDateString()} por @${
                item.status.modifiedBy.username
              }`}
            </Text>
          </ListItem>
        )}
      />
    </Screen>
  );
};

export default ZoneReviewManagerScreen;
