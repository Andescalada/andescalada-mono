import {
  gradeConversion,
  gradeUnits,
  gradeUnitsByRouteKind,
} from "@andescalada/common-assets/climbingGrades";
import { RouteGrade } from "@andescalada/db";
import { GradeSystemsSchema, RouteKindSchema } from "@andescalada/db/zod";
import useGetGradeSystemsQuery from "@local-database/hooks/useGetGradeSystemsQuery";
import { useCallback, useEffect, useState } from "react";
import { or } from "react-native-reanimated";

const addOneWrap = (n: number, value: number) => (value + 1) % (n + 1);

export const gradeSystemSelector = (
  kind: typeof RouteKindSchema._type,
  preferredSystem: typeof GradeSystemsSchema._type,
  plus: number,
  originalGradeSystem?: typeof GradeSystemsSchema._type,
) => {
  const index = gradeUnitsByRouteKind[kind].findIndex(
    (d) => d === preferredSystem,
  );
  const gradeUnitsCount = gradeUnitsByRouteKind[kind].length - 1;
  const correctedIndex = addOneWrap(gradeUnitsCount, index + plus - 1);

  const selectedGradeSystem = gradeUnitsByRouteKind[kind][correctedIndex];

  if (!originalGradeSystem || selectedGradeSystem === originalGradeSystem) {
    return gradeUnits[
      gradeUnitsByRouteKind[kind][correctedIndex]
    ] as (typeof GradeSystemsSchema._type)[];
  }

  const conversionGradeSystem = Object.values(
    // @ts-expect-error index safe
    gradeConversion[originalGradeSystem][selectedGradeSystem],
  ) as (typeof GradeSystemsSchema._type)[];

  return conversionGradeSystem;
};

const useGradeSystem = (kind?: typeof RouteKindSchema._type) => {
  const { data } = useGetGradeSystemsQuery();

  const [plus, setPlus] = useState(0);

  const changeGradeSystem = () => {
    setPlus((prev) => prev + 1);
  };

  const [allGrades, setAllGrades] = useState<number[]>([]);
  const getGradeSystem = useCallback(
    (
      kind: keyof typeof RouteKindSchema.Enum,
      originalGradeSystem?: typeof GradeSystemsSchema._type,
    ) => {
      if (!data) return [];
      switch (kind) {
        case RouteKindSchema.Enum.Boulder: {
          return gradeSystemSelector(
            kind,
            data.preferredBoulderGrade,
            plus,
            originalGradeSystem,
          );
        }
        case RouteKindSchema.Enum.Sport: {
          return gradeSystemSelector(
            kind,
            data.preferredSportGrade,
            plus,
            originalGradeSystem,
          );
        }
        case RouteKindSchema.Enum.Trad:
          return gradeSystemSelector(
            kind,
            data.preferredTradGrade,
            plus,
            originalGradeSystem,
          );
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
    [data, plus],
  );

  const gradeBySystem = useCallback(
    (
      grade: number,
      kind: typeof RouteKindSchema._type,
      originalGradeSystem?: typeof GradeSystemsSchema._type,
    ) => {
      const system = getGradeSystem(kind, originalGradeSystem);
      return system[grade];
    },
    [getGradeSystem],
  );

  const gradeLabel = useCallback(
    (
      grade: Pick<RouteGrade, "project" | "grade"> | null,
      kind: typeof RouteKindSchema._type,
      originalGradeSystem?: typeof GradeSystemsSchema._type,
    ) => {
      if (!grade) return "?";
      const n = grade.grade;
      const project = grade.project;
      if (project) return "Proyecto";
      return typeof n === "number"
        ? gradeBySystem(n, kind, originalGradeSystem)
        : "?";
    },
    [gradeBySystem],
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
    gradeSystem: gradeBySystem,
    getAllGrades,
    changeGradeSystem,
    allGrades,
    getGradeSystem,
    gradeLabel,
    getSystem,
  };
};

export default useGradeSystem;
