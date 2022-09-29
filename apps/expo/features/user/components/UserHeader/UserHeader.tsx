import { Image, Screen, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import useCachedImage from "@hooks/useCachedImage";
import { getThumbnail } from "@utils/cloudinary";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const placeholder = require("../../../../assets/squared_placeholder.png");

const UserHeader = () => {
  const { data } = trpc.user.ownInfo.useQuery();
  const { name, profilePhoto } = data || {};

  const image = getThumbnail(profilePhoto?.publicId || undefined);
  const { uri } = useCachedImage(image);
  return (
    <Screen
      flex={0}
      flexDirection={"row"}
      alignItems="center"
      justifyContent="space-between"
      padding="m"
      paddingBottom={"s"}
      borderBottomWidth={1}
      borderBottomColor="buttonGroup"
    >
      <Text variant="h3">{name}</Text>
      <Image
        source={uri ? uri : placeholder}
        style={{ width: 40, height: 40, borderRadius: 100 }}
      />
    </Screen>
  );
};

export default UserHeader;
