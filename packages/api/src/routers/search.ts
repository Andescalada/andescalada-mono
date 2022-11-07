import { isDefined } from "@andescalada/api/src/utils/isDefined";
import { z } from "zod";

import { t } from "../createRouter";

export const searchRouter = t.router({
  all: t.procedure.input(z.string().min(2)).mutation(async ({ ctx, input }) => {
    const zones = ctx.prisma.zone
      .findMany({
        where: { name: { contains: input } },
        select: { id: true, name: true },
      })
      .then((results) =>
        results.map(({ id, name }) => ({
          id,
          name,
          detail: "Chile", // TODO: Placeholder, add region to zones
          type: "zone" as const,
        })),
      );

    const sectors = ctx.prisma.sector
      .findMany({
        where: { name: { contains: input } },
        select: { id: true, name: true, Zone: { select: { name: true } } },
      })
      .then((results) =>
        results.map(({ id, name, ...result }) => ({
          id,
          name,
          detail: result.Zone.name,
          type: "sector" as const,
        })),
      );

    const walls = ctx.prisma.wall
      .findMany({
        where: { name: { contains: input } },
        select: {
          id: true,
          name: true,
          Sector: { select: { name: true, Zone: { select: { name: true } } } },
        },
      })
      .then((results) =>
        results.map(({ id, name, ...result }) => ({
          id,
          name,
          detail: `${result.Sector.name}, ${result.Sector.Zone.name}`,
          type: "wall" as const,
        })),
      );

    const routes = ctx.prisma.route
      .findMany({
        where: { name: { contains: input } },
        select: {
          id: true,
          name: true,
          Wall: {
            select: {
              name: true,
              Sector: {
                select: { name: true, Zone: { select: { name: true } } },
              },
            },
          },
        },
      })
      .then((results) =>
        results.map(({ id, name, ...result }) => ({
          id,
          name,
          detail: `${result.Wall.name}, ${result.Wall.Sector.name}, ${result.Wall.Sector.Zone.name}`,
          type: "route" as const,
        })),
      );

    const search = await Promise.allSettled([zones, sectors, walls, routes]);

    return search
      .map((item) => {
        if (item.status === "fulfilled") return item.value.flatMap((i) => i);
        return undefined;
      })
      .filter(isDefined)
      .flatMap((i) => i);
  }),
});
