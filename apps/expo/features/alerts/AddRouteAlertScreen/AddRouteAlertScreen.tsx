import {
  RouteAlertKindSchema,
  RouteAlertSeveritySchema,
} from "@andescalada/db/zod";
import {
  Box,
  ButtonGroup,
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

import routeAlertKind from "../../../../../packages/common-assets/routeAlertKind";
import routeAlertSeverity from "../../../../../packages/common-assets/routeAlertSeverity";

type Props = AlertsScreenProps<AlertsRoutes.AddRouteAlert>;

const AddRouteAlertScreen: FC<Props> = (props) => {
  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);

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
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} padding="m">
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
        </Box>
        <ButtonGroup
          value={alertKind}
          onChange={(v) => setAlertKind(v as typeof RouteAlertKindSchema._type)}
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
      </ScrollView>
    </Screen>
  );
};

export default AddRouteAlertScreen;
