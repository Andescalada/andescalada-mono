import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import ClassicAgreementCardList from "@features/zoneAgreementManager/components/ClassicAgreementCardList";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.PayAgreement>;

const PetsAgreementScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  const [selected, setSelected] = useState<string>();
  trpc.agreements.classic.useQuery({
    classic: ClassicAgreementSchema.enum.Toilet,
  });
  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        zoneId={zoneId}
        title="Sobre el acceso:"
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={() =>
          navigation.navigate(ZoneAgreementsRoutes.ToiletAgreement, { zoneId })
        }
        classic={ClassicAgreementSchema.Enum.Payment}
      >
        <ClassicAgreementCardList
          classic={ClassicAgreementSchema.Enum.Payment}
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
