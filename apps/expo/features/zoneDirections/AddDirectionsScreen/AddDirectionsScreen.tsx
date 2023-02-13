import { TransportationModeSchema } from "@andescalada/db/zod";
import {
  Box,
  Button,
  ButtonGroup,
  KeyboardAvoidingBox,
  KeyboardDismiss,
  Screen,
  Text,
  TextFieldAccordion,
  TextInput,
} from "@andescalada/ui";
import transportationModeAssets from "@andescalada/utils/transportationModesAssets";
import {
  ZoneDirectionsRoutes,
  ZoneDirectionsScreenProps,
} from "@features/zoneDirections/Navigation/types";
import { FC } from "react";

type Props = ZoneDirectionsScreenProps<ZoneDirectionsRoutes.AddDirections>;

const AddDirectionsScreen: FC<Props> = (props) => {
  return (
    <Screen safeAreaDisabled padding="m">
      <KeyboardAvoidingBox>
        <KeyboardDismiss>
          <Text variant="h4">Modo de transporte</Text>
          <ButtonGroup value="" onChange={(value) => console.log(value)}>
            <Box flexDirection="row" alignItems="stretch" flexWrap="wrap">
              {TransportationModeSchema.options.map((mode) => (
                <ButtonGroup.Item
                  key={mode}
                  label={transportationModeAssets[mode].label}
                  value={mode}
                />
              ))}
            </Box>
          </ButtonGroup>
          <Text variant="h4" marginTop="m">
            Descripción
          </Text>
          <TextInput
            containerProps={{ flex: 1, padding: "s" }}
            multiline
            textAlignVertical="top"
            value={""}
            onChangeText={() => console.log()}
          />
        </KeyboardDismiss>
      </KeyboardAvoidingBox>
      <Button variant="info" title="Continuar" marginVertical="l" />
    </Screen>
  );
};

export default AddDirectionsScreen;
