import { Box, Pressable, Text } from "@andescalada/ui";
import useOwnInfo from "@hooks/useOwnInfo";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { ComponentProps, ReactNode } from "react";

export type User = {
  profilePhoto: {
    publicId: string | null;
  } | null;
  id: string;
  name: string;
  username: string;
};

interface Props extends ComponentProps<typeof Pressable> {
  item: User;
  children?: ReactNode;
}

const UserItem = ({
  item: { username, name, profilePhoto, id },
  children,
  ...props
}: Props) => {
  const user = useOwnInfo();

  return (
    <Pressable
      padding="s"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      {...props}
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
        {user.data?.id === id && (
          <Box
            backgroundColor="semantic.info"
            paddingVertical="xs"
            paddingHorizontal="s"
            borderRadius={16}
            marginLeft="m"
          >
            <Text>Yo</Text>
          </Box>
        )}
      </Box>
      <Box>{children}</Box>
    </Pressable>
  );
};

export default UserItem;
