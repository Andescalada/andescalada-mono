import { SearchVisibilitySchema } from "@andescalada/db/zod";

const searchVisibilityAssets = {
  [SearchVisibilitySchema.enum.Listed]: {
    label: "Listada",
    description:
      "Recomendada: La zona aparecerá en las búsquedas y listas públicas.",
  },
  [SearchVisibilitySchema.enum.Unlisted]: {
    label: "Sin listar",
    description:
      "No recomendada: La zona no aparecerá en las búsquedas y listas públicas, solo podrá ser compartida por enlace.",
  },
} satisfies {
  [key in typeof SearchVisibilitySchema._type]: any;
};

export default searchVisibilityAssets;
