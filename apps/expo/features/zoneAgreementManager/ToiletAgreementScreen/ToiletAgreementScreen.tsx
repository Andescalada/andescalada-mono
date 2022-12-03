import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { Screen } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { ClimbsNavigationRoutes } from "@features/climbs/Navigation/types";
import ClassicAgreementCardList from "@features/zoneAgreementManager/components/ClassicAgreementCardList";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.ToiletAgreement>;

const PetsAgreementScreen: FC<Props> = ({
  route: {
    params: { zoneId },
  },
}) => {
  const [selected, setSelected] = useState<string>();

  const rootNavigation = useRootNavigation();

  const zone = trpc.useContext().zones.allSectors.getData({ zoneId });

  return (
    <Screen safeAreaDisabled>
      <ClassicAgreementContainer
        zoneId={zoneId}
        title="Sobre donde ir al baño:"
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={() => {
          if (zone)
            rootNavigation.navigate(RootNavigationRoutes.Climbs, {
              screen: ClimbsNavigationRoutes.ZoneAgreementsEditor,
              params: { zoneId, zoneName: zone.name },
            });
        }}
        classic={ClassicAgreementSchema.Enum.Toilet}
        submitLabel="Terminar"
      >
        <ClassicAgreementCardList
          classic={ClassicAgreementSchema.Enum.Toilet}
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
