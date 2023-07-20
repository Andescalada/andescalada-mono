import { Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { FC } from "react";

type Props = PhotoContestScreenProps<PhotoContestRoutes.PhotosFeed>;

const PhotosFeedScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text></Text>
    </Screen>
  );
};

export default PhotosFeedScreen;
