import { trpc } from "@andescalada/utils/trpc";
import useCachedImage from "@hooks/useCachedImage";
import type { Wall } from "@prisma/client";
import { optimizedImage } from "@utils/cloudinary";
import { fitContent } from "@utils/Dimensions";
import { useMemo } from "react";

interface Args {
  wallId: Wall["id"];
}

const useTopoImage = ({ wallId }: Args) => {
  const { data } = trpc.walls.byId.useQuery({ wallId });
  const { height, width, publicId } = data?.topos[0].image || {
    height: 0,
    width: 0,
    url: "",
    publicId: undefined,
  };

  const image = optimizedImage(publicId || undefined);

  const isImageLoaded = useMemo(() => !!image, [image]);
  const fitted = fitContent({ height, width });

  const { fileUrl } = useCachedImage(image);
  return { fileUrl, height, width, isImageLoaded, fitted };
};

export default useTopoImage;
