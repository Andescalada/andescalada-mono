import { trpc } from "@andescalada/utils/trpc";
import useCachedImage from "@hooks/useCachedImage";
import type { Wall, Zone } from "@prisma/client";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { useMemo } from "react";

interface Args {
  wallId: Wall["id"];
  zoneId: Zone["id"];
  imageQuality?: number;
}

const useTopoImage = ({ wallId, zoneId, imageQuality }: Args) => {
  const { data } = trpc.walls.byId.useQuery({ wallId, zoneId });
  const { height, width, publicId } = data?.topos[0].image || {
    height: 0,
    width: 0,
    url: "",
    publicId: undefined,
  };

  const image = optimizedImage(publicId || undefined, imageQuality);

  const isImageLoaded = useMemo(() => !!image, [image]);
  const fitted = fitContent(
    { height, width },
    "width",
    Math.min(1024 * 2, width),
  );

  const { fileUrl } = useCachedImage(image);
  return { fileUrl, height, width, isImageLoaded, fitted };
};

export default useTopoImage;
