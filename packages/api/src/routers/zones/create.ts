import zone from "schemas/zone";
import { protectedProcedure } from "utils/protectedProcedure";
import { slug } from "utils/slug";
import updateRedisPermissions from "utils/updatePermissions";

const create = protectedProcedure
  .input(zone.schema)
  .mutation(async ({ ctx, input }) => {
    const roleByZone = await ctx.prisma.roleByZone.create({
      data: {
        Role: { connect: { name: "Admin" } },
        User: { connect: { id: ctx.user.id } },
        Zone: {
          create: {
            name: input.name,
            slug: slug(input.name),
            searchVisibility: input.searchVisibility,
            infoAccess: input.infoAccess,
            Author: { connect: { id: ctx.user.id } },
            statusHistory: {
              create: {
                modifiedBy: { connect: { id: ctx.user.id } },
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
        AssignedBy: { connect: { id: ctx.user.id } },
      },
      select: {
        Role: { select: { permissions: { select: { action: true } } } },
        User: { select: { id: true } },
        zoneId: true,
      },
    });

    const userId = roleByZone.User.id;
    const zoneId = roleByZone.zoneId;
    const permissions = roleByZone.Role.permissions.flatMap((p) => p.action);
    const permissionSet = new Set(permissions);
    await updateRedisPermissions(ctx.access, userId, zoneId, permissionSet);

    return roleByZone;
  });

export default create;
