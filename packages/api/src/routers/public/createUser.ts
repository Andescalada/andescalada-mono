import { t } from "@andescalada/api/src/createRouter";
import { z } from "zod";

const email = z.object({
  identifier: z.literal("email"),
  email: z.string(),
});

const phoneNumber = z.object({
  identifier: z.literal("phoneNumber"),
  fullNumber: z.string(),
  phoneNumber: z.string().optional(),
  country: z.string().optional(),
  countryCode: z.string().optional(),
});

const identifier = email.passthrough().or(phoneNumber);

export const createUser = t.procedure
  .input(identifier)
  .mutation(async ({ ctx, input }) => {
    if (input.identifier === "email") {
      const existingUser = await ctx.prisma.user.findUnique({
        where: { email: input.email },
        select: { id: true },
      });
      if (existingUser) return true;
      await ctx.prisma.user.create({
        data: {
          email: input.email,
        },
      });
      return true;
    }
    if (input.identifier === "phoneNumber") {
      const existingPhoneNumber = await ctx.prisma.phoneNumber.findUnique({
        where: {
          fullNumber: `+${input.country}${input.phoneNumber}`,
        },
        select: { id: true },
      });
      if (existingPhoneNumber) return true;
      await ctx.prisma.user.create({
        data: {
          PhoneNumber: {
            create: {
              country: input.country,
              fullNumber: input.fullNumber,
              countryCode: input.countryCode,
              number: input.phoneNumber,
            },
          },
        },
      });
      return true;
    }
    return false;
  });
