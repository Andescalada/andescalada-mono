import {
  Box,
  Button,
  Header,
  Image,
  Ionicons,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import UserItem from "@features/photoContest/components/UserItem";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import usePickImage from "@hooks/usePickImage";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = PhotoContestScreenProps<PhotoContestRoutes.UploadTopo>;

const UploadTopoScreen: FC<Props> = ({
  route: {
    params: { wallName, wallId },
  },
  navigation,
}) => {
  const { pickImage, selectedImage } = usePickImage({ allowsEditing: false });

  const { data } = trpc.photoContest.userParticipatingByWall.useQuery({
    wallId,
  });

  return (
    <Screen padding="m">
      <Header
        title={wallName}
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <Box marginVertical="m">
        <Pressable
          height={250}
          borderColor={selectedImage ? "transparent" : "semantic.info"}
          borderWidth={2}
          borderRadius={10}
          borderStyle="dashed"
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
          onPress={() => pickImage(selectedImage)}
        >
          {!selectedImage ? (
            <Box justifyContent="center" alignItems={"center"}>
              <Ionicons name="camera-outline" size={30} />
              <Text marginTop="xs">Subir foto de esta pared</Text>
            </Box>
          ) : (
            <Image
              source={{ uri: selectedImage.localUri }}
              height={250}
              width="100%"
            />
          )}
        </Pressable>
      </Box>
      <Box flex={1}>
        <Text variant="p1R">Usuarios que ya subieron fotos</Text>
        <FlatList
          data={data}
          ListEmptyComponent={() => (
            <Box marginTop="l">
              <Text variant="p3R">No hay usuarios que hayan subido fotos</Text>
            </Box>
          )}
          renderItem={({ item }) => <UserItem item={item.User} />}
        />
      </Box>
      <Button variant="info" title="Enviar" marginBottom="l" />
    </Screen>
  );
};

export default UploadTopoScreen;
