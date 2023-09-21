import routeAlertKind from "@andescalada/common-assets/routeAlertKind";
import routeAlertSeverity from "@andescalada/common-assets/routeAlertSeverity";
import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import useZodForm from "@andescalada/hooks/useZodForm";
import {
  Box,
  Button,
  ButtonGroup,
  Header,
  Ionicons,
  Pressable,
  Screen,
  ScrollView,
  Text,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import FindRouteInAZone from "@features/components/FindRouteInAZone";
import SelectImage from "@features/components/SelectImage";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import useIsConnected from "@hooks/useIsConnected";
import useOwnInfo from "@hooks/useOwnInfo";
import { onSuccessPick } from "@hooks/usePickImage";
import useSetOrCreateRouteAlertMutation from "@local-database/hooks/useSetOrCreateRouteAlertMutation";
import { useNotifications } from "@utils/notificated";
import { FC, useCallback, useRef, useState } from "react";
import { useController } from "react-hook-form";
import { Alert } from "react-native";
import DatePicker from "react-native-date-picker";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  kind: RouteAlertKindSchema,
  severity: RouteAlertSeveritySchema,
  dueDate: z.date().optional(),
  route: z
    .object({ id: z.string(), name: z.string(), sectorName: z.string() })
    .optional(),
});

type Props = AlertsScreenProps<AlertsRoutes.AddRouteAlert>;

const AddRouteAlertScreen: FC<Props> = ({
  navigation,
  route: {
    params: { routeId, zoneId, routeName, sectorName },
  },
}) => {
  const form = useZodForm({ schema, mode: "onChange" });
  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const {
    field: { value: date, onChange: setDate },
  } = useController({
    control: form.control,
    name: "dueDate",
    defaultValue: new Date(),
  });

  const title = useController({ control: form.control, name: "title" });
  const description = useController({
    control: form.control,
    name: "description",
  });
  const {
    field: { value: alertKind, onChange: setAlertKind },
  } = useController({ control: form.control, name: "kind" });
  const {
    field: { value: severity, onChange: setSeverity },
  } = useController({ control: form.control, name: "severity" });

  const routeController = useController({
    control: form.control,
    name: "route",
    ...(routeId &&
      routeName &&
      sectorName && {
        defaultValue: { id: routeId, name: routeName, sectorName: sectorName },
      }),
  });

  const [withDueDate, setWithDueDate] = useState(false);
  const [open, setOpen] = useState(false);

  const { uploadImage } = useCloudinaryImage();

  const isConnected = useIsConnected();

  const mutateRemote = trpc.alerts.upsertRouteAlert.useMutation({ retry: 0 });

  const mutateLocal = useSetOrCreateRouteAlertMutation();

  const findRouteRef = useRef<BottomSheet>(null);

  const notification = useNotifications();

  const user = useOwnInfo();

  const submit = form.handleSubmit(
    async (values) => {
      if (!user?.data?.id || !values?.route?.id) return;
      if (isConnected) {
        mutateRemote.mutate({
          kind: values.kind,
          severity: values.severity,
          title: values.title,
          description: values.description,
          routeId: values.route.id,
          dueDate: values.dueDate,
          zoneId,
        });
        notification.notify("success", {
          params: {
            title: "Alerta creada",
            description: "La alerta se creó correctamente",
          },
        });
        return;
      }
      mutateLocal.mutate({
        userId: user?.data?.id,
        zoneId,
        kind: values.kind,
        severity: values.severity,
        title: values.title,
        description: values.description,
        routeId: values.route.id,
        dueDate: values.dueDate,
        routeName: values.route.name,
        sectorName: values.route.sectorName,
      });
      notification.notify("success", {
        params: {
          title: "Alerta guardada",
          description: "Cuando vuelvas a tener internet será compartida",
        },
      });
    },
    () => {
      Alert.alert("Faltan campos requeridos");
    },
  );

  const pickImageHandler: onSuccessPick = useCallback(async (imageToUpload) => {
    setLoadingUpload(true);
    setImageToDisplay(imageToUpload.localUri);
    setTimeout(() => {
      setLoadingUpload(false);
    }, 2000);
  }, []);

  return (
    <>
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
            selectText={`Seleccionar imagen \n (Opcional)`}
          />
          <Box width="100%" flex={1} gap="m">
            <Box>
              <Text variant="p1R">Ruta</Text>
              <Pressable
                borderRadius={4}
                disabled={!!routeId}
                flex={1}
                backgroundColor="filledTextInputVariantBackground"
                height={40}
                alignItems="center"
                paddingLeft="s"
                flexDirection="row"
                overflow="hidden"
                onPress={() => {
                  findRouteRef.current?.expand();
                }}
              >
                <Text
                  variant="p1R"
                  color={
                    routeController.field.value
                      ? "grayscale.black"
                      : "grayscale.600"
                  }
                  paddingLeft="xs"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {routeController.field.value
                    ? routeController.field.value.name
                    : "Seleccionar"}
                </Text>
              </Pressable>
            </Box>
            <Box>
              <Text variant="p1R">Título</Text>
              <TextInput
                value={title.field.value}
                onChangeText={title.field.onChange}
                onBlur={title.field.onBlur}
                placeholder="Ej: Nido de zorzal"
                containerProps={{ height: 50, paddingLeft: "s" }}
              />
            </Box>
            <Box>
              <Text variant="p1R">
                Descripción <Text variant="caption">Opcional</Text>
              </Text>
              <TextInput
                value={description.field.value}
                onChangeText={description.field.onChange}
                onBlur={description.field.onBlur}
                multiline
                placeholder={`Escribe una descripción de la alerta`}
                textAlignVertical="top"
                containerProps={{ flex: 1, height: 200, padding: "s" }}
              />
            </Box>
            <Box>
              <Text variant="p1R">
                Vigencia <Text variant="caption">Opcional</Text>
              </Text>

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
                      ? date?.toLocaleDateString("es-CL", {})
                      : "Seleccionar"}
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
          </Box>
          <Box marginTop="m">
            <Text variant="p1R">Tipo de alerta</Text>
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
            <Text variant="p1R">Gravedad</Text>
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
                    selectedBackgroundColor={
                      routeAlertSeverity(kind).backgroundColor
                    }
                    selectedTextColor={routeAlertSeverity(kind).color}
                    backgroundColor={
                      severity === undefined
                        ? routeAlertSeverity(kind).backgroundColor
                        : "grayscale.500"
                    }
                    textColor={
                      severity === undefined
                        ? routeAlertSeverity(kind).color
                        : "grayscale.white"
                    }
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
          date={date!}
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
          variant={form.formState.isValid ? "info" : "transparent"}
          title="Enviar"
          padding="m"
          marginBottom="l"
          marginTop="m"
          onPress={submit}
        />
        <FindRouteInAZone
          zoneId={zoneId}
          ref={findRouteRef}
          onSetRoute={(route) => {
            routeController.field.onChange(route);
          }}
        />
      </Screen>
    </>
  );
};

export default AddRouteAlertScreen;
