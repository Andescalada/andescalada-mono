import useWallsById from "@hooks/offlineQueries/useWallsById";
import useCachedImage from "@hooks/useCachedImage";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { useFitContent } from "@hooks/useFitContent";
import type { Wall, Zone } from "@prisma/client";
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
  const fitted = useFitContent(
    { height, width },
    "width",
    Math.min(1024 * 2, width),
  );

  const { fileUrl } = useCachedImage(image);
  return { fileUrl, height, width, isImageLoaded, fitted };
};

export default useTopoImage;
