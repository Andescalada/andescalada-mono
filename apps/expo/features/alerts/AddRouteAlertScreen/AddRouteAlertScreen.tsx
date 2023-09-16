import { Screen, Text } from "@andescalada/ui";
import {
  AlertsRoutes,
  AlertsScreenProps,
} from "@features/alerts/Navigation/types";
import SelectImage from "@features/components/SelectImage";
import useCloudinaryImage from "@hooks/useCloudinaryImage";
import { onSuccessPick } from "@hooks/usePickImage";
import { ComponentProps, FC, useCallback, useState } from "react";

type Props = AlertsScreenProps<AlertsRoutes.AddRouteAlert>;

const AddRouteAlertScreen: FC<Props> = (props) => {
  const [imageToDisplay, setImageToDisplay] = useState<string | null>(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
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
    </Screen>
  );
};

export default AddRouteAlertScreen;
