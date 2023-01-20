import { Screen, Text } from "@andescalada/ui";
import {
  InfoAccessManagerRoutes,
  InfoAccessManagerScreenProps,
} from "@features/InfoAccessManager/Navigation/types";
import { FC } from "react";

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.MembersScreen>;

const MembersScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Miembros</Text>
    </Screen>
  );
};

export default MembersScreen;
