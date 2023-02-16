import { Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  MultiPitchManagerRoutes,
  MultiPitchManagerScreenProps,
} from "@features/multiPitchManager/Navigation/types";
import { FC } from "react";

type Props =
  MultiPitchManagerScreenProps<MultiPitchManagerRoutes.MultiPitchManager>;

const MultiPitchManagerScreen: FC<Props> = ({
  route: {
    params: { multiPitchName, multiPitchId, zoneId },
  },
}) => {
  const { data } = trpc.multiPitch.byId.useQuery({ multiPitchId, zoneId });
  console.log(data);
  return (
    <Screen safeAreaDisabled padding="m">
      <Text variant="h1">{multiPitchName}</Text>
    </Screen>
  );
};

export default MultiPitchManagerScreen;
