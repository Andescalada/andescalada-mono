// Import the Cloudinary class
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions/resize";

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

export const optimizedImage = (publicId?: string | null, quality = 100) =>
  imageObject(
    cld
      .image(publicId || undefined)
      .format("auto")
      .quality(quality),
    publicId,
  );

export const getThumbnail = ({
  width,
  publicId,
}: {
  publicId?: string;
  width: number;
}) => {
  const image = cld
    .image(publicId)
    .resize(Resize.scale(width))
    .format("auto")
    .quality(100);

  return imageObject(image, publicId);
};

export const getProfileImage = (publicId?: string, size?: number) => {
  const image = cld
    .image(publicId)
    .resize(Resize.scale(size))
    .format("auto")
    .quality(50);

  return imageObject(image, publicId);
};

const imageObject = (image?: CloudinaryImage, publicId?: string | null) => {
  if (!image || !publicId) return null;
  const uniqueId = `${publicId}-${image.toString()}`.replace(/\//g, "-");

  return {
    url: image.toURL(),
    uniqueId,
  };
};
