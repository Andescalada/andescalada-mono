import { Image } from "@andescalada/ui";
import useCachedImage from "@hooks/useCachedImage";
import useCloudinaryUrl from "@hooks/useCloudinaryUrl";
import { ComponentProps, FC } from "react";

interface Props extends Omit<ComponentProps<typeof Image>, "source"> {
  publicId: string | undefined;
}

const UserProfileImage: FC<Props> = ({ publicId, ...props }) => {
  const image = useCloudinaryUrl("getThumbnail", { publicId });
  const { uri } = useCachedImage(image);
  return <Image source={uri} {...props} />;
};

export default UserProfileImage;
