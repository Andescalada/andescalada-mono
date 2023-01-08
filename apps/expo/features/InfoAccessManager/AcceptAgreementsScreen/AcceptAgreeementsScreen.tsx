import { Screen, Text } from "@andescalada/ui";
import {
  InfoAccessManagerRoutes,
  InfoAccessManagerScreenProps,
} from "@features/InfoAccessManager/Navigation/types";
import { FC } from "react";

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.AcceptAgreements>;

const AcceptAgreementsScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>hola</Text>
    </Screen>
  );
};

export default AcceptAgreementsScreen;
