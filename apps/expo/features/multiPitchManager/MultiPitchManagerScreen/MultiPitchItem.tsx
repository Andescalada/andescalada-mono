import { RouteKindSchema } from "@andescalada/db/zod";
import { A, Box, ListItem, SubItem, Text } from "@andescalada/ui";
import { routeKindLabel } from "@andescalada/utils/routeKind";
import { trpc } from "@andescalada/utils/trpc";
import {
  MultiPitchManagerNavigationProps,
  MultiPitchManagerRouteProps,
  MultiPitchManagerRoutes,
} from "@features/multiPitchManager/Navigation/types";
import useAnimatedHeight from "@hooks/useAnimatedHeight";
import useGradeSystem from "@hooks/useGradeSystem";
import { Pitch, Route, RouteGrade } from "@prisma/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import Conditional from "@utils/conditionalVars";
import parseGrade from "@utils/parseGrade";
import { Alert } from "react-native";

interface Props {
  routeKind: typeof RouteKindSchema._type;
  pitchNumber: number;
  routeGrade: RouteGrade | null;
  routeId: Route["id"];
  pitchId: Pitch["id"];
  keepOpen: string | undefined;
  setKeepOpen: (keepOpen: string) => void;
}

const MultiPitchRouteItem = ({
  pitchNumber,
  routeKind,
  routeGrade,
  routeId,
  keepOpen,
  pitchId,
  setKeepOpen,
}: Props) => {
  const { onOpen, style } = useAnimatedHeight({
    defaultOpen: keepOpen === routeId,
    maxHeight: 150,
  });
  const { gradeLabel } = useGradeSystem();

  const navigation =
    useNavigation<
      MultiPitchManagerNavigationProps<MultiPitchManagerRoutes.MultiPitchManager>
    >();

  const {
    params: { zoneId, multiPitchId },
  } =
    useRoute<
      MultiPitchManagerRouteProps<MultiPitchManagerRoutes.MultiPitchManager>
    >();

  const utils = trpc.useContext();
  const deletePitch = trpc.multiPitch.deletePitch.useMutation({
    onMutate: async ({ pitchId }) => {
      await utils.multiPitch.byId.cancel({ zoneId, multiPitchId });
      const previousData = utils.multiPitch.byId.getData({
        zoneId,
        multiPitchId,
      });
      utils.multiPitch.byId.setData({ multiPitchId, zoneId }, (old) =>
        old
          ? { ...old, Pitches: old.Pitches.filter((p) => p.id !== pitchId) }
          : old,
      );
      return { previousData };
    },
    onError: (_, { zoneId }, context) => {
      utils.multiPitch.byId.setData(
        { multiPitchId, zoneId },
        context?.previousData,
      );
    },
    onSettled: () => {
      utils.zones.invalidate();
      utils.multiPitch.invalidate();
    },
  });

  return (
    <A.Box marginBottom="m">
      <ListItem
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        onPress={() => {
          onOpen();
          setKeepOpen(routeId);
        }}
      >
        <Box>
          <Text
            variant="p2R"
            ellipsizeMode="tail"
            numberOfLines={1}
          >{`Largo ${pitchNumber}`}</Text>
          <Text variant="caption" color="grayscale.400">
            {routeKindLabel(routeKind).long}
          </Text>
        </Box>
        <Box alignItems="center" justifyContent="center">
          <Text variant="p2R">{gradeLabel(routeGrade, routeKind)}</Text>
        </Box>
      </ListItem>
      <A.Box style={style} overflow="hidden">
        <Box collapsable={Conditional.disableForAndroid}>
          <SubItem
            index={0}
            height={50}
            maxIndex={2}
            onPress={() =>
              navigation.navigate(MultiPitchManagerRoutes.EditPitch, {
                pitchId,
                zoneId,
                routeId: routeId,
                grade: parseGrade(routeGrade),
                kind: routeKind,
              })
            }
          >
            <Text variant="p2R">Editar información</Text>
          </SubItem>
          <SubItem
            index={1}
            height={50}
            maxIndex={2}
            onPress={() => console.log("hre")}
          >
            <Text variant="p2R">Editar ruta</Text>
          </SubItem>
          <SubItem
            index={2}
            height={50}
            maxIndex={2}
            onPress={() =>
              Alert.alert("Eliminar largo", "¿Estás seguro?", [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Eliminar",
                  style: "destructive",
                  onPress: () => deletePitch.mutate({ pitchId, zoneId }),
                },
              ])
            }
          >
            <Text variant="p2R" color="semantic.error">
              Eliminar largo
            </Text>
          </SubItem>
        </Box>
      </A.Box>
    </A.Box>
  );
};

export default MultiPitchRouteItem;
