import { Screen, Text } from "@andescalada/ui";
import ClassicAgreementCard from "@features/zoneAgreementManager/components/ClassicAgreementCard";
import ClassicAgreementContainer from "@features/zoneAgreementManager/components/ClassicAgreementContainer";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.FireAgreement>;

const PetsAgreementScreen: FC<Props> = (props) => {
  const [selected, setSelected] = useState<string>();
  return (
    <Screen safeAreaDisabled padding="m">
      <Text variant="h2">Sobre hacer fuego:</Text>
      <ClassicAgreementContainer
        value={selected}
        onChange={(v) => setSelected(v as string)}
        onSubmit={(id) => console.log(id)}
      >
        <ClassicAgreementCard
          id="2"
          title="No se hacer fuego"
          subTitle="No esta permitido hacer fuego en esta zona de escalada."
          iconName="no-fire"
          marginBottom="xl"
        />
        <ClassicAgreementCard
          id="1"
          title="Permitido hacer fuego"
          subTitle="Está permitido hacer fuego, recuerda dejarlo bien apagado."
          iconName="fire"
          marginBottom="xl"
        />
      </ClassicAgreementContainer>
    </Screen>
  );
};

export default PetsAgreementScreen;
