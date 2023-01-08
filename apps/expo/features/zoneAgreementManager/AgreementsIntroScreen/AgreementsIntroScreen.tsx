import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import AgreementsIntro from "@templates/AgreementsIntro";
import { FC } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.AgreementsIntro>;

const AgreementsIntroScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  trpc.agreements.classic.useQuery({
    classic: ClassicAgreementSchema.enum.Pets,
  });

  return (
    <Screen backgroundColor="brand.primaryA">
      <AgreementsIntro
        onContinue={() =>
          navigation.navigate(ZoneAgreementsRoutes.PetsAgreement, {
            zoneId,
          })
        }
      />
    </Screen>
  );
};

export default AgreementsIntroScreen;
