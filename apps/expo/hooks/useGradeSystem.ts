import { GradeSystemsSchema, RouteKindSchema } from "@andescalada/db/zod";
import useOwnInfo from "@hooks/useOwnInfo";
import { RouteGrade } from "@prisma/client";
import { gradeUnits } from "@utils/climbingGrades";
import { useCallback, useEffect, useState } from "react";

const useGradeSystem = (kind?: typeof RouteKindSchema._type) => {
  const { data } = useOwnInfo();

  const [allGrades, setAllGrades] = useState<number[]>([]);
  const getGradeSystem = useCallback(
    (kind: keyof typeof RouteKindSchema.Enum) => {
      if (!data) return [];
      switch (kind) {
        case RouteKindSchema.Enum.Boulder:
          return gradeUnits[data.preferredBoulderGrade];
        case RouteKindSchema.Enum.Sport:
          return gradeUnits[data.preferredSportGrade];
        case RouteKindSchema.Enum.Trad:
          return gradeUnits[data.preferredTradGrade];
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
    },
    [data],
  );

  const gradeSystem = useCallback(
    (grade: number, kind: typeof RouteKindSchema._type) => {
      const system = getGradeSystem(kind);
      return system[grade];
    },
    [getGradeSystem],
  );

  const gradeLabel = useCallback(
    (grade: RouteGrade | null, kind: typeof RouteKindSchema._type) => {
      if (!grade) return "?";
      const n = grade.grade;
      const project = grade.project;
      if (project) return "Proyecto";
      return typeof n === "number" ? gradeSystem(n, kind) : "?";
    },
    [gradeSystem],
  );

  const getAllGrades = useCallback(
    (kind: keyof typeof RouteKindSchema.Enum) => {
      const gradeCount = getGradeSystem(kind).length;
      setAllGrades(Array.from(Array(gradeCount).keys()));
    },
    [getGradeSystem],
  );

  const getSystem = useCallback(
    (kind: typeof RouteKindSchema._type) => {
      if (!data) return undefined;
      switch (kind) {
        case RouteKindSchema.Enum.Boulder:
          return data.preferredBoulderGrade;
        case RouteKindSchema.Enum.Sport:
          return data.preferredSportGrade;
        case RouteKindSchema.Enum.Trad:
          return data.preferredTradGrade;
        case RouteKindSchema.Enum.Mixed:
          return GradeSystemsSchema.Enum.Mixed;
        case RouteKindSchema.Enum.Ice:
          return GradeSystemsSchema.Enum.Ice;
        case RouteKindSchema.Enum.Aid:
          return GradeSystemsSchema.Enum.Aid;
        default:
          console.warn("No grade system found for kind", kind);
          return undefined;
      }
    },
    [data],
  );

  useEffect(() => {
    if (kind) getAllGrades(kind), [kind];
  }, [getAllGrades, kind]);

  return {
    gradeSystem,
    getAllGrades,
    allGrades,
    getGradeSystem,
    gradeLabel,
    getSystem,
  };
};

export default useGradeSystem;
