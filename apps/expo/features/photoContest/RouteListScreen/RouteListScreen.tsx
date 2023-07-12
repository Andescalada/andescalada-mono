import { Box, Header, ListItem, Screen, Text } from "@andescalada/ui";
import {
  PhotoContestRoutes,
  PhotoContestScreenProps,
} from "@features/photoContest/Navigation/types";
import useRouteList from "@hooks/useRouteList";
import { FC } from "react";
import { FlatList } from "react-native";

type Props = PhotoContestScreenProps<PhotoContestRoutes.RouteList>;

const RouteListScreen: FC<Props> = ({
  route: {
    params: { wallId, zoneId, wallName },
  },
  navigation,
}) => {
  const { data } = useRouteList(
    { wallId, zoneId },
    { staleTime: 3 * 60 * 1000, cacheTime: 5 * 60 * 1000 },
  );
  return (
    <Screen padding="m">
      <Header
        title={wallName}
        onGoBack={navigation.goBack}
        marginBottom="l"
        showOptions={false}
      />
      <FlatList
        data={data?.routes}
        renderItem={({ item: route }) => (
          <>
            <ListItem
              flexDirection="row"
              marginBottom="s"
              alignItems="center"
              justifyContent="space-between"
              padding="l"
              borderRadius={16}
            >
              <Box flexDirection="row" flex={1}>
                <Box
                  borderWidth={1}
                  borderColor="text"
                  borderRadius={15}
                  height={30}
                  width={30}
                  justifyContent="center"
                  alignItems="center"
                  marginRight="s"
                >
                  <Text
                    variant="p2B"
                    paddingHorizontal="xs"
                    fontSize={14}
                    textAlign="center"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {route.position}
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text variant="p2R" ellipsizeMode="tail" numberOfLines={1}>
                    {route.name}
                  </Text>
                  <Text variant="caption" color="grayscale.400">
                    {route.kindStringify}
                  </Text>
                </Box>
              </Box>
              <Box flexDirection="row" alignItems="center">
                <Text variant="p2R">{route.gradeStringify}</Text>
              </Box>
            </ListItem>
          </>
        )}
      />
    </Screen>
  );
};

export default RouteListScreen;
