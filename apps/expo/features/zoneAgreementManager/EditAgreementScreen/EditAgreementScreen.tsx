import { AgreementLevelSchema } from "@andescalada/db/zod";
import { IconNames } from "@andescalada/icons";
import {
  ActivityIndicator,
  Box,
  Button,
  Icon,
  ListItem,
  Screen,
  ScrollView,
  Text,
  TextFieldAccordion,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import AgreementLevelButtonGroup from "@features/zoneAgreementManager/components/AgreementLevelButtonGroup";
import {
  ZoneAgreementsRoutes,
  ZoneAgreementsScreenProps,
} from "@features/zoneAgreementManager/Navigation/types";
import { FC, useEffect, useState } from "react";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.EditAgreement>;

const EditAgreementScreen: FC<Props> = ({
  route: {
    params: { zoneAgreementId, zoneId },
  },
}) => {
  const [newComment, setNewComment] = useState("");
  const [level, setLevel] = useState<typeof AgreementLevelSchema._type>();

  const { data, isLoading } = trpc.zoneAgreements.byId.useQuery({
    zoneAgreementId,
  });

  useEffect(() => {
    setNewComment(data?.comment?.originalText ?? "");
    setLevel(data?.level ?? undefined);
  }, [data?.comment?.originalText, data?.level]);

  if (isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );

  if (data)
    return (
      <Screen safeAreaDisabled padding="m">
        <ScrollView showsVerticalScrollIndicator={false}>
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
          <AgreementLevelButtonGroup
            level={level}
            setLevel={setLevel}
            marginTop="m"
          />
          <TextFieldAccordion
            label="Mensaje"
            defaultOpen
            hideToggle
            value={newComment}
            onChangeText={setNewComment}
            marginVertical="m"
          />
          <Button variant="info" title="Editar" marginBottom="xxl" />
        </ScrollView>
      </Screen>
    );
  return <Box />;
};

export default EditAgreementScreen;
