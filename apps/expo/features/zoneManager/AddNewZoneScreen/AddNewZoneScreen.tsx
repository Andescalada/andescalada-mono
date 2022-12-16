import zone from "@andescalada/api/schemas/zone";
import { InfoAccessSchema } from "@andescalada/db/zod";
import {
  Box,
  Button,
  KeyboardDismiss,
  Screen,
  Text,
  TextInput,
} from "@andescalada/ui";
import {
  ZoneManagerRoutes,
  ZoneManagerScreenProps,
} from "@features/zoneManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useZodForm from "@hooks/useZodForm";
import { Picker } from "@react-native-picker/picker";
import infoAccess from "@utils/infoAccess";
import { FC } from "react";
import { useController } from "react-hook-form";
import { Platform } from "react-native";

const { schema } = zone;

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.AddNewZoneScreen>;

const AddNewZoneScreen: FC<Props> = (props) => {
  const { control, ...form } = useZodForm({ schema, mode: "onChange" });

  const theme = useAppTheme();

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
            <Picker
              onValueChange={access.field.onChange}
              selectedValue={access.field.value}
              style={{
                backgroundColor:
                  Platform.OS === "android"
                    ? theme.colors.filledTextInputVariantBackground
                    : undefined,
                borderRadius: Platform.OS === "android" ? 10 : undefined,
                overflow: Platform.OS === "android" ? "hidden" : undefined,
              }}
              itemStyle={{ fontFamily: "Rubik-400", color: "red" }}
            >
              <Picker.Item
                color={theme.colors["filledTextInputVariantPlaceholder"]}
                fontFamily="Rubik-400"
                label={"Seleccionar privacidad"}
                value={null}
              />
              {InfoAccessSchema.options.map((access) => (
                <Picker.Item
                  key={access}
                  label={infoAccess(access).label}
                  value={access}
                  color={Platform.OS === "android" ? "black" : "white"}
                  fontFamily="Rubik-400"
                />
              ))}
            </Picker>
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
          />
        </Box>
      </KeyboardDismiss>
    </Screen>
  );
};

export default AddNewZoneScreen;
