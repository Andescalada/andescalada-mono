import { Box, Header, Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import ZoneItem from "@features/photoContest/components/ZoneItem";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = PhotoContestScreenProps<PhotoContestRoutes.Zone>;

const ZoneScreen: FC<Props> = ({
  route: {
    params: { zoneId, zoneName },
  },
  navigation,
}) => {
  const { data, isLoading } = trpc.photoContest.getZone.useQuery({ zoneId });

  if (isLoading) return null;

  return (
    <Screen padding="m">
      <Header
        title={zoneName}
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <Box flex={1} marginTop="s">
        <FlatList
          data={data?.sectors}
          renderItem={({ item }) => <ZoneItem item={item} />}
        />
      </Box>
    </Screen>
  );
};

export default ZoneScreen;
