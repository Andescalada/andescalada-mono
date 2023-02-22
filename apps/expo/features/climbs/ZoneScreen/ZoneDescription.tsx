import { Box, Text, TextButton } from "@andescalada/ui";
import {
  ClimbsNavigationNavigationProps,
  ClimbsNavigationRouteProps,
  ClimbsNavigationRoutes,
} from "@features/climbs/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

interface Props {
  description?: string;
}

const ZoneDescription = ({ description }: Props) => {
  const [showMore, setShowMore] = useState(false);
  const navigation =
    useNavigation<
      ClimbsNavigationNavigationProps<ClimbsNavigationRoutes.Zone>
    >();
  const {
    params: { zoneId, zoneName },
  } = useRoute<ClimbsNavigationRouteProps<ClimbsNavigationRoutes.Zone>>();

  const { permission } = usePermissions({ zoneId });
  if (!description && permission.has("Create"))
    return (
      <Box paddingVertical="m">
        <TextButton
          variant="info"
          onPress={() =>
            navigation.navigate(ClimbsNavigationRoutes.AddAndEditDescription, {
              zoneId,
              zoneName,
            })
          }
        >
          Agrega una descripción
        </TextButton>
      </Box>
    );
  if (!description && !permission.has("Create")) return <Box />;
  return (
    <Box paddingVertical="s">
      <Text
        variant="p3R"
        numberOfLines={showMore ? undefined : 2}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
      <TextButton
        alignSelf="flex-end"
        onPress={() => setShowMore((prev) => !prev)}
        variant="transparent"
      >
        {showMore ? "menos" : "más"}
      </TextButton>
    </Box>
  );
};

export default ZoneDescription;
