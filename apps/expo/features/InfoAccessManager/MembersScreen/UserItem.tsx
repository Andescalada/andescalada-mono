import { User } from "@andescalada/api/src/utils/parseUsersToRole";
import { Box, Pressable, Text } from "@andescalada/ui";
import UserProfileImage from "@features/user/components/UserProfileImage/UserProfileImage";

interface Props {
  item: User;
}

const UserItem = ({ item: { username, name, profilePhoto } }: Props) => {
  return (
    <Pressable padding="s" flexDirection="row" alignItems="center">
      <UserProfileImage
        publicId={profilePhoto?.publicId || undefined}
        style={{ width: 40, height: 40, borderRadius: 40 }}
      />
      <Box marginLeft="m">
        <Text variant="p1R" color="grayscale.white">
          {name}
        </Text>
        <Text variant="p3R" color="grayscale.white">
          {username}
        </Text>
      </Box>
    </Pressable>
  );
};

export default UserItem;
