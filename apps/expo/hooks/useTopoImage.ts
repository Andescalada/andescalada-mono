import type { Image, Wall, Zone } from "@andescalada/db";
import useWallsById from "@hooks/offlineQueries/useWallsById";
import useCachedImage from "@hooks/useCachedImage";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { useFitContent } from "@hooks/useFitContent";
import { useMemo } from "react";

interface Args {
  wallId: Wall["id"];
  zoneId: Zone["id"];
  imageQuality?: number;
}

const useTopoImage = ({ wallId, zoneId, imageQuality }: Args) => {
  const { data } = useWallsById({ wallId, zoneId });
  const { height, width, publicId } = data?.topos[0].image || {
    height: 0,
    width: 0,
    url: "",
    publicId: undefined,
  };

  const image = useCloudinaryUrl("optimizedImage", {
    publicId: publicId,
    quality: imageQuality,
  });

  const isImageLoaded = useMemo(() => !!image, [image]);
  const fitted = useFitContent({ height, width }, "width");

  const { fileUrl } = useCachedImage(image);
  return { fileUrl, height, width, isImageLoaded, fitted };
};

export const useGetTopoImage = ({
  imageData,
  imageQuality,
}: {
  imageData?: { height: number; width: number; publicId: string | null };
  imageQuality: number;
}) => {
  const { height, width, publicId } = imageData || {
    height: 0,
    width: 0,
    publicId: null,
  };

  const image = useCloudinaryUrl("optimizedImage", {
    publicId: publicId,
    quality: imageQuality,
  });

  const isImageLoaded = useMemo(() => !!image, [image]);
  const fitted = useFitContent({ height, width }, "width");

  const { fileUrl } = useCachedImage(image);
  return { fileUrl, height, width, isImageLoaded, fitted };
};

export default useTopoImage;
