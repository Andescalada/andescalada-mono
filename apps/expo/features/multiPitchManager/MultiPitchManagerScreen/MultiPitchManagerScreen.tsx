import { Screen, Text } from "@andescalada/ui";
import {
  MultiPitchManagerRoutes,
  MultiPitchManagerScreenProps,
} from "@features/multiPitchManager/Navigation/types";
import { FC } from "react";

type Props =
  MultiPitchManagerScreenProps<MultiPitchManagerRoutes.MultiPitchManager>;

const MultiPitchManagerScreen: FC<Props> = ({
  route: {
    params: { multiPitchName },
  },
}) => {
  return (
    <Screen safeAreaDisabled>
      <Text>{multiPitchName}</Text>
    </Screen>
  );
};

export default MultiPitchManagerScreen;
