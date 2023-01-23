module.exports = {};

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authorEmail = "elevy@andescalada.org";

const agreements: Prisma.AgreementCreateInput[] = [
  {
    title: {
      create: {
        originalText: "Se permiten mascotas",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText:
          "Tus mascotas son bienvenidas en esta zona de escalada. Se responsable y respetuoso.",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Pets",
    icon: "dog",
  },
  {
    title: {
      create: {
        originalText: "No se permiten mascotas",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText:
          "Lamentamos que tus mascotas no puedan acompañarte en esta zona de escalada.",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Pets",
    icon: "no-dog",
  },
  {
    title: {
      create: {
        originalText: "No se permite acampar",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText: "No esta permitido acampar en esta zona de escalada",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Camping",
    icon: "no-camping",
  },
  {
    title: {
      create: {
        originalText: "Permitido acampar",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText:
          "Es posible acampar en esta zona de escalada respetando las reglas.",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Camping",
    icon: "camping",
  },
  {
    title: {
      create: {
        originalText: "No hacer fuego",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText: "No esta permitido hacer fuego en esta zona de escalada.",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Fire",
    icon: "no-fire",
  },
  {
    title: {
      create: {
        originalText: "Permitido hacer fuego",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText:
          "Está permitido hacer fuego en zonas designadas, recuerda dejarlo bien apagado.",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Fire",
    icon: "fire",
  },
  {
    title: {
      create: {
        originalText: "Acceso pagado",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText:
          "Es necesario pagar para acceder a esta zona de escalada.",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Payment",
    icon: "paid-hands",
  },
  {
    title: {
      create: {
        originalText: "Acceso libre",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText:
          "No es necesario pagar para acceder a esta zona de escalada.",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Payment",
    icon: "shake-hands",
  },
  {
    title: {
      create: {
        originalText: "Usa el baño habilitado",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText:
          "Existe un baño habilitado para que hagas tus necesidades.",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Toilet",
    icon: "toilet",
  },
  {
    title: {
      create: {
        originalText: "No hay baño, no dejes rastro",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    description: {
      create: {
        originalText:
          "No existe un baño habilitado, por favor no dejes rastro. Entierra o llévate tus caca.",
        originalLang: { connect: { languageId: "es" } },
      },
    },
    Author: { connect: { email: authorEmail } },
    classic: "Toilet",
    icon: "poop-bag",
  },
];

async function main() {
  console.log("Creating agreements...");

  for (const agreement of agreements) {
    await prisma.agreement.create({
      data: agreement,
    });
  }

  console.log("Agreements created!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
