import { InfoAccessSchema, RoleNamesSchema } from "@andescalada/db/zod";
import { Colors } from "@andescalada/ui";

type RoleNameAssets = {
  [key in typeof RoleNamesSchema._type]: {
    color: Colors;
    label: string;
    plural: string;
    description?: string;
    availableFor?: typeof InfoAccessSchema._type[];
  };
};

const { Community, Private, Public } = InfoAccessSchema.Enum;

const roleNameAssets: RoleNameAssets = {
  [RoleNamesSchema.Enum.Admin]: {
    color: "brand.primaryA",
    label: "Administrador",
    plural: "Administradoras",
    description:
      "Puede agregar, editar y eliminar cualquier contenido, puede modificar los acuerdos de la comunidad y puede modificar los roles de los miembros de la comunidad. Puede agregar, rechazar o revocar cualquier acceso a un usuario para la guía",
    availableFor: [Community, Private, Public],
  },
  [RoleNamesSchema.Enum.Reviewer]: {
    color: "brand.primaryB",
    label: "Revisor",
    plural: "Revisoras",
    description:
      "Aprueba o rechaza la publicación de la zona, puede despublicar una zona publicada",
    availableFor: [],
  },
  [RoleNamesSchema.Enum.Editor]: {
    color: "brand.primaryA",
    label: "Editor",
    plural: "Editoras",
    description: "Puede agregar, editar y eliminar cualquier contenido",
    availableFor: [Community, Private, Public],
  },
  [RoleNamesSchema.Enum.Collaborator]: {
    color: "brand.secondaryA",
    label: "Colaborador",
    plural: "Colaboradoras",
    description:
      "Puede agregar contenido y eliminar o editar el contenido propio, no puede eliminar ni editar contenido de otros",
    availableFor: [Community, Private, Public],
  },
  [RoleNamesSchema.Enum.Member]: {
    color: "brand.secondaryB",
    label: "Miembro",
    plural: "Miembros",
    description:
      "Puede leer el contenido de la guía. Puede agregar usuarios a la guía",
    availableFor: [],
  },
  [RoleNamesSchema.Enum.Reader]: {
    color: "brand.secondaryB",
    label: "Lector",
    plural: "Lectoras",
    description: "Puede leer el contenido de la guía",
    availableFor: [],
  },
};

export default roleNameAssets;
