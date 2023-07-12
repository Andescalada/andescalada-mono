import { Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { FC } from "react";

type Props = PhotoContestScreenProps<PhotoContestRoutes.Share>;

const ShareScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Share</Text>
    </Screen>
  );
};

export default ShareScreen;
