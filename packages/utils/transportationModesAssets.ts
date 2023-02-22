import { TransportationModeSchema } from "@andescalada/db/zod";

type TransportationModeAssets = {
  [key in typeof TransportationModeSchema._type]: {
    label: string;
  };
};

const transportationModeAssets: TransportationModeAssets = {
  [TransportationModeSchema.Enum.Car]: {
    label: "Automóvil",
  },
  [TransportationModeSchema.Enum.Bike]: {
    label: "Bicicleta",
  },
  [TransportationModeSchema.Enum.Walk]: {
    label: "A pie",
  },
  [TransportationModeSchema.Enum.PublicTransport]: {
    label: "Transporte público",
  },
  [TransportationModeSchema.Enum.Train]: {
    label: "Tren",
  },
  [TransportationModeSchema.Enum.Other]: {
    label: "Otro",
  },
};

export default transportationModeAssets;
