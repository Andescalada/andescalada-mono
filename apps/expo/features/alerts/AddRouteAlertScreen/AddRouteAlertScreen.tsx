import { RouteAlertKindSchema } from "@andescalada/db/zod";
import { Box, ButtonGroup, Screen, Text } from "@andescalada/ui";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import SelectImage from "@features/components/SelectImage";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import { onSuccessPick } from "@hooks/usePickImage";
import { ComponentProps, FC, useCallback, useState } from "react";

import routeAlertKind from "../../../../../packages/common-assets/routeAlertKind";

type Props = AlertsScreenProps<AlertsRoutes.AddRouteAlert>;

const AddRouteAlertScreen: FC<Props> = (props) => {
  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const [alertKind, setAlertKind] = useState<
    typeof RouteAlertKindSchema._type | undefined
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
      <SelectImage
        image={imageToDisplay}
        isLoading={loadingUpload}
        onPickImage={pickImageHandler}
        onDeletePickedImage={() => setImageToDisplay(null)}
      />
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
    </Screen>
  );
};

export default AddRouteAlertScreen;
