import { StatusSchema } from "@andescalada/db/zod";
import { ListItem, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = UserNavigationScreenProps<UserNavigationRoutes.ZoneReviewManager>;

const ZoneReviewManagerScreen: FC<Props> = (props) => {
  const zonesToReview = trpc.zones.currentStatus.useQuery({
    status: StatusSchema.Enum.InReview,
  });
  return (
    <Screen padding="m" safeAreaDisabled>
      <FlatList
        data={zonesToReview.data}
        renderItem={({ item }) => (
          <ListItem marginBottom="m">
            <Text variant="p1R">{item.name}</Text>
            <Text>
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
