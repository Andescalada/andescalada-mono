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

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.PetsAgreement>;

const PetsAgreementScreen: FC<Props> = ({
  navigation,
  route: {
    params: { zoneId },
  },
}) => {
  const [selected, setSelected] = useState<string>();

  trpc.agreements.classic.useQuery({
    classic: ClassicAgreementSchema.enum.Camping,
  });

  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        title="Sobre mascotas:"
        value={selected}
        zoneId={zoneId}
        onChange={(v) => setSelected(v as string)}
        onSubmit={() => {
          navigation.navigate(ZoneAgreementsRoutes.CampingAgreement, {
            zoneId,
          });
        }}
        classic={ClassicAgreementSchema.Enum.Pets}
      >
        <ClassicAgreementCardList classic={ClassicAgreementSchema.Enum.Pets} />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
