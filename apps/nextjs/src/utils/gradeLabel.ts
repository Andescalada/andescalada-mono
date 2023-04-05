import { gradeUnits } from "@andescalada/common-assets/climbingGrades";
import { GradeSystemsSchema, RouteKindSchema } from "@andescalada/db/zod";
import { RouteGrade } from "@prisma/client";

const gradeLabel = (
  grade: RouteGrade | null,
  kind: typeof RouteKindSchema._type,
) => {
  if (!grade) return "?";
  const n = grade.grade;
  const project = grade.project;
  if (project) return "Proyecto";
  return typeof n === "number" ? gradeSystem(n, kind) : "?";
};

export default gradeLabel;

const gradeSystem = (grade: number, kind: typeof RouteKindSchema._type) => {
  const system = getGradeSystem(kind);
  return system[grade];
};

const getGradeSystem = (kind: keyof typeof RouteKindSchema.Enum) => {
  switch (kind) {
    case RouteKindSchema.Enum.Boulder:
      return gradeUnits[GradeSystemsSchema.enum.Hueco];
    case RouteKindSchema.Enum.Sport:
      return gradeUnits[GradeSystemsSchema.enum.French];
    case RouteKindSchema.Enum.Trad:
      return gradeUnits[GradeSystemsSchema.enum.Yosemite];
    case RouteKindSchema.Enum.Mixed:
      return gradeUnits.Mixed;
    case RouteKindSchema.Enum.Ice:
      return gradeUnits.Ice;
    case RouteKindSchema.Enum.Aid:
      return gradeUnits.Aid;
    default:
      console.warn("No grade system found for kind", kind);
      return [];
  }
};
