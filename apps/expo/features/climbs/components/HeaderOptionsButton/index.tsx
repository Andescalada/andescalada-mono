import { Box, SemanticButton } from "@andescalada/ui";
import {
  ClimbsNavigationRoutes,
  ClimbsNavigationScreenProps,
} from "@features/climbs/Navigation/types";
import usePermissions from "@hooks/usePermissions";
import { CompositeScreenProps, useRoute } from "@react-navigation/native";
import { ComponentProps, FC } from "react";

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
  const { permission } = usePermissions({ zoneId: route.params.zoneId });
  if (permission === undefined) return null;
  return permission.has("Create") ? (
    <SemanticButton
      variant={cancel ? "error" : "info"}
      title={editing ? (cancel ? "Cancelar" : "Guardar") : "Opciones"}
      onPress={editing ? onSave : onOptions}
      onLongPress={() => {
        if (editing) setCancel(true);
      }}
    />
  ) : (
    <Box />
  );
};

export default HeaderOptionsButton;
