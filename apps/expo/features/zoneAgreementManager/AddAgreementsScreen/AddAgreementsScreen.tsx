import { notNull } from "@andescalada/api/src/utils/filterGuards";
import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useMemo } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.AddAgreements>;

const AddAgreementsScreen: FC<Props> = ({
  route: {
    params: { zoneId },
  },
}) => {
  const agreements = trpc.zones.agreementsList.useQuery({ zoneId });

  const existingClassicAgreements = useMemo(
    () =>
      agreements.data?.map((a) => a.Agreement.classic).filter(notNull) ?? [],
    [agreements.data],
  );

  const missingClassicAgreements = useMemo(
    () =>
      ClassicAgreementSchema.options.filter(
        (c) => !existingClassicAgreements.includes(c),
      ),
    [existingClassicAgreements],
  );

  console.log({ existingClassicAgreements, missingClassicAgreements });

  return (
    <Screen>
      <Text></Text>
    </Screen>
  );
};

export default AddAgreementsScreen;
