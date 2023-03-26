import zone from "@andescalada/api/schemas/zone";
import { protectedProcedure } from "@andescalada/api/src/utils/protectedProcedure";
import { slug } from "@andescalada/api/src/utils/slug";
import updateRedisPermissions from "@andescalada/api/src/utils/updatePermissions";

const create = protectedProcedure
  .input(zone.schema)
  .mutation(async ({ ctx, input }) => {
    const roleByZone = await ctx.prisma.roleByZone.create({
      data: {
        Role: { connect: { name: "Admin" } },
        User: { connect: { email: ctx.user.email } },
        Zone: {
          create: {
            name: input.name,
            slug: slug(input.name),
            searchVisibility: input.searchVisibility,
            infoAccess: input.infoAccess,
            Author: { connect: { email: ctx.user.email } },
            statusHistory: {
              create: {
                modifiedBy: { connect: { email: ctx.user.email } },
                status: "Unpublished",
                message: {
                  create: {
                    originalText: "Recién creada",
                    originalLang: { connect: { languageId: "es" } },
                  },
                },
              },
            },
          },
        },
        AssignedBy: { connect: { email: ctx.user.email } },
      },
      select: {
        Role: { select: { permissions: { select: { action: true } } } },
        User: { select: { email: true } },
        zoneId: true,
      },
    });

    const email = roleByZone.User.email;
    const zoneId = roleByZone.zoneId;
    const permissions = roleByZone.Role.permissions.flatMap((p) => p.action);
    const permissionSet = new Set(permissions);
    await updateRedisPermissions(ctx.access, email, zoneId, permissionSet);

    return roleByZone;
  });

export default create;
