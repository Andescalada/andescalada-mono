import { PrismaClient, RoleNames } from "@prisma/client";

const prisma = new PrismaClient();

export default async function main() {
  const zoneAuthor = await prisma.roleByZone.findMany({
    where: { Role: { name: RoleNames.Admin } },
    select: {
      userId: true,
      zoneId: true,
      createdAt: true,
      Zone: { select: { name: true } },
    },
  });

  const authors: { createdAt: Date; userId: string; zoneId: string }[] = [];
  zoneAuthor.forEach(({ createdAt, zoneId, userId }) => {
    const currentAuthor = authors.find((author) => author.zoneId === zoneId);
    if (!currentAuthor) {
      authors.push({ createdAt, userId, zoneId });
      return;
    }
    const currentAuthorIndex = authors.findIndex(
      (author) => author.zoneId === zoneId,
    );
    if (new Date(currentAuthor.createdAt) > new Date(createdAt)) {
      authors[currentAuthorIndex] = { createdAt, userId, zoneId };
    }
  });

  for (const author of authors) {
    const updatedZone = await prisma.zone.update({
      where: { id: author.zoneId },
      data: { Author: { connect: { id: author.userId } } },
    });
    console.log(updatedZone);
  }
}
