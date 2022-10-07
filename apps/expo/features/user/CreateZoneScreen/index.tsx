import zone from "@andescalada/api/schemas/zone";
import {
  Box,
  BoxWithKeyboard,
  Button,
  Pressable,
  Screen,
  SemanticButton,
  Text,
  TextInput,
} from "@andescalada/ui";
import { pallete } from "@andescalada/ui/Theme/pallete";
import { trpc } from "@andescalada/utils/trpc";
import FindUser from "@features/user/FindUser";
import {
  UserNavigationRoutes,
  UserNavigationScreenProps,
} from "@features/user/Navigation/types";
import BottomSheet from "@gorhom/bottom-sheet";
import useZodForm from "@hooks/useZodForm";
import { FC, useMemo, useRef } from "react";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";

type Props = UserNavigationScreenProps<UserNavigationRoutes.CreateZone>;

const CreateZoneScreen: FC<Props> = (props) => {
  const { handleSubmit, control } = useZodForm({
    schema: zone.schema,
  });
  const utils = trpc.useContext();
  const { mutate, isLoading } = trpc.zones.add.useMutation({
    onSuccess: () => {
      utils.zones.all.invalidate();
    },
  });

  const {
    field: { onChange },
    fieldState: { error, isDirty },
  } = useController({
    control,
    name: "name",
  });

  const onSubmit = handleSubmit((input) => {
    mutate({ name: input.name });
  });
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["1%", "100%"], []);
  return (
    <Screen safeAreaDisabled padding="m">
      <BoxWithKeyboard>
        <Box marginVertical={"ll"}>
          <Text variant="h3">Crea una nueva zona pública de escalada</Text>
        </Box>
        <Box marginTop="m">
          <Text variant="p1R" marginBottom="s">
            Nombre de la zona
          </Text>
          <TextInput onChangeText={onChange} containerProps={{ height: 40 }} />
          <Text marginTop="xs" color="semantic.error">
            {error?.message}
          </Text>
        </Box>
        <Box
          borderColor="semantic.info"
          borderWidth={2}
          borderRadius={10}
          borderStyle={"dashed"}
          padding="s"
        >
          <Box marginTop="m">
            <Text variant="p1R" marginBottom="s">
              Agregar usuario a la zona
            </Text>
            <Pressable
              borderRadius={4}
              backgroundColor="filledTextInputVariantBackground"
              height={40}
              onPress={() => {
                bottomSheetRef.current?.expand();
              }}
            />
            <Text marginTop="xs" color="semantic.error">
              {error?.message}
            </Text>
          </Box>
          <Box marginTop="m">
            <Text variant="p1R" marginBottom="s">
              Asignar rol
            </Text>

            <Text marginTop="xs" color="semantic.error">
              {error?.message}
            </Text>
          </Box>
        </Box>

        <Button
          variant="primary"
          title="Agregar"
          onPress={onSubmit}
          isLoading={isLoading}
          marginVertical="m"
        />
      </BoxWithKeyboard>
      <FindUser ref={bottomSheetRef} />
    </Screen>
  );
};

export default CreateZoneScreen;
