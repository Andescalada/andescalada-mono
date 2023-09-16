import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import {
  Box,
  Button,
  ButtonGroup,
  Header,
  Icon,
  Ionicons,
  Pressable,
  Screen,
  ScrollView,
  Text,
  TextInput,
} from "@andescalada/ui";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import SelectImage from "@features/components/SelectImage";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import { onSuccessPick } from "@hooks/usePickImage";
import { ComponentProps, FC, useCallback, useState } from "react";
import DatePicker from "react-native-date-picker";

import routeAlertKind from "../../../../../packages/common-assets/routeAlertKind";
import routeAlertSeverity from "../../../../../packages/common-assets/routeAlertSeverity";

type Props = AlertsScreenProps<AlertsRoutes.AddRouteAlert>;

const AddRouteAlertScreen: FC<Props> = ({ navigation }) => {
  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [date, setDate] = useState(new Date());
  const [withDueDate, setWithDueDate] = useState(false);
  const [open, setOpen] = useState(false);

  const [alertKind, setAlertKind] = useState<
    typeof RouteAlertKindSchema._type | undefined
  >();

  const [severity, setSeverity] = useState<
    typeof RouteAlertSeveritySchema._type | undefined
  >();

  const { uploadImage } = useCloudinaryImage();

  const pickImageHandler: onSuccessPick = useCallback(async (imageToUpload) => {
    setLoadingUpload(true);
    setImageToDisplay(imageToUpload.localUri);
    setTimeout(() => {
      setLoadingUpload(false);
    }, 2000);
  }, []);

  return (
    <Screen padding="m">
      <Header
        title="Agregar alerta"
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <ScrollView showsVerticalScrollIndicator={false} gap="m">
        <SelectImage
          image={imageToDisplay}
          isLoading={loadingUpload}
          onPickImage={pickImageHandler}
          onDeletePickedImage={() => setImageToDisplay(null)}
        />
        <Box width="100%" flex={1} gap="m">
          <TextInput
            placeholder="Titulo"
            containerProps={{ height: 50, paddingLeft: "s" }}
          />
          <TextInput
            multiline
            placeholder={`Escribe una descripción de la alerta`}
            textAlignVertical="top"
            containerProps={{ flex: 1, height: 200, padding: "s" }}
          />
          <Box flexDirection="row">
            <Pressable
              borderRadius={4}
              flex={1}
              backgroundColor="filledTextInputVariantBackground"
              height={40}
              onPress={() => {
                setOpen(true);
              }}
              alignItems="center"
              paddingLeft="s"
              flexDirection="row"
              overflow="hidden"
            >
              <Text variant="p1R" color="grayscale.600" paddingLeft="xs">
                {withDueDate
                  ? date.toLocaleDateString("es-CL", {})
                  : "Fecha de vigencia"}
              </Text>
            </Pressable>
            {withDueDate && (
              <Pressable
                padding="s"
                justifyContent={"center"}
                alignItems={"center"}
                onPress={() => setWithDueDate(false)}
              >
                <Ionicons name="trash-outline" size={24} />
              </Pressable>
            )}
          </Box>
        </Box>
        <Box marginTop="m">
          <Text variant="h4">Tipo de alerta</Text>
          <ButtonGroup
            value={alertKind}
            onChange={(v) =>
              setAlertKind(v as typeof RouteAlertKindSchema._type)
            }
          >
            <Box flexWrap="wrap" flexDirection="row" gap="m">
              {RouteAlertKindSchema.options.map((kind) => (
                <ButtonGroup.Item
                  label={routeAlertKind(kind).label}
                  value={kind}
                  key={kind}
                />
              ))}
            </Box>
          </ButtonGroup>
        </Box>
        <Box marginTop="m">
          <Text variant="h4">Gravedad</Text>
          <ButtonGroup
            value={severity}
            onChange={(v) =>
              setSeverity(v as typeof RouteAlertSeveritySchema._type)
            }
          >
            <Box flexWrap="wrap" flexDirection="row" gap="m">
              {RouteAlertSeveritySchema.options.map((kind) => (
                <ButtonGroup.Item
                  label={routeAlertSeverity(kind).label}
                  backgroundColor={routeAlertSeverity(kind).backgroundColor}
                  textColor={routeAlertSeverity(kind).color}
                  value={kind}
                  key={kind}
                />
              ))}
            </Box>
          </ButtonGroup>
        </Box>
      </ScrollView>
      <DatePicker
        modal
        mode="date"
        locale="es-CL"
        confirmText="Confirmar"
        cancelText="Cancelar"
        open={open}
        minimumDate={new Date()}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setWithDueDate(true);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Button
        variant="info"
        title="Enviar"
        padding="m"
        marginBottom="l"
        marginTop="m"
      />
    </Screen>
  );
};

export default AddRouteAlertScreen;
