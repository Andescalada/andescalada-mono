import { Box, Pressable, SemanticButton } from "@andescalada/ui";
import { Entypo } from "@expo/vector-icons";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import { useAppTheme } from "@hooks/useAppTheme";
import usePermissions from "@hooks/usePermissions";
import { CompositeScreenProps, useRoute } from "@react-navigation/native";
import { ComponentProps, FC, useMemo } from "react";

type Route = CompositeScreenProps<
  ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Zone>,
  CompositeScreenProps<
    ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Sector>,
    ClimbsNavigationScreenProps<ClimbsNavigationRoutes.Wall>
  >
>["route"];

interface Props
  extends Omit<ComponentProps<typeof SemanticButton>, "title" | "variant"> {
  editing: boolean;
  cancel: boolean;
  setCancel: (b: boolean) => void;
  onSave: (args?: unknown) => void;
  onOptions: (args?: unknown) => void | (() => void);
}

const HeaderOptionsButton: FC<Props> = ({
  cancel,
  editing,
  setCancel,
  onSave,
  onOptions,
}) => {
  const route = useRoute<Route>();
  const theme = useAppTheme();
  const { permission } = usePermissions({ zoneId: route.params.zoneId });

  const icon = useMemo(() => {
    if (cancel) return "cross";
    if (editing) return "check";
    return "dots-three-horizontal";
  }, [editing, cancel]);
  const backgroundColor = useMemo(() => {
    if (cancel) return "semantic.error";
    if (editing) return "semantic.success";
    return undefined;
  }, [editing, cancel]);

  if (permission === undefined) return <Box />;
  return permission.has("Create") ? (
    <Pressable
      onPress={editing ? onSave : onOptions}
      backgroundColor={backgroundColor}
      width={40}
      height={40}
      justifyContent="center"
      alignItems="center"
      borderRadius={40}
      onLongPress={() => {
        if (editing) setCancel(true);
      }}
    >
      <Entypo name={icon} size={24} color={theme.colors["grayscale.100"]} />
    </Pressable>
  ) : (
    <Box />
  );
};

export default HeaderOptionsButton;
