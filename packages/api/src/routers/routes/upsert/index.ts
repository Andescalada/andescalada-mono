import routeSchema from "@andescalada/api/schemas/route";
import upsertExtension from "@andescalada/api/src/routers/routes/upsert/upsertExtension";
import upsertRoute from "@andescalada/api/src/routers/routes/upsert/upsertRoute";
import upsertVariant from "@andescalada/api/src/routers/routes/upsert/upsertVariant";
import { protectedZoneProcedure } from "@andescalada/api/src/utils/protectedZoneProcedure";

const upsert = protectedZoneProcedure
  .input(routeSchema.upsertRoute)
  .mutation(async ({ ctx, input }) => {
    const extensionInputs = routeSchema.addExtension.safeParse(input);
    if (extensionInputs.success) {
      return upsertExtension({ ctx, input: extensionInputs.data });
    }

    const variantInputs = routeSchema.addVariant.safeParse(input);
    if (variantInputs.success) {
      return upsertVariant({ ctx, input: variantInputs.data });
    }

    return upsertRoute({ ctx, input });
  });

export default upsert;
