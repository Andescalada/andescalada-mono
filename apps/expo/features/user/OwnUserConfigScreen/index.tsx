import { Screen, Text } from "@andescalada/ui";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import { FC } from "react";

type Props = UserNavigationScreenProps<UserNavigationRoutes.OwnUserConfig>;

const OwnUserConfigScreen: FC<Props> = (props) => {
  return <Screen safeAreaDisabled></Screen>;
};

export default OwnUserConfigScreen;
