import { ActivityIndicator, Box, Button } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/InfoAccessManager/MembersScreen/UserItem";
import useRefresh from "@hooks/useRefresh";
import { Zone } from "@prisma/client";
import { FC } from "react";
import { FlatList } from "react-native";

interface Props {
  zoneId: Zone["id"];
}

const AccessRequestList: FC<Props> = ({ zoneId }) => {
  const { data, isLoading, refetch, isFetching } =
    trpc.zoneAccess.usersRequestingAccessToZone.useQuery({ zoneId });

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  if (isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  return (
    <Box>
      <FlatList
        data={data}
        keyExtractor={(item) => item.User.id}
        refreshControl={refresh}
        renderItem={({ item }) => (
          <UserItem item={item.User}>
            <Button
              title="Agregar"
              variant="primary"
              titleVariant="p3B"
              marginRight="s"
            />
          </UserItem>
        )}
      />
    </Box>
  );
};

export default AccessRequestList;
