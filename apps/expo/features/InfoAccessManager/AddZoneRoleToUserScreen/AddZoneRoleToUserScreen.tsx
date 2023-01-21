import { Screen, Text } from "@andescalada/ui";
import {
  InfoAccessManagerRoutes,
  InfoAccessManagerScreenProps,
} from "@features/InfoAccessManager/Navigation/types";
import { FC } from "react";

type Props =
  InfoAccessManagerScreenProps<InfoAccessManagerRoutes.AddZoneRoleToUserScreen>;

const AddZoneRoleToUserScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Agregar rol</Text>
    </Screen>
  );
};

export default AddZoneRoleToUserScreen;
