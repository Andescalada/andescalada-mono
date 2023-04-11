import { Skia, SkImage } from "@shopify/react-native-skia";
import { useCallback, useEffect, useState } from "react";

const useCacheImage = (imageUrl: string) => {
  const [image, setImage] = useState<SkImage>();
  const getImage = useCallback(async () => {
    const imageData = await Skia.Data.fromURI(imageUrl);
    const encodedImage = Skia.Image.MakeImageFromEncoded(imageData);
    if (!encodedImage) return;
    setImage(encodedImage);
  }, [imageUrl]);

  useEffect(() => {
    getImage();
  }, [getImage]);

  useEffect(
    () => () => {
      image?.dispose();
    },
    [image],
  );

  return image;
};

export default useCacheImage;
