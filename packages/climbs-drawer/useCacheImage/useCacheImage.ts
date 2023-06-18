import { Skia, SkImage } from "@shopify/react-native-skia";
import { useEffect, useRef, useState } from "react";

const loadImage = async (source: string) => {
  const imageData = await Skia.Data.fromURI(source);
  const encodedImage = Skia.Image.MakeImageFromEncoded(imageData);
  if (!encodedImage) return null;
  return encodedImage;
};

// Possibly deprecated
const useCacheImage = (imageUrl: string) => {
  const mounted = useRef(false);
  const [image, setImage] = useState<SkImage | null>(null);
  const imageRef = useRef<SkImage | null>();

  useEffect(() => {
    mounted.current = true;
    loadImage(imageUrl).then((image) => {
      if (mounted.current) {
        setImage(image);
        imageRef.current = image;
      }
    });
    return () => {
      imageRef.current?.dispose();

      mounted.current = false;
    };
  }, [imageUrl]);

  return image;
};

export default useCacheImage;
