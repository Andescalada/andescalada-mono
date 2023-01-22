import { Screen, Text } from "@andescalada/ui";
import {
  InfoAccessManagerRoutes,
  InfoAccessManagerScreenProps,
} from "@features/InfoAccessManager/Navigation/types";
import { FC } from "react";

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.InviteUserToZoneScreen>;

const InviteUserToZoneScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text></Text>
    </Screen>
  );
};

export default InviteUserToZoneScreen;
