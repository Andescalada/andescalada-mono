import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { blur } from "@cloudinary/url-gen/actions/effect"; // Import the Cloudinary class
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

const getImage = ({
  height,
  publicId,
  width,
}: {
  publicId: string;
  width: number;
  height: number;
}) => {
  const image = cld
    .image(publicId)
    .resize(Resize.scale().width(width).height(height));

  return imageObject(image, publicId);
};

const optimizedImage = ({
  publicId,
  quality = 100,
}: {
  publicId?: string | null;
  quality?: number;
}) =>
  imageObject(
    cld
      .image(publicId || undefined)
      .format("auto")
      .quality(quality),
    publicId,
  );
const blurImage = ({
  publicId,
  blurness = 500,
}: {
  publicId?: string | null;
  blurness?: number;
}) =>
  imageObject(
    cld
      .image(publicId || undefined)
      .format("auto")
      .effect(blur(blurness))
      .quality(50),
    publicId,
  );

const lowQuality = ({ publicId }: { publicId?: string | null }) =>
  imageObject(
    cld
      .image(publicId || undefined)
      .format("auto")
      .quality("low"),
    publicId,
  );

const getThumbnail = ({ publicId }: { publicId?: string; width?: number }) => {
  const image = cld.image(publicId).format("auto").quality(100);

  return imageObject(image, publicId);
};

const getProfileImage = ({
  publicId,
  size,
}: {
  publicId?: string;
  size?: number;
}) => {
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

export const urlGen = {
  getImage,
  optimizedImage,
  blurImage,
  lowQuality,
  getThumbnail,
  getProfileImage,
} as const;
