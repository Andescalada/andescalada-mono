import { Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { FC } from "react";

type Props = PhotoContestScreenProps<PhotoContestRoutes.ZonesList>;

const ZoneListScreen: FC<Props> = () => {
  return (
    <Screen>
      <Text>Zones</Text>
    </Screen>
  );
};

export default ZoneListScreen;
