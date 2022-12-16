import zone from "@andescalada/api/schemas/zone";
import { InfoAccessSchema } from "@andescalada/db/zod";
import {
  Box,
  Button,
  ButtonGroup,
  KeyboardDismiss,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import useZodForm from "@hooks/useZodForm";
import infoAccess from "@utils/infoAccess";
import { FC } from "react";
import { useController } from "react-hook-form";

const { schema } = zone;

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.AddNewZoneScreen>;

const AddNewZoneScreen: FC<Props> = ({ navigation }) => {
  const { control, ...form } = useZodForm({ schema, mode: "onChange" });

  const zoneName = useController({ control, name: "name" });
  const access = useController({ control, name: "infoAccess" });

  return (
    <Screen padding="m" safeAreaDisabled>
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
                    label={infoAccess(access).label}
                    value={access}
                    justifyContent="center"
                    alignItems="center"
                    textColor={({ hasSelection, isSelected }) =>
                      hasSelection && !isSelected
                        ? undefined
                        : infoAccess(access).color
                    }
                    selectedTextColor={infoAccess(access).color}
                    textProps={{
                      textAlign: "center",
                    }}
                    backgroundColor={({ hasSelection, isSelected }) =>
                      hasSelection && !isSelected
                        ? "grayscale.600"
                        : infoAccess(access).backgroundColor
                    }
                    selectedBackgroundColor={infoAccess(access).backgroundColor}
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
                  {infoAccess(access.field.value).descriptionTitle}
                </Text>
                <Text variant="p2R">
                  <Text variant="p2B">- Acceso: </Text>
                  {infoAccess(access.field.value).accessDescription}
                </Text>
                <Text variant="p2R">
                  <Text variant="p2B">- Edición: </Text>
                  {infoAccess(access.field.value).editionDescription}
                </Text>
              </>
            )}
          </Box>
        </Box>
        <Box padding="m" paddingHorizontal="xxl">
          <Button
            variant={form.formState.isValid ? "success" : "transparent"}
            title="Continuar"
            onPress={() =>
              navigation.navigate(ZoneManagerRoutes.SelectZoneLocationScreen)
            }
          />
        </Box>
      </KeyboardDismiss>
    </Screen>
  );
};

export default AddNewZoneScreen;
