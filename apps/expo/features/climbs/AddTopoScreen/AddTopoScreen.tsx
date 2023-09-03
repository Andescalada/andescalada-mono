import { Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { FC } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.AddTopo>;

const AddTopoScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Add topo</Text>
    </Screen>
  );
};

export default AddTopoScreen;
