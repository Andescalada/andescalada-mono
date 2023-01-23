import { ClassicAgreementSchema } from "@andescalada/db/zod";

interface Assets {
  title: string;
}

type ClassicAgreementKeys = {
  [key in typeof ClassicAgreementSchema._type]: Assets;
};

const classicAgreementAssets: ClassicAgreementKeys = {
  [ClassicAgreementSchema.enum.Camping]: {
    title: "Sobre acampar",
  },
  [ClassicAgreementSchema.enum.Fire]: {
    title: "Sobre hacer fuego",
  },
  [ClassicAgreementSchema.enum.Payment]: {
    title: "Sobre cobros",
  },
  [ClassicAgreementSchema.enum.Toilet]: {
    title: "Sobre baños",
  },
  [ClassicAgreementSchema.enum.Pets]: {
    title: "Sobre mascotas",
  },
};

export default classicAgreementAssets;
