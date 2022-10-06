import { RouteKindSchema } from "@andescalada/db/zod";
import useOwnInfo from "@hooks/useOwnInfo";
import { gradeUnits } from "@utils/climbingGrades";
import { useCallback, useEffect, useState } from "react";

const useGradeSystem = (kind?: keyof typeof RouteKindSchema.Enum) => {
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
        default:
          console.warn("No grade system found for kind", kind);
          return [];
      }
    },
    [data],
  );

  const gradeSystem = useCallback(
    (grade: number, kind: keyof typeof RouteKindSchema.Enum) => {
      const system = getGradeSystem(kind);
      return system[grade];
    },
    [getGradeSystem],
  );

  const getAllGrades = useCallback(
    (kind: keyof typeof RouteKindSchema.Enum) => {
      const gradeCount = getGradeSystem(kind).length;
      setAllGrades(Array.from(Array(gradeCount).keys()));
    },
    [getGradeSystem],
  );

  useEffect(() => {
    if (kind) getAllGrades(kind), [kind];
  }, [getAllGrades, kind]);

  return { gradeSystem, getAllGrades, allGrades, getGradeSystem };
};

export default useGradeSystem;
