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

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.CampingAgreement>;

const PetsAgreementScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  const [selected, setSelected] = useState<string>();

  trpc.agreements.classic.useQuery({
    classic: ClassicAgreementSchema.enum.Fire,
  });

  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        zoneId={zoneId}
        title="Sobre acampar:"
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={() =>
          navigation.navigate(ZoneAgreementsRoutes.FireAgreement, { zoneId })
        }
        classic={ClassicAgreementSchema.Enum.Camping}
      >
        <ClassicAgreementCardList
          classic={ClassicAgreementSchema.Enum.Camping}
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
