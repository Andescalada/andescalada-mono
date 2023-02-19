import { RouteKindSchema } from "@andescalada/db/zod";
import { A, Box, ListItem, SubItem, Text } from "@andescalada/ui";
import { routeKindLabel } from "@andescalada/utils/routeKind";
import useAnimatedHeight from "@hooks/useAnimatedHeight";
import useGradeSystem from "@hooks/useGradeSystem";
import { RouteGrade } from "@prisma/client";
import Conditional from "@utils/conditionalVars";

interface Props {
  routeKind: typeof RouteKindSchema._type;
  pitchNumber: number;
  routeGrade: RouteGrade | null;
}

const MultiPitchRouteItem = ({ pitchNumber, routeKind, routeGrade }: Props) => {
  const { onOpen, style } = useAnimatedHeight({
    defaultOpen: false,
    maxHeight: 100,
  });
  const { gradeLabel } = useGradeSystem();

  return (
    <A.Box marginBottom="m">
      <ListItem
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        onPress={onOpen}
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
            maxIndex={1}
            onPress={() => console.log("in here")}
          >
            <Text variant="p2R">Editar información</Text>
          </SubItem>
          <SubItem
            index={1}
            height={50}
            maxIndex={1}
            onPress={() => console.log("hre")}
          >
            <Text variant="p2R">Editar ruta</Text>
          </SubItem>
        </Box>
      </A.Box>
    </A.Box>
  );
};

export default MultiPitchRouteItem;
