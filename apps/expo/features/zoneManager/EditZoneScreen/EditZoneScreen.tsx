import zone from "@andescalada/api/schemas/zone";
import infoAccessAssets from "@andescalada/common-assets/infoAccessAssets";
import { InfoAccessSchema, SearchVisibilitySchema } from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  Box,
  Button,
  ButtonGroup,
  KeyboardDismiss,
  Screen,
  ScrollView,
  Text,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import searchVisibilityAssets from "@utils/searchVisibilityAssets";
import { FC } from "react";
import { useController } from "react-hook-form";

const { schema } = zone;

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.EditZone>;

const EditZoneScreen: FC<Props> = ({ navigation, route: { params } }) => {
  const { control, ...form } = useZodForm({
    schema,
    mode: "onChange",
    defaultValues: {
      name: params?.zoneName,
      infoAccess: params?.infoAccess,
      searchVisibility: params?.searchVisibility,
    },
  });

  const zoneName = useController({ control, name: "name" });
  const access = useController({ control, name: "infoAccess" });
  const visibility = useController({ control, name: "searchVisibility" });

  const utils = trpc.useContext();
  const editZone = trpc.zones.edit.useMutation({
    onSuccess: ({}) => {
      utils.zones.invalidate();
      utils.sectors.invalidate();
      utils.walls.invalidate();
      utils.topos.invalidate();
      navigation.goBack();
    },
  });

  const handleContinue = form.handleSubmit((data) => {
    editZone.mutate({ zoneId: params.zoneId, ...data });
  });

  return (
    <Screen padding="m" safeAreaDisabled>
      <ScrollView>
        <KeyboardDismiss justifyContent="space-between">
          <Box>
            <Box marginBottom="m">
              <Text variant="h3">Nombre de la zona</Text>
              <TextInput
                containerProps={{ height: 40, paddingLeft: "s" }}
                placeholder="Ingresa el nombre de la zona"
                onChangeText={zoneName.field.onChange}
                onBlur={zoneName.field.onBlur}
                value={zoneName.field.value}
              />
              <Text marginTop="xs" color="semantic.error">
                {zoneName.fieldState.error?.message}
              </Text>
            </Box>
            <Box>
              <Text variant="h3">Privacidad de la guía</Text>
              <ButtonGroup
                onChange={access.field.onChange}
                value={access.field.value}
                allowUndefined
              >
                <Box flexDirection="row">
                  {InfoAccessSchema.options.map((access) => (
                    <ButtonGroup.Item
                      key={access}
                      label={infoAccessAssets[access].label}
                      value={access}
                      justifyContent="center"
                      alignItems="center"
                      textColor={({ hasSelection, isSelected }) =>
                        hasSelection && !isSelected
                          ? undefined
                          : infoAccessAssets[access].color
                      }
                      selectedTextColor={infoAccessAssets[access].color}
                      textProps={{
                        textAlign: "center",
                      }}
                      backgroundColor={({ hasSelection, isSelected }) =>
                        hasSelection && !isSelected
                          ? "grayscale.600"
                          : infoAccessAssets[access].backgroundColor
                      }
                      selectedBackgroundColor={
                        infoAccessAssets[access].backgroundColor
                      }
                    />
                  ))}
                </Box>
              </ButtonGroup>
              <Text marginTop="xs" color="semantic.error">
                {access.fieldState.error?.message}
              </Text>
              {access.field.value && (
                <>
                  <Text variant="h4">
                    {infoAccessAssets[access.field.value].descriptionTitle}
                  </Text>
                  <Text variant="p2R">
                    <Text variant="p2B">- Acceso: </Text>
                    {infoAccessAssets[access.field.value].accessDescription}
                  </Text>
                  <Text variant="p2R">
                    <Text variant="p2B">- Edición: </Text>
                    {infoAccessAssets[access.field.value].editionDescription}
                  </Text>
                </>
              )}
            </Box>
            <Box>
              <Text variant="h3">Visibilidad</Text>
              <Text></Text>
              <ButtonGroup
                onChange={visibility.field.onChange}
                value={visibility.field.value}
              >
                <Box flexDirection="row">
                  {SearchVisibilitySchema.options.map((access) => (
                    <ButtonGroup.Item
                      key={access}
                      label={searchVisibilityAssets[access].label}
                      value={access}
                      justifyContent="center"
                      alignItems="center"
                      textProps={{
                        textAlign: "center",
                      }}
                    />
                  ))}
                </Box>
              </ButtonGroup>
              <Text marginTop="xs" color="semantic.error">
                {visibility.fieldState.error?.message}
              </Text>
              {visibility.field.value && (
                <>
                  <Text variant="p2R">
                    {searchVisibilityAssets[visibility.field.value].description}
                  </Text>
                </>
              )}
            </Box>
          </Box>
          <Box padding="m" paddingHorizontal="xxl">
            <Button
              variant={form.formState.isValid ? "success" : "transparent"}
              title="Continuar"
              disabled={!form.formState.isValid}
              onPress={handleContinue}
              isLoading={editZone.isLoading}
            />
          </Box>
        </KeyboardDismiss>
      </ScrollView>
    </Screen>
  );
};

export default EditZoneScreen;
