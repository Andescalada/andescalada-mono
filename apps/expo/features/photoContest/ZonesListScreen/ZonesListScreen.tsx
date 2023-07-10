import { Box, Header, ListItem, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = PhotoContestScreenProps<PhotoContestRoutes.ZonesList>;

const ZoneListScreen: FC<Props> = ({ navigation }) => {
  const { data, isLoading } = trpc.photoContest.getCurrentContest.useQuery();

  const daysLeft = data
    ? (data?.ending?.getTime() - data?.starting?.getTime()) / (1000 * 3600 * 24)
    : 0;

  if (isLoading) return null;

  return (
    <Screen padding="m">
      <Header title="Concurso fotográfico" showOptions={false} />
      <Box flexDirection="row" alignItems="flex-end" gap="xs">
        <Text variant="p1R">Quedan</Text>
        <Box
          bg="contrast.bright.red"
          height={30}
          width={30}
          borderRadius={4}
          justifyContent="center"
          alignItems="center"
        >
          <Text variant="p1R">{daysLeft.toFixed(0)}</Text>
        </Box>
        <Text variant="p1R">días</Text>
      </Box>

      <Box flex={1}>
        <FlatList
          data={data?.Zones}
          renderItem={({ item }) => (
            <ListItem
              variant="fill"
              marginVertical="s"
              onPress={() => {
                navigation.navigate(PhotoContestRoutes.Zone, {
                  zoneId: item.id,
                  zoneName: item.name,
                });
              }}
            >
              <Text variant="p2R">{item.name}</Text>
            </ListItem>
          )}
        />
      </Box>
    </Screen>
  );
};

export default ZoneListScreen;
