import { ActivityIndicator, Box, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/InfoAccessManager/MembersScreen/UserItem";
import useRefresh from "@hooks/useRefresh";
import { Zone } from "@prisma/client";
import { FC } from "react";
import { FlatList } from "react-native";

interface Props {
  zoneId: Zone["id"];
}

const MembersList: FC<Props> = ({ zoneId }) => {
  const { data, isLoading, refetch, isFetching } =
    trpc.zones.usersByRole.useQuery({
      roles: ["Member"],
      zoneId,
    });

  const refresh = useRefresh(refetch, isFetching && !isLoading);

  const members = data?.find((member) => member.role === "Member");
  if (isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  return (
    <Box flex={1}>
      <FlatList
        data={members?.users}
        keyExtractor={(item) => item.id}
        refreshControl={refresh}
        ListEmptyComponent={() => (
          <Box alignItems="center" marginTop="xxxl">
            <Text variant="p3R">No se encontraron miembros</Text>
          </Box>
        )}
        renderItem={({ item }) => <UserItem item={item} />}
      />
    </Box>
  );
};

export default MembersList;
