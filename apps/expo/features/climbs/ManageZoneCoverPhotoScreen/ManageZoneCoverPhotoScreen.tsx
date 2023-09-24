import { Screen, Text } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { FC } from "react";

type Props =
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.ManageZoneCoverPhotoScreen>;

const ManageZoneCoverPhotoScreen: FC<Props> = (props) => {
  return (
    <Screen>
      <Text>Photo</Text>
    </Screen>
  );
};

export default ManageZoneCoverPhotoScreen;
