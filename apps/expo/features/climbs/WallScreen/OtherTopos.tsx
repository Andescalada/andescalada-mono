import { Box, Pressable, Text } from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";

const OtherTopos = () => {
  const {
    params: { wallId, zoneId },
  } = useRoute<ClimbsNavigationRouteProps<ClimbsNavigationRoutes.Wall>>();
  const otherToposQuery = trpc.topos.otherToposCount.useQuery({
    wallId,
    zoneId,
  });

  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Wall>
    >();

  const otherToposCount = otherToposQuery.data ?? 0;

  console.log("otherToposCount", otherToposCount);

  if (!otherToposCount) return null;
  return (
    <Box paddingHorizontal="m" marginTop="m">
      <Pressable
        bg="grayscale.900"
        borderRadius={8}
        padding="s"
        alignItems="center"
        justifyContent="center"
        gap="s"
        flexDirection="row"
        onPress={() =>
          navigation.navigate(ClimbsNavigationRoutes.OtherTopos, {
            wallId,
            zoneId,
          })
        }
      >
        <Box bg="semantic.info" borderRadius={8} paddingHorizontal="s">
          <Text variant="p3R">{otherToposCount}</Text>
        </Box>
        <Text variant="p2R">{`Ver otros topos`}</Text>
      </Pressable>
    </Box>
  );
};

export default OtherTopos;
