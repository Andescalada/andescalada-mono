import schema from "@andescalada/api/schemas/agreements";
import useZodForm from "@andescalada/hooks/useZodForm";
import { IconNames } from "@andescalada/icons/NativeIcons";
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
import { FC, useEffect } from "react";
import { useController } from "react-hook-form";

type Props = ZoneAgreementsScreenProps<ZoneAgreementsRoutes.EditAgreement>;

const EditAgreementScreen: FC<Props> = ({
  route: {
    params: { zoneAgreementId, zoneId },
  },
  navigation,
}) => {
  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
  } = useZodForm({
    schema: schema.data,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const { data, isLoading } = trpc.agreements.byId.useQuery({
    zoneAgreementId,
  });

  const utils = trpc.useContext();

  const edit = trpc.agreements.edit.useMutation({
    onSuccess: () => {
      utils.agreements.listByZone.invalidate({ zoneId });
      navigation.goBack();
    },
  });

  const {
    field: { value: level, onChange: setLevel },
    fieldState: { error: levelError },
  } = useController({
    control,
    name: "level",
  });
  const {
    field: { value: newComment, onChange: setNewComment },
    fieldState: { error: commentError },
  } = useController({
    control,
    name: "comment",
  });

  useEffect(() => {
    setNewComment(data?.comment?.originalText ?? "");
    setLevel(data?.level ?? undefined);
  }, [data?.comment?.originalText, data?.level, setLevel, setNewComment]);

  const handleEdit = handleSubmit((data) => {
    const { level, comment } = data;
    edit.mutate({ zoneId, zoneAgreementId, level, comment });
  });

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
          <Text variant="error" color="semantic.error">
            {levelError?.message}
          </Text>
          <TextFieldAccordion
            label="Mensaje"
            defaultOpen
            hideToggle
            value={newComment || ""}
            onChangeText={setNewComment}
            marginVertical="m"
          />
          <Text variant="error" color="semantic.error">
            {commentError?.message}
          </Text>
          <Button
            variant={!isValid && isDirty ? "transparent" : "info"}
            title="Editar"
            isLoading={edit.isLoading}
            onPress={handleEdit}
            marginBottom="xxl"
            disabled={!isValid && isDirty}
          />
        </ScrollView>
      </Screen>
    );
  return <Box />;
};

export default EditAgreementScreen;
