import { Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { FC } from "react";

type Props = PhotoContestScreenProps<PhotoContestRoutes.Zone>;

const ZoneScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Zone screen</Text>
    </Screen>
  );
};

export default ZoneScreen;
