import { AppRouter } from "@andescalada/api/src/routers/_app";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import {
  ActivityIndicator,
  Box,
  Header,
  Pressable,
  Screen,
  Text,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import useGradeSystem from "@hooks/useGradeSystem";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Route>;

type Route = inferProcedureOutput<AppRouter["routes"]["byIdWithEvaluation"]>;

const RouteScreen: FC<Props> = ({
  route: {
    params: { routeName, routeId, zoneId },
  },
  navigation,
}) => {
  const { data, isLoading } = trpc.routes.byIdWithEvaluation.useQuery({
    routeId,
    zoneId,
  });
  return (
    <Screen padding="m">
      <Header title={routeName} onGoBack={navigation.goBack} />
      <RouteContainer route={data} isLoading={isLoading} />
    </Screen>
  );
};

const RouteContainer = ({
  isLoading,
  route,
}: {
  isLoading: boolean;
  route: Route | undefined;
}) => {
  const { gradeLabel, gradeSystem, changeGradeSystem } = useGradeSystem();
  if (!route || isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );
  return (
    <Box my="m" flex={1}>
      <Pressable flexDirection="row" onPress={changeGradeSystem}>
        <Box padding="s" flex={1}>
          <Text fontSize={40} lineHeight={50}>
            {gradeLabel(route.RouteGrade, route.kind)}
          </Text>
          <Text>{routeKindLabel(route.kind).long}</Text>
        </Box>
        <Pressable
          flex={1}
          borderRadius={16}
          borderWidth={3}
          borderColor="backgroundContrast"
          bg="semantic.info"
          justifyContent="center"
          alignItems="center"
        >
          <Text variant="p1R">Ver topo</Text>
        </Pressable>
      </Pressable>
    </Box>
  );
};

export default RouteScreen;
