import { AppRouter } from "@andescalada/api/src/routers/_app";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import {
  A,
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
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useDebounce from "@hooks/useDebounce";
import useGradeSystem from "@hooks/useGradeSystem";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { inferProcedureOutput } from "@trpc/server";
import React, { FC, useState } from "react";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import StarRating from "react-native-star-rating-widget";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Route>;

type Route = inferProcedureOutput<AppRouter["routes"]["byIdWithEvaluation"]>;

const STAR_SIZE = 30;

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

  const { data: evaluation } = trpc.routes.evaluationById.useQuery({ routeId });

  return (
    <Screen padding="m">
      <Header title={routeName} onGoBack={navigation.goBack} />
      <RouteContainer
        route={data}
        isLoading={isLoading}
        evaluationValue={evaluation?.value || 0}
      />
    </Screen>
  );
};

const RouteContainer = ({
  isLoading,
  route,
  evaluationValue,
}: {
  isLoading: boolean;
  route: Route | undefined;
  evaluationValue: number;
}) => {
  const [evaluation, setEvaluation] = useState(evaluationValue);
  const theme = useAppTheme();
  const rootNavigation = useRootNavigation();
  const { gradeLabel, changeGradeSystem } = useGradeSystem();

  const utils = trpc.useContext();
  const addOrEditEvaluation = trpc.routes.addOrEditEvaluation.useMutation({
    onSuccess: ({ routeId }) => {
      utils.routes.evaluationById.invalidate({ routeId });
      utils.routes.byIdWithEvaluation.invalidate({ routeId });
    },
  });

  const mutate = (evaluation: number, routeId: string) => {
    addOrEditEvaluation.mutate({
      routeId,
      evaluation,
    });
  };

  const mutateDebounce = useDebounce(mutate, 1000);

  const evaluationBadgeStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      addOrEditEvaluation.isLoading
        ? theme.colors["grayscale.800"]
        : theme.colors.stars,
      { duration: 1000 },
    ),
  }));

  if (!route || isLoading)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </Box>
    );

  return (
    <Box flex={1}>
      <Box flexDirection="row">
        <Pressable padding="s" flex={1} onPress={changeGradeSystem}>
          <Text fontSize={40} lineHeight={50}>
            {gradeLabel(route.RouteGrade, route.kind)}
          </Text>
          <Text>{routeKindLabel(route.kind).long}</Text>
        </Pressable>
        <Pressable
          flex={1}
          borderRadius={16}
          borderWidth={3}
          borderColor="backgroundContrast"
          bg="semantic.info"
          justifyContent="center"
          alignItems="center"
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
              screen: RoutesManagerNavigationRoutes.TopoViewer,
              params: {
                topoId: route.mainTopo.id,
                routeId: route.id,
                zoneId: route.Wall.Sector.zoneId,
              },
            })
          }
        >
          <Text variant="p1R">Ver topo</Text>
        </Pressable>
      </Box>
      <Box mt="s" flexDirection="row" alignItems="center" height={STAR_SIZE}>
        <Box width={STAR_SIZE * 4.5}>
          <StarRating
            rating={evaluation}
            onChange={(e) => {
              setEvaluation(e);
              mutateDebounce(e, route.id);
            }}
            emptyColor={theme.colors["grayscale.500"]}
            color={theme.colors.stars}
            starSize={STAR_SIZE}
            style={{ maxWidth: STAR_SIZE }}
            starStyle={{ width: STAR_SIZE / 2 }}
          />
        </Box>

        <A.Box
          bg={evaluation === 0 ? "grayscale.500" : "stars"}
          borderRadius={8}
          padding="xs"
          height={STAR_SIZE}
          minWidth={STAR_SIZE}
          justifyContent="center"
          alignContent="center"
          style={evaluationBadgeStyle}
          mx="s"
        >
          <Text
            fontFamily="Rubik-600"
            color="background"
            fontSize={20}
            lineHeight={0}
            textAlign="center"
          >
            {evaluation}
          </Text>
        </A.Box>
        <Box justifyContent="flex-end" height="100%">
          <Text variant="p2R" numberOfLines={1} ellipsizeMode="tail">
            <Text variant="p2R" color="stars">
              {route.evaluation.average}
            </Text>{" "}
            estrellas en{" "}
            <Text variant="p2R" color="semantic.info">
              {route.evaluation.count}
            </Text>{" "}
            votos
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default RouteScreen;
