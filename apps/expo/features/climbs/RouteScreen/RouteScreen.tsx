import { AppRouter } from "@andescalada/api/src/routers/_app";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import {
  A,
  ActivityIndicator,
  Box,
  Button,
  Header,
  Modal,
  Pressable,
  Screen,
  Text,
  TextButton,
  TextInput,
} from "@andescalada/ui";
import { trpc } from "@andescalada/utils/trpc";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { RoutesManagerNavigationRoutes } from "@features/routesManager/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import useDebounce from "@hooks/useDebounce";
import useGradeSystem from "@hooks/useGradeSystem";
import usePermissions from "@hooks/usePermissions";
import useRootNavigation from "@hooks/useRootNavigation";
import { RootNavigationRoutes } from "@navigation/AppNavigation/RootNavigation/types";
import { useNavigation } from "@react-navigation/native";
import { inferProcedureOutput } from "@trpc/server";
import React, { FC, useRef, useState } from "react";
import type { TextInput as TextInputRef } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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

  if (!data || isLoading || !evaluation)
    return (
      <Screen padding="m">
        <Header title={routeName} onGoBack={navigation.goBack} />
        <Box flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </Box>
      </Screen>
    );
  return (
    <Screen padding="m">
      <Header title={routeName} onGoBack={navigation.goBack} />
      <RouteContainer
        route={data}
        evaluationValue={evaluation.value}
        zoneId={zoneId}
        routeId={routeId}
      />
    </Screen>
  );
};

const RouteContainer = ({
  route,
  evaluationValue,
  zoneId,
  routeId,
}: {
  route: Route;
  evaluationValue: number;
  zoneId: string;
  routeId: string;
}) => {
  const rootNavigation = useRootNavigation();
  const { gradeLabel, changeGradeSystem } = useGradeSystem();

  return (
    <Box flex={1}>
      <Box flexDirection="row">
        <Box flex={1} flexDirection="row" alignItems="center">
          <Pressable padding="s" onPress={changeGradeSystem}>
            <Text fontSize={40} lineHeight={50}>
              {gradeLabel(route.RouteGrade, route.kind)}
            </Text>
            <Text>{routeKindLabel(route.kind).long}</Text>
          </Pressable>
          <Box>
            <RouteLength
              length={route.length}
              zoneId={zoneId}
              routeId={routeId}
            />
          </Box>
        </Box>
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
      <RouteEvaluation
        evaluationValue={evaluationValue}
        routeId={routeId}
        evaluationAverage={route.evaluation.average}
        evaluationCount={route.evaluation.count}
      />
      <RouteDescription
        description={route.description}
        zoneId={zoneId}
        routeId={routeId}
      />
    </Box>
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
      <Box mt="m" padding="m" bg="backgroundContrast" borderRadius={16}>
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
  routeId,
  evaluationAverage,
  evaluationCount,
}: {
  evaluationValue: number;
  routeId: string;
  evaluationAverage: number;
  evaluationCount: number;
}) => {
  const [evaluation, setEvaluation] = useState(evaluationValue);
  const theme = useAppTheme();

  const utils = trpc.useContext();
  const addOrEditEvaluation = trpc.routes.addOrEditEvaluation.useMutation({
    onSuccess: ({ routeId }) => {
      utils.routes.evaluationById.invalidate({ routeId });
      utils.routes.byIdWithEvaluation.invalidate({ routeId });
    },
  });

  const hasMutated = useSharedValue(false);

  const mutate = (evaluation: number, routeId: string) => {
    hasMutated.value = true;
    addOrEditEvaluation.mutate({
      routeId,
      evaluation,
    });
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
    <Box mt="m" alignItems="flex-start">
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
            lineHeight={0}
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
          titleVariant="p1R"
          title="Guardar"
          onPress={() => {
            if (lengthValue == null) return;
            onSave(lengthValue);
            setModalVisible(false);
          }}
        />
      </Modal>
      <TextButton
        textProps={{ fontSize: 20 }}
        variant="info"
        onPress={() => {
          setModalVisible(true);
        }}
      >
        {length !== null ? length + "m" : "?m"}
      </TextButton>
    </>
  );
};

export default RouteScreen;
