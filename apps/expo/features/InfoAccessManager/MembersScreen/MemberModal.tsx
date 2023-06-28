import { AppRouter } from "@andescalada/api/src/routers/_app";
import { Box, Ionicons, Modal, Pressable, Text } from "@andescalada/ui";
import UserProfileImage from "@templates/UserProfileImage/UserProfileImage";
import { inferProcedureOutput } from "@trpc/server";
import { ComponentProps } from "react";

type Member = inferProcedureOutput<AppRouter["zones"]["membersList"]>[number];

interface ModalProps extends Omit<ComponentProps<typeof Modal>, "children"> {
  selectedUser: Member | null;
  navigateToUser: (userId: string | null) => void;
}

const MemberModal = ({
  selectedUser,
  navigateToUser,
  ...props
}: ModalProps) => {
  return (
    <Modal
      minHeight={300}
      width={300}
      padding="m"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Modal.Close />
      <UserProfileImage
        publicId={selectedUser?.profilePhoto?.publicId || undefined}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text variant="h2">{selectedUser?.name}</Text>
      <Text variant="p2R" lineHeight={16} color="grayscale.400">
        {selectedUser?.username}
      </Text>
      {selectedUser?.id !== selectedUser?.assignedBy.id ? (
        <Pressable
          marginTop="m"
          onPress={() => navigateToUser(selectedUser?.assignedBy.id || null)}
        >
          <Text variant="p2R">Agregado por:</Text>
          <Box flexDirection="row" alignItems="center" gap="s">
            <Ionicons name="return-down-forward-outline" size={16} />
            <UserProfileImage
              style={{ width: 20, height: 20, borderRadius: 10 }}
              publicId={
                selectedUser?.assignedBy?.profilePhoto?.publicId || undefined
              }
            />
            <Text variant="p2R">{selectedUser?.assignedBy?.name}</Text>
            <Text variant="p2R" color="grayscale.400">
              el {selectedUser?.assignedAt.toLocaleDateString()}
            </Text>
          </Box>
        </Pressable>
      ) : (
        <Box marginTop="m">
          <Text variant="p2R">Creador de la zona</Text>
          <Text variant="p2R" color="grayscale.400">
            el {selectedUser?.assignedAt.toLocaleDateString()}
          </Text>
        </Box>
      )}
    </Modal>
  );
};

export default MemberModal;
