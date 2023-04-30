import { GradeSystemsSchema, RouteKindSchema } from "@andescalada/db/zod";

export const gradeUnitsByRouteKind = {
  [RouteKindSchema.Enum.Boulder]: [
    GradeSystemsSchema.Enum.Hueco,
    GradeSystemsSchema.Enum.French,
  ],
  [RouteKindSchema.Enum.Sport]: [
    GradeSystemsSchema.Enum.French,
    GradeSystemsSchema.Enum.Yosemite,
  ],
  [RouteKindSchema.Enum.Trad]: [
    GradeSystemsSchema.Enum.French,
    GradeSystemsSchema.Enum.Yosemite,
  ],
  [RouteKindSchema.Enum.Mixed]: [GradeSystemsSchema.Enum.Mixed],
  [RouteKindSchema.Enum.Ice]: [GradeSystemsSchema.Enum.Ice],
  [RouteKindSchema.Enum.Aid]: [GradeSystemsSchema.Enum.Aid],
};

export const gradeUnits = {
  [GradeSystemsSchema.Enum.French]: [
    "1",
    "2",
    "2a",
    "3",
    "4a",
    "4b",
    "4c",
    "4d",
    "5a",
    "5b",
    "5c",
    "6a",
    "6a+",
    "6b",
    "6b+",
    "6c",
    "6c+",
    "7a",
    "7a+",
    "7b",
    "7b+",
    "7c",
    "7c+",
    "8a",
    "8a+",
    "8b",
    "8b+",
    "8c",
    "8c+",
    "9a",
    "9a+",
    "9b",
    "9b+",
    "9c",
    "10a",
  ],
  [GradeSystemsSchema.Enum.Yosemite]: [
    "5",
    "5.1",
    "5.2",
    "5.3",
    "5.4",
    "5.5",
    "5.6",
    "5.7",
    "5.8",
    "5.9",
    "5.10a",
    "5.10b",
    "5.10c",
    "5.10d",
    "5.11a",
    "5.11b",
    "5.11c",
    "5.11d",
    "5.12a",
    "5.12b",
    "5.12c",
    "5.12d",
    "5.13a",
    "5.13b",
    "5.13c",
    "5.13d",
    "5.14a",
    "5.14b",
    "5.14c",
    "5.14d",
    "5.15a",
    "5.15b",
    "5.15c",
    "5.15d",
    "5.16a",
  ],
  [GradeSystemsSchema.Enum.Hueco]: [
    "V0",
    "V1",
    "V2",
    "V3",
    "V4",
    "V5",
    "V6",
    "V7",
    "V8",
    "V9",
    "V10",
    "V11",
    "V12",
    "V13",
    "V14",
    "V15",
    "V16",
    "V17",
    "V18",
  ],
  [GradeSystemsSchema.Enum.Ice]: [
    "WI0",
    "WI1",
    "WI2",
    "WI3",
    "WI4",
    "WI5",
    "WI6",
    "WI7",
    "WI8",
  ],
  [GradeSystemsSchema.Enum.Mixed]: [
    "M1",
    "M2",
    "M3",
    "M4",
    "M5",
    "M6",
    "M7",
    "M8",
    "M9",
    "M10",
    "M11",
    "M12",
  ],
  [GradeSystemsSchema.Enum.Aid]: [
    "A0",
    "A1",
    "A2",
    "A2+",
    "A3",
    "A3+",
    "A4",
    "A4+",
    "A5",
    "A5+",
    "A6",
  ],
};
