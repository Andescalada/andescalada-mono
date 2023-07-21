import { Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { FC } from "react";

type Props = PhotoContestScreenProps<PhotoContestRoutes.ShareContest>;

const ShareContestScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Hola</Text>
    </Screen>
  );
};

export default ShareContestScreen;
