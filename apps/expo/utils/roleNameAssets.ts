import { RoleNamesSchema } from "@andescalada/db/zod";
import { Colors } from "@andescalada/ui";

type RoleNameAssets = {
  [key in typeof RoleNamesSchema._type]: {
    color: Colors;
    label: string;
    plural: string;
  };
};

const roleNameAssets = {
  [RoleNamesSchema.Enum.Admin]: {
    color: "brand.primaryA",
    label: "Administrador",
    plural: "Administradoras",
  },
  [RoleNamesSchema.Enum.Reviewer]: {
    color: "brand.primaryB",
    label: "Revisor",
    plural: "Revisoras",
  },
  [RoleNamesSchema.Enum.Collaborator]: {
    color: "brand.secondaryA",
    label: "Colaborador",
    plural: "Colaboradoras",
  },
  [RoleNamesSchema.Enum.Reader]: {
    color: "brand.secondaryB",
    label: "Lector",
    plural: "Lectoras",
  },
  [RoleNamesSchema.Enum.Member]: {
    color: "brand.secondaryB",
    label: "Miembro",
    plural: "Miembros",
  },
  [RoleNamesSchema.Enum.Editor]: {
    color: "brand.primaryA",
    label: "Editor",
    plural: "Editoras",
  },
} satisfies RoleNameAssets;

export default roleNameAssets;
