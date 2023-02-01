module.exports = {};

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Bounds {
  southWest: Coordinates;
  northEast: Coordinates;
}

export default async function main() {
  const bound: Bounds = {
    northEast: { latitude: -46.486554263329, longitude: -71.64573659250718 },
    southWest: { latitude: -46.60588291665627, longitude: -71.73179717800606 },
  };

  let condition: Prisma.LocationFindManyArgs["where"] = {};
  if (bound.northEast.latitude > bound.southWest.latitude) {
    condition = {
      ...condition,
      latitude: {
        gte: bound.southWest.latitude,
        lte: bound.northEast.latitude,
      },
    };
  } else {
    condition = {
      ...condition,
      latitude: {
        gte: bound.northEast.latitude,
        lte: bound.southWest.latitude,
      },
    };
  }
  if (bound.northEast.longitude > bound.southWest.longitude) {
    condition = {
      ...condition,
      longitude: {
        gte: bound.southWest.longitude,
        lte: bound.northEast.longitude,
      },
    };
  } else {
    condition = {
      ...condition,
      longitude: {
        gte: bound.northEast.longitude,
        lte: bound.southWest.longitude,
      },
    };
  }

  console.log(condition);

  const result = await prisma.location.findMany({
    where: {
      AND: condition,
    },
    select: { Zone: { select: { name: true } } },
  });

  console.log(JSON.stringify(result));
}
