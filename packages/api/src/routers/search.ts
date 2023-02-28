import { SearchType } from "@andescalada/api/schemas/search";
import { isDefined } from "@andescalada/api/src/utils/filterGuards";
import { SearchVisibility, SoftDelete, Status } from "@prisma/client";
import { z } from "zod";

import { t } from "../createRouter";

export const searchRouter = t.router({
  all: t.procedure.input(z.string().min(2)).mutation(async ({ ctx, input }) => {
    const zones = ctx.prisma.zone
      .findMany({
        where: {
          name: { contains: input },
          isDeleted: SoftDelete.NotDeleted,
          currentStatus: Status.Published,
          SearchVisibility: SearchVisibility.Listed,
        },
        select: { id: true, name: true, slug: true },
      })
      .then((results) =>
        results.map(({ id, name, slug }) => ({
          id,
          name,
          slug,
          detail: "Chile",
          navigationParams: { zoneId: id, zoneName: name }, // TODO: Placeholder, add region to zones
          type: SearchType.Zone,
        })),
      );

    const sectors = ctx.prisma.sector
      .findMany({
        where: {
          name: { contains: input },
          isDeleted: SoftDelete.NotDeleted,
          Zone: { currentStatus: "Published" },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          Zone: { select: { name: true, id: true } },
        },
      })
      .then((results) =>
        results.map(({ id, name, slug, ...result }) => ({
          id,
          name,
          slug,
          detail: result.Zone.name,
          navigationParams: {
            zoneId: result.Zone.id,
            sectorId: id,
            sectorName: name,
          },
          type: SearchType.Sector,
        })),
      );

    const walls = ctx.prisma.wall
      .findMany({
        where: {
          name: { contains: input },
          isDeleted: SoftDelete.NotDeleted,
          Sector: { Zone: { currentStatus: "Published" } },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          Sector: {
            select: {
              id: true,
              name: true,
              Zone: { select: { name: true, id: true } },
            },
          },
        },
      })
      .then((results) =>
        results.map(({ id, name, slug, ...result }) => ({
          id,
          name,
          slug,
          detail: `${result.Sector.name}, ${result.Sector.Zone.name}`,
          navigationParams: {
            wallId: id,
            wallName: name,
            sectorId: result.Sector.id,
            zoneId: result.Sector.Zone.id,
          },
          type: SearchType.Wall,
        })),
      );

    const routes = ctx.prisma.route
      .findMany({
        where: {
          name: { contains: input },
          isDeleted: SoftDelete.NotDeleted,
          Wall: {
            Sector: {
              Zone: {
                currentStatus: "Published",
                SearchVisibility: SearchVisibility.Listed,
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          Wall: {
            select: {
              name: true,
              id: true,
              Sector: {
                select: {
                  id: true,
                  name: true,
                  Zone: { select: { name: true, id: true, slug: true } },
                },
              },
            },
          },
        },
      })
      .then((results) =>
        results.map(({ id, name, slug, ...result }) => ({
          id,
          name,
          slug,
          detail: `${result.Wall.name}, ${result.Wall.Sector.name}, ${result.Wall.Sector.Zone.name}`,
          navigationParams: {
            wallId: result.Wall.id,
            wallName: result.Wall.name,
            sectorId: result.Wall.Sector.id,
            zoneId: result.Wall.Sector.Zone.id,
          },
          type: SearchType.Route,
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
