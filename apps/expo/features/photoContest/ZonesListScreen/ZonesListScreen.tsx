import {
  Box,
  Header,
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
import { useAppTheme } from "@hooks/useAppTheme";
import {
  Box as SkiaBox,
  Canvas,
  LinearGradient,
  rect,
  vec,
} from "@shopify/react-native-skia";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = PhotoContestScreenProps<PhotoContestRoutes.ZonesList>;
const SIZE = 100;
const today = new Date();
const ZoneListScreen: FC<Props> = ({ navigation }) => {
  const users = trpc.photoContest.usersParticipating.useQuery();

  const { data, isLoading } = trpc.photoContest.getCurrentContest.useQuery();
  const theme = useAppTheme();

  const daysLeft = data
    ? (data?.ending?.getTime() - today.getTime()) / (1000 * 3600 * 24)
    : 0;

  if (isLoading) return null;

  return (
    <Screen padding="m">
      <Header
        title="Concurso fotográfico"
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <Box flexDirection="row" alignItems="flex-end" gap="xs">
        <Text variant="p1R">Quedan</Text>
        <Box
          bg="contrast.bright.red"
          height={30}
          width={30}
          borderRadius={4}
          justifyContent="center"
          alignItems="center"
        >
          <Text variant="p1R">{daysLeft.toFixed(0)}</Text>
        </Box>
        <Text variant="p1R">días</Text>
      </Box>
      <Box gap="m" marginBottom="m">
        <Box borderBottomColor="brand.secondaryA" borderBottomWidth={2}>
          <Text variant="h3">Zonas</Text>
        </Box>
        <FlatList
          data={data?.Zones}
          horizontal
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              height={100}
              width={100}
              justifyContent="center"
              padding="s"
              borderRadius={16}
              overflow="hidden"
              marginRight="s"
              onPress={() => {
                navigation.navigate(PhotoContestRoutes.Zone, {
                  zoneId: item.id,
                  zoneName: item.name,
                });
              }}
            >
              <Box position="absolute" top={0} bottom={0} left={0} right={0}>
                <Canvas
                  style={{
                    flex: 1,
                  }}
                >
                  <SkiaBox box={rect(0, 0, 100, 100)}>
                    <LinearGradient
                      start={vec(0, 0)}
                      end={vec(SIZE, SIZE)}
                      colors={[theme.colors.gradientB, theme.colors.gradientA]}
                    />
                  </SkiaBox>
                </Canvas>
              </Box>
              <Text variant="p3B">{item.name}</Text>
            </Pressable>
          )}
        />
      </Box>
      <FlatList
        data={users.data}
        ListHeaderComponent={() => (
          <Box
            marginVertical="s"
            borderBottomColor="brand.secondaryA"
            borderBottomWidth={2}
          >
            <Text variant="h3">Usuarios participando</Text>
          </Box>
        )}
        ListEmptyComponent={() => (
          <Box marginTop="l">
            <Text variant="p3R">
              No hay usuarios participando por esta pared todavía
            </Text>
          </Box>
        )}
        renderItem={({ item }) => (
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            flex={1}
            borderBottomColor="grayscale.400"
            borderBottomWidth={1}
          >
            <UserItem item={item} />
            <Box flexDirection="row" alignItems="center" gap="s">
              <Text lineHeight={20} fontSize={19}>
                {item.submissionsCount}
              </Text>
              <Ionicons name="images-outline" size={20} />
            </Box>
          </Box>
        )}
      />
    </Screen>
  );
};

export default ZoneListScreen;
