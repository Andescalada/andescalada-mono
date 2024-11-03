import upsertExtension from "routers/routes/upsert/upsertExtension";
import upsertRoute from "routers/routes/upsert/upsertRoute";
import upsertVariant from "routers/routes/upsert/upsertVariant";
import routeSchema from "schemas/route";
import { protectedZoneProcedure } from "utils/protectedZoneProcedure";

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

    return upsertRoute({ ctx, input, zoneId: input.zoneId });
  });

export default upsert;
