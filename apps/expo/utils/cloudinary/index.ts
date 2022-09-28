// Import the Cloudinary class
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { SCREEN_WIDTH } from "@utils/Dimensions";

// Create your instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "fundacion-andescalada",
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

export const getImage = (publicId: string, width: number, height: number) => {
  const image = cld
    .image(publicId)
    .resize(Resize.scale().width(width).height(height));

  return imageObject(image, publicId);
};

export const optimizedImage = (publicId?: string, quality = 60) =>
  imageObject(cld.image(publicId).format("auto").quality(quality), publicId);

export const getThumbnail = (publicId: string) => {
  const image = cld
    .image(publicId)
    .resize(Resize.scale(SCREEN_WIDTH))
    .format("auto")
    .quality(50);

  return imageObject(image, publicId);
};

const imageObject = (image?: CloudinaryImage, publicId?: string | null) => {
  if (!image || !publicId) return { url: null, uniqueId: null };
  const uniqueId = `${publicId}-${image.toString()}`.replace(/\//g, "-");

  return {
    url: image.toURL(),
    uniqueId,
  };
};
