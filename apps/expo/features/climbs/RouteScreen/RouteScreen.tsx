import { AppRouter } from "@andescalada/api/src/routers/_app";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { RouteGrade } from "@andescalada/db";
import {
  A,
  ActivityIndicator,
  Box,
  Button,
  Header,
  Ionicons,
  Modal,
  Pressable,
  Screen,
  ScrollView,
  Text,
  TextButton,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import { AlertsRoutes } from "@features/alerts/Navigation/types";
import VotingGradePicker from "@features/climbs/components/VotingGradePicker";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import useRoutesByIdWithEvaluation from "@hooks/offlineQueries/useRoutesByIdWithEvaluation";
import { useAppTheme } from "@hooks/useAppTheme";
import useDebounce from "@hooks/useDebounce";
import useGradeSystem from "@hooks/useGradeSystem";
import useIsConnected from "@hooks/useIsConnected";
import useOwnInfo, { useGetOwnInfo } from "@hooks/useOwnInfo";
import usePermissions from "@hooks/usePermissions";
import useRefresh from "@hooks/useRefresh";
import useRootNavigation from "@hooks/useRootNavigation";
import useGetRouteEvaluationQuery from "@local-database/hooks/useGetRouteEvaluationQuery";
import useGetRouteGradeEvaluationQuery from "@local-database/hooks/useGetRouteGradeEvaluationQuery";
import useSetOrCreateRouteEvaluationMutation from "@local-database/hooks/useSetOrCreateRouteEvaluationMutation";
import useSetOrCreateRouteGradeEvaluationMutation from "@local-database/hooks/useSetOrCreateRouteGradeEvaluationMutation";
import sync from "@local-database/sync";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { inferProcedureOutput } from "@trpc/server";
import { isAndroid } from "@utils/platform";
import React, { ComponentProps, FC, useRef, useState } from "react";
import type { TextInput as TextInputRef } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import StarRating from "react-native-star-rating-widget";

import { RouteKindSchema } from "../../../../../packages/db/zod/enums/RouteKind";

type Props = ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Route>;

type Route = inferProcedureOutput<AppRouter["routes"]["byIdWithEvaluation"]>;

const STAR_SIZE = 30;

const useRouteScreenParams = () => {
  const route =
    useRoute<ClimbsNavigationRouteProps<ClimbsNavigationRoutes.Route>>();

  return route.params;
};

const RouteScreen: FC<Props> = ({
  route: {
    params: { routeName, routeId, zoneId },
  },
  navigation,
}) => {
  const { data, isLoading, refetch } = useRoutesByIdWithEvaluation({
    routeId,
    zoneId,
  });

  const { data: localDbEvaluation } = useGetRouteEvaluationQuery({ routeId });

  if (isLoading || !data)
    return (
      <Screen padding="m">
        <Header
          title={routeName}
          onGoBack={navigation.goBack}
          showOptions={false}
        />
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Screen>
    );

  return (
    <Screen padding="m">
      <Header
        title={routeName}
        onGoBack={navigation.goBack}
        showOptions={false}
      />
      <RouteContainer
        refetch={refetch}
        isFetching={isLoading}
        route={data}
        evaluationValue={
          localDbEvaluation?.evaluation
            ? Number(localDbEvaluation?.evaluation)
            : 0
        }
      />
    </Screen>
  );
};

const RouteContainer = ({
  route,
  evaluationValue,
  refetch,
  isFetching,
}: {
  route: Route;
  evaluationValue: number;
  refetch: () => void;
  isFetching: boolean;
}) => {
  const { routeId, zoneId } = useRouteScreenParams();
  const rootNavigation = useRootNavigation();
  const { gradeLabel, changeGradeSystem } = useGradeSystem();

  const refresh = useRefresh(refetch, isFetching);

  return (
    <ScrollView gap="s" refreshControl={refresh}>
      <Box flexDirection="row">
        <Box flex={1} flexDirection="row" alignItems="center">
          <Box padding="s">
            <Box flexDirection="row">
              <Pressable
                onPress={changeGradeSystem}
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Text fontSize={40} lineHeight={40} textAlign="justify">
                  {gradeLabel(
                    route.RouteGrade,
                    route.kind,
                    route.RouteGrade?.originalGradeSystem,
                  )}
                </Text>
              </Pressable>
              <RouteGradeEvaluation
                routeGrade={route.RouteGrade}
                evaluation={route.gradeEvaluation.average}
                routeKind={route.kind}
              />
            </Box>
            <Box flexDirection="row" alignItems="center" gap="s">
              <Text fontSize={20} lineHeight={20}>
                {routeKindLabel(route.kind).long}
              </Text>
              <RouteLength
                length={route.length}
                zoneId={zoneId}
                routeId={routeId}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flexDirection="row" gap="s" mb="s">
        <Pressable
          borderRadius={8}
          bg={
            !route.mainTopo
              ? "grayscale.transparent.50.500"
              : "brand.secondaryB"
          }
          justifyContent="center"
          alignItems="center"
          p="s"
          disabled={!route.mainTopo}
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.RouteManager, {
              screen: RoutesManagerNavigationRoutes.TopoViewer,
              params: {
                topoId: route.mainTopo?.id,
                routeId: route.id,
                zoneId: route.Wall.Sector.zoneId,
              },
            })
          }
        >
          <Text
            variant="p3R"
            color={!route.mainTopo ? "grayscale.white" : "grayscale.black"}
          >
            {route.mainTopo?.id ? "Ver topo" : "Sin topo"}
          </Text>
        </Pressable>
        <Pressable
          borderRadius={8}
          bg={"brand.secondaryB"}
          justifyContent="center"
          alignItems="center"
          p="s"
          onPress={() =>
            rootNavigation.navigate(RootNavigationRoutes.Alert, {
              screen: AlertsRoutes.AddRouteAlert,
              params: { zoneId, routeId, routeName: route.name },
            })
          }
        >
          <Text variant="p3R" color={"grayscale.black"}>
            Agregar alerta
          </Text>
        </Pressable>
      </Box>
      <Box>
        <RouteEvaluation
          evaluationValue={evaluationValue}
          evaluationAverage={route.evaluation.average}
          evaluationCount={route.evaluation.count}
        />
      </Box>
      <Box>
        <RouteDescription
          description={route.description}
          zoneId={zoneId}
          routeId={routeId}
        />
      </Box>
    </ScrollView>
  );
};

const RouteDescription = ({
  description,
  zoneId,
  routeId,
}: {
  zoneId: string;
  routeId: string;
  description: string | undefined;
}) => {
  const { permission } = usePermissions({ zoneId });

  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Route>
    >();

  const navigateToEditDescription = () => {
    navigation.navigate(ClimbsNavigationRoutes.AddAndEditRouteDescription, {
      routeId,
      zoneId,
      description,
    });
  };

  if (description && permission.has("Update")) {
    return (
      <Box padding="m" bg="backgroundContrast" borderRadius={16}>
        <Box flexDirection="row" justifyContent="space-between" mb="s">
          <Text variant="h4" color="background">
            Descripción
          </Text>
          <TextButton onPress={navigateToEditDescription} variant="info">
            Editar
          </TextButton>
        </Box>
        <Text color="background">{description}</Text>
      </Box>
    );
  }

  if (description) {
    return (
      <Box mt="m" padding="m" bg="backgroundContrast" borderRadius={16}>
        <Text variant="h4" color="background" mb="s">
          Descripción
        </Text>
        <Text color="background">{description}</Text>
      </Box>
    );
  }

  if (permission.has("Create")) {
    return (
      <Box mt="m" padding="m" bg="backgroundContrast" borderRadius={16}>
        <Text variant="h4" color="background">
          Descripción
        </Text>
        <TextButton variant="info" onPress={navigateToEditDescription}>
          Agregar descripción
        </TextButton>
      </Box>
    );
  }

  return (
    <Box mt="m" padding="m" bg="backgroundContrast" borderRadius={16}>
      <Text variant="h4" color="background" mb="s">
        Descripción
      </Text>
      <Text color="background">Sin información</Text>
    </Box>
  );
};

const RouteEvaluation = ({
  evaluationValue,
  evaluationAverage,
  evaluationCount,
}: {
  evaluationValue: number;
  evaluationAverage: number;
  evaluationCount: number;
}) => {
  const { routeId } = useRouteScreenParams();

  const user = useGetOwnInfo();

  const [evaluation, setEvaluation] = useState(evaluationValue);
  const theme = useAppTheme();

  const isConnected = useIsConnected();

  const mutation = useSetOrCreateRouteEvaluationMutation({
    onSuccess() {
      if (isConnected) sync();
    },
  });

  const hasMutated = useSharedValue(false);

  const mutate = (evaluation: number, routeId: string) => {
    hasMutated.value = true;
    mutation.mutate({ evaluation, routeId, userId: user.id });
  };

  const mutateDebounce = useDebounce(mutate, 1000);

  const evaluationBadgeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(hasMutated.value ? 1.2 : 1, { duration: 500 }, () => {
          hasMutated.value = false;
        }),
      },
    ],
  }));

  return (
    <Box alignItems="flex-start">
      <Box flexDirection="row">
        <Box width={STAR_SIZE * 4.5}>
          <StarRating
            rating={evaluation}
            onChange={(e) => {
              setEvaluation(e);
              mutateDebounce(e, routeId);
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
            lineHeight={isAndroid ? 25 : 0}
            textAlign="center"
          >
            {evaluation}
          </Text>
        </A.Box>
      </Box>
      <Box justifyContent="flex-end" ml="s" mt="xs">
        <Text variant="p2R" numberOfLines={1} ellipsizeMode="tail">
          <Text variant="p2R" color="stars">
            {evaluationAverage}
          </Text>{" "}
          estrellas en{" "}
          <Text variant="p2R" color="semantic.info">
            {evaluationCount}
          </Text>{" "}
          votos
        </Text>
      </Box>
    </Box>
  );
};

interface RouteGradeVoteModalProps
  extends Omit<ComponentProps<typeof Modal>, "children"> {
  routeKind: typeof RouteKindSchema._type;
  routeGrade: RouteGrade | null;
  defaultValue: { grade: number; originalGrade: string } | null;
}

const RouteGradeVoteModal = ({
  routeKind,
  routeGrade,
  defaultValue,
  ...props
}: RouteGradeVoteModalProps) => {
  const { routeId, zoneId } = useRouteScreenParams();
  const { getSystem } = useGradeSystem();
  const { data: user } = useOwnInfo();
  const [gradeVotedValue, setGradeVotedValue] = useState(() => {
    if (defaultValue)
      return {
        value: defaultValue.grade,
        originalGrade: defaultValue.originalGrade,
      };
    if (routeGrade?.grade && routeGrade?.originalGrade)
      return {
        value: routeGrade.grade,
        originalGrade: routeGrade.originalGrade,
      };

    return { value: 0, originalGrade: "" };
  });

  const isConnected = useIsConnected();

  const utils = trpc.useContext();

  const { mutate } = useSetOrCreateRouteGradeEvaluationMutation({
    async onSuccess() {
      if (isConnected) {
        await sync();
        utils.routes.byIdWithEvaluation.invalidate({ routeId, zoneId });
      }
    },
  });

  return (
    <Modal
      minHeight={300}
      width={300}
      padding="m"
      justifyContent="space-around"
      alignItems="center"
      {...props}
    >
      <Box>
        <Text variant="h4" textAlign="center">
          Graduación comunitaria
        </Text>
        <Text variant="p3R" textAlign="center">
          Es el promedio de todas las votaciones
        </Text>
      </Box>
      <Text variant="p3R" textAlign="center">
        ¿Qué grado te pareció esta ruta?
      </Text>
      <VotingGradePicker
        routeGrade={routeGrade?.grade || null}
        value={gradeVotedValue.value}
        onChange={(v) => {
          setGradeVotedValue({
            originalGrade: v.label,
            value: v.value,
          });
        }}
        routeKind={routeKind}
      />
      <Box zIndex={-1} justifyContent="space-around" alignItems="center">
        <Text variant="error">
          Solo se puede elegir 2 grados más arriba o más abajo del grado oficial
        </Text>
        <Button
          variant="infoSmall"
          px="s"
          titleVariant="p2R"
          title="Guardar"
          onPress={() => {
            const originalGradeSystem = getSystem(routeKind);
            if (!originalGradeSystem || !user) return;
            mutate({
              userId: user.id,
              routeId,
              evaluation: gradeVotedValue.value,
              originalGrade: gradeVotedValue.originalGrade,
              originalGradeSystem,
            });
            props.onDismiss();
          }}
        />
      </Box>
    </Modal>
  );
};

interface RouteGradeEvaluationProps {
  evaluation: number | null;
  routeKind: typeof RouteKindSchema._type;
  routeGrade: RouteGrade | null;
}

const RouteGradeEvaluation = ({
  evaluation,
  routeKind,
  routeGrade,
}: RouteGradeEvaluationProps) => {
  const { routeId } = useRouteScreenParams();

  const { gradeLabel } = useGradeSystem();

  const { data: localRouteGradeEvaluation, isLoading } =
    useGetRouteGradeEvaluationQuery({
      routeId,
    });

  const localEvaluation = localRouteGradeEvaluation?.evaluation;

  const [modalVisible, setModalVisible] = useState(false);

  if (
    !routeGrade?.grade ||
    typeof routeGrade?.grade !== "number" ||
    routeGrade?.project
  ) {
    return null;
  }

  return (
    <>
      {!isLoading && (
        <RouteGradeVoteModal
          routeGrade={routeGrade}
          visible={modalVisible}
          defaultValue={
            localRouteGradeEvaluation
              ? {
                  grade: localRouteGradeEvaluation.evaluation,
                  originalGrade: localRouteGradeEvaluation.originalGrade,
                }
              : null
          }
          routeKind={routeKind}
          onDismiss={() => {
            setModalVisible(false);
          }}
        />
      )}
      <Pressable
        alignItems="flex-end"
        justifyContent="flex-end"
        height={50}
        flexDirection="row"
        marginLeft="s"
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Box style={{ paddingBottom: 7 }}>
          <Ionicons name="people-circle" size={25} color="grayscale.500" />
        </Box>
        <Text
          fontSize={25}
          lineHeight={25}
          textAlignVertical="bottom"
          textAlign="justify"
          color="grayscale.500"
          style={{ paddingBottom: 5 }}
        >
          {gradeLabel({ grade: evaluation, project: false }, routeKind)}
        </Text>
        {localEvaluation && (
          <>
            <Text
              fontSize={25}
              lineHeight={25}
              textAlignVertical="bottom"
              textAlign="justify"
              color="grayscale.500"
              style={{ paddingBottom: 5 }}
            >
              /
            </Text>
            <Box style={{ paddingBottom: 7 }}>
              <Ionicons name="person-circle" size={25} color="grayscale.500" />
            </Box>
            <Text
              fontSize={25}
              lineHeight={25}
              textAlignVertical="bottom"
              textAlign="justify"
              color="grayscale.500"
              style={{ paddingBottom: 5 }}
            >
              {gradeLabel(
                { grade: localEvaluation, project: false },
                routeKind,
              )}
            </Text>
          </>
        )}
      </Pressable>
    </>
  );
};

const RouteLength = ({
  length,
  zoneId,
  routeId,
}: {
  length: number | null;
  zoneId: string;
  routeId: string;
}) => {
  const { permission } = usePermissions({ zoneId });

  const utils = trpc.useContext();

  const addLength = trpc.routes.addRouteLength.useMutation({
    onMutate: ({ routeLength }) => {
      if (!routeLength) return;
      utils.routes.byIdWithEvaluation.cancel({ routeId, zoneId });
      const previousData = utils.routes.byIdWithEvaluation.getData();
      utils.routes.byIdWithEvaluation.setData({ routeId, zoneId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          length: routeLength,
        };
      });

      return { previousData };
    },
    onError: (_, variables, context) => {
      utils.routes.byIdWithEvaluation.setData(variables, context?.previousData);
    },
    onSettled: () => {
      utils.routes.byIdWithEvaluation.invalidate({ routeId, zoneId });
    },
  });

  const editLength = trpc.routes.editRouteLength.useMutation({
    onMutate: ({ routeLength }) => {
      if (!routeLength) return;
      utils.routes.byIdWithEvaluation.cancel({ routeId, zoneId });
      const previousData = utils.routes.byIdWithEvaluation.getData();
      utils.routes.byIdWithEvaluation.setData({ routeId, zoneId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          length: routeLength,
        };
      });

      return { previousData };
    },
    onError: (error, variables, context) => {
      utils.routes.byIdWithEvaluation.setData(variables, context?.previousData);
    },
    onSettled: () => {
      utils.routes.byIdWithEvaluation.invalidate({ routeId, zoneId });
    },
  });

  if (length && permission.has("Update")) {
    return (
      <EditRouteLength
        length={length}
        onSave={(routeLength) => {
          editLength.mutate({ routeId, zoneId, routeLength });
        }}
      />
    );
  }

  if (length) {
    return (
      <Text
        fontFamily="Rubik-300"
        fontSize={20}
        lineHeight={20}
        color="grayscale.500"
      >
        {Number(length).toFixed(0) + " m"}
      </Text>
    );
  }

  if (permission.has("Create")) {
    return (
      <EditRouteLength
        length={length}
        onSave={(routeLength) => {
          addLength.mutate({ routeId, zoneId, routeLength });
        }}
      />
    );
  }

  return <Box />;
};

const EditRouteLength = ({
  onSave,
  length,
}: {
  length: number | null;
  onSave: (l: number) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [lengthValue, setLengthValue] = useState(length);
  const textInputRef = useRef<TextInputRef>(null);

  return (
    <>
      <Modal
        visible={modalVisible}
        containerProps={{
          justifyContent: "flex-start",
        }}
        top={100}
        height={300}
        width={300}
        onLayout={() => {
          textInputRef.current?.focus();
        }}
        justifyContent="space-around"
        alignItems="center"
        onDismiss={() => {
          setModalVisible(false);
        }}
      >
        <Text variant="h2">Largo de la ruta</Text>
        <TextInput
          value={lengthValue?.toString()}
          onChangeText={(text) => {
            setLengthValue(+text);
          }}
          adornmentProps={{
            endAdornment: "m",
            endAdornmentContainerProps: { justifyContent: "center" },
          }}
          ref={textInputRef}
          keyboardType="numeric"
          returnKeyType="send"
          containerProps={{
            height: 40,
            width: "30%",
            paddingLeft: "s",
          }}
        />
        <Button
          variant="infoSmall"
          px="s"
          titleVariant="p2R"
          title="Guardar"
          onPress={() => {
            if (lengthValue == null) return;
            onSave(lengthValue);
            setModalVisible(false);
          }}
        />
      </Modal>
      <TextButton
        textProps={{ fontSize: 20, lineHeight: 20 }}
        variant="info"
        onPress={() => {
          setModalVisible(true);
        }}
      >
        {typeof length === "number" ? length + "m" : "?m"}
      </TextButton>
    </>
  );
};

export default RouteScreen;
