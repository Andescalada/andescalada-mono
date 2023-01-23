import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import ClassicAgreementCardList from "@features/zoneAgreementManager/components/ClassicAgreementCardList";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.FireAgreement>;

const FireAgreementScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  trpc.agreements.classic.useQuery({
    classic: ClassicAgreementSchema.enum.Payment,
  });

  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        zoneId={zoneId}
        title="Sobre hacer fuego:"
        onSubmit={() =>
          navigation.navigate(ZoneAgreementsRoutes.PayAgreement, { zoneId })
        }
        classic={ClassicAgreementSchema.Enum.Fire}
      >
        <ClassicAgreementCardList classic={ClassicAgreementSchema.Enum.Fire} />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default FireAgreementScreen;
