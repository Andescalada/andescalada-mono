import { Box, Pressable, Text } from "@andescalada/ui";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { ReactNode } from "react";

export type User = {
  profilePhoto: {
    publicId: string | null;
  } | null;
  id: string;
  name: string;
  username: string;
};

interface Props {
  item: User;
  children?: ReactNode;
}

const UserItem = ({
  item: { username, name, profilePhoto },
  children,
}: Props) => {
  return (
    <Pressable
      padding="s"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box flexDirection="row" alignItems="center">
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
      </Box>
      <Box>{children}</Box>
    </Pressable>
  );
};

export default UserItem;
