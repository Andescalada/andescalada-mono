import { Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { FC } from "react";

type Props = PhotoContestScreenProps<PhotoContestRoutes.RouteList>;

const RouteListScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>RouteScreen</Text>
    </Screen>
  );
};

export default RouteListScreen;
