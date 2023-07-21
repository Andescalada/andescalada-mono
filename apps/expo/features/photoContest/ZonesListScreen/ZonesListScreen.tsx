import {
  Box,
  Button,
  Header,
  Ionicons,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import Calendar from "@features/photoContest/components/Calendar";
import UserItem from "@features/photoContest/components/UserItem";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useRefresh from "@hooks/useRefresh";
import {
  Box as SkiaBox,
  Canvas,
  LinearGradient,
  rect,
  vec,
} from "@shopify/react-native-skia";
import { isAndroid } from "@utils/platform";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = PhotoContestScreenProps<PhotoContestRoutes.ZonesList>;
const SIZE = 100;

const ZoneListScreen: FC<Props> = ({ navigation }) => {
  const users = trpc.photoContest.usersParticipating.useQuery();

  const refreshUsers = useRefresh(users.refetch, users.isFetching);

  const { data, isLoading } = trpc.photoContest.getCurrentContest.useQuery(
    undefined,
    {
      staleTime: 24 * 60 * 60 * 1000,
      cacheTime: 24 * 60 * 60 * 1000,
    },
  );
  const theme = useAppTheme();

  if (isLoading) return null;

  return (
    <Screen padding="m">
      <Header
        title="Concurso fotográfico"
        showOptions={false}
        onGoBack={navigation.goBack}
      />
      <Box justifyContent="space-between" gap="s">
        <Box flexDirection="row" alignItems="flex-end" gap="s">
          <Box flex={1} padding="s" height="100%">
            {data && data?.daysLeft > 0 ? (
              <Text variant="p2R">
                Empieza eligiendo la zona que quieres documentar.
              </Text>
            ) : (
              <Text variant="p2R">¡Concurso finalizado 😄, vendrán más!</Text>
            )}
            <Text
              variant="p2R"
              marginTop="m"
              color="semantic.info"
              textDecorationLine="underline"
              onPress={() => navigation.replace(PhotoContestRoutes.Onboarding)}
            >
              Más info
            </Text>
          </Box>

          <Calendar
            title="Quedan"
            days={data?.daysLeft.toFixed(0) || "0"}
            size={80}
          />
        </Box>
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
      <Box flexDirection="row" marginVertical="s" gap="s">
        <Button
          icon="images"
          gap="s"
          flex={1}
          iconProps={{ size: 20 }}
          titleVariant="p1R"
          title="Ver topos participando"
          variant="infoSimplified"
          padding="s"
          onPress={() => {
            navigation.navigate(PhotoContestRoutes.PhotosFeed);
          }}
        />
        <Pressable
          bg="grayscale.500"
          justifyContent="center"
          alignItems="center"
          width={40}
          borderRadius={8}
          onPress={() => navigation.navigate(PhotoContestRoutes.ShareContest)}
        >
          <Ionicons
            color="background"
            name={isAndroid ? "share-social" : "share"}
            size={20}
          />
        </Pressable>
      </Box>
      <FlatList
        data={users.data}
        refreshControl={refreshUsers}
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
              No hay usuarios participando, sé el primero!
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
