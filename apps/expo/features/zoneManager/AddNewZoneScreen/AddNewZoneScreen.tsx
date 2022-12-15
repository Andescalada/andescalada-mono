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
import useZodForm from "@hooks/useZodForm";
import { Picker } from "@react-native-picker/picker";
import infoAccess from "@utils/infoAccess";
import { FC } from "react";
import { useController } from "react-hook-form";
import { Platform } from "react-native";
import { z } from "zod";

type Props = ZoneManagerScreenProps<ZoneManagerRoutes.AddNewZoneScreen>;

const schema = z.object({
  name: z.string().min(1).max(50),
  access: InfoAccessSchema,
});

const AddNewZoneScreen: FC<Props> = (props) => {
  const { control, ...form } = useZodForm({ schema, mode: "onChange" });

  const zoneName = useController({ control, name: "name" });
  const access = useController({ control, name: "access" });

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
          </Box>
          <Box>
            <Text variant="h3">Privacidad de la guía</Text>
            <Picker
              onValueChange={access.field.onChange}
              selectedValue={access.field.value}
            >
              <Picker.Item
                color="gray"
                fontFamily="Rubik-400"
                label={"Seleccionar privacidad"}
                value={null}
              />
              {Object.values(InfoAccessSchema.Enum).map((access) => (
                <Picker.Item
                  key={access}
                  label={infoAccess(access).label}
                  value={access}
                  color={Platform.OS === "android" ? "black" : "white"}
                  fontFamily="Rubik-400"
                />
              ))}
            </Picker>
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
