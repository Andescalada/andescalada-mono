import { ClassicAgreementSchema } from "@andescalada/db/zod";
import { IconNames } from "@andescalada/icons";
import { trpc } from "@andescalada/utils/trpc";
import ClassicAgreementCard from "@features/zoneAgreementManager/components/ClassicAgreementCard";
import { FC } from "react";

interface Props {
  classic: typeof ClassicAgreementSchema._type;
}

const ClassicAgreementCardList: FC<Props> = ({ classic }) => {
  const agreements = trpc.agreements.classic.useQuery({
    classic,
  });
  if (!agreements.data) return null;
  return (
    <>
      {agreements.data.map((agreement) => (
        <ClassicAgreementCard
          key={agreement.id}
          id={agreement.id}
          title={agreement.title.originalText}
          subTitle={agreement.description.originalText}
          iconName={(agreement?.icon || "dog") as IconNames}
          marginBottom="xl"
        />
      ))}
    </>
  );
};

export default ClassicAgreementCardList;
