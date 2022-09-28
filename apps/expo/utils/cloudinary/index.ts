// Import the Cloudinary class
import { Cloudinary } from "@cloudinary/url-gen";
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

export const getImage = (photoId: string, width: number, height: number) => {
  return cld
    .image(photoId)
    .resize(Resize.scale().width(width).height(height))
    .toURL();
};

export const optimizedImage = (photoId: string, quality = 60) =>
  cld.image(photoId).format("auto").quality(quality).toURL();

export const getThumbnail = (photoId: string) => {
  return cld
    .image(photoId)
    .resize(Resize.scale(SCREEN_WIDTH))
    .format("auto")
    .quality(50)
    .toURL();
};
