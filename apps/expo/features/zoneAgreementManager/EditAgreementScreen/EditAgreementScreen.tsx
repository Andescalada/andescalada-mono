import { IconNames } from "@andescalada/icons";
import {
  Box,
  Icon,
  ListItem,
  Screen,
  Text,
  TextFieldAccordion,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import ClassicAgreementCard from "@features/zoneAgreementManager/components/ClassicAgreementCard";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.EditAgreement>;

const EditAgreementScreen: FC<Props> = ({
  route: {
    params: { zoneAgreementId, zoneId },
  },
}) => {
  const [newComment, setNewComment] = useState("");

  const { data } = trpc.zoneAgreements.byId.useQuery(
    {
      zoneAgreementId,
    },
    {
      onSuccess: (data) => {
        setNewComment(data?.comment?.originalText ?? "");
      },
    },
  );

  const { Agreement, comment } = data || {};

  console.log({ Agreement, comment });

  if (!data) return <Box />;

  return (
    <Screen safeAreaDisabled padding="m">
      <ListItem
        variant="plain"
        backgroundColor="backgroundContrast"
        flexDirection="row"
        alignItems="center"
      >
        <Icon name={`${data.Agreement.icon}-color` as IconNames} />
        <Box marginLeft="m" alignItems="flex-start">
          <Text variant="h4" color="textContrast">
            {data.Agreement.title.originalText}
          </Text>
          <Box paddingRight="l">
            <Text variant="p3R" color="textContrast">
              {data.Agreement.description.originalText}
            </Text>
          </Box>
        </Box>
      </ListItem>
      <TextFieldAccordion
        label="Mensaje"
        defaultOpen
        hideToggle
        value={newComment}
        onChangeText={setNewComment}
        marginTop="m"
      />
    </Screen>
  );
};

export default EditAgreementScreen;
