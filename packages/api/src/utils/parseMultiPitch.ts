import { GradeSystems, RouteGrade, RouteKind } from "@andescalada/db";

const parseMultiPitch = (
  multiPitch: {
    Author: {
      email: string;
    };
    id: string;
    name: string;
    position: number;
    wallId: string;
    Pitches: {
      Route: {
        RouteGrade: RouteGrade | null;
        kind: RouteKind;
      };
    }[];
  }[],
) => {
  return multiPitch.map((mp) => {
    const reduce = mp.Pitches.reduce<{
      maxGrade: number;
      project: boolean;
      maxAid?: number;
      gradeRouteKind: RouteKind;
      originalGradeSystem: GradeSystems;
    }>(
      (prev, current) => {
        const currentGrade = Number(current.Route.RouteGrade?.grade ?? 0);
        const aidValue =
          current.Route.RouteGrade?.originalGradeSystem === GradeSystems.Aid
            ? Number(current.Route.RouteGrade?.grade ?? 0)
            : undefined;
        return {
          maxGrade: Math.max(prev.maxGrade, currentGrade),
          gradeRouteKind:
            prev.maxGrade > currentGrade
              ? prev.gradeRouteKind
              : current.Route.kind,
          originalGradeSystem:
            currentGrade > prev.maxGrade &&
            current.Route.RouteGrade?.originalGradeSystem !== undefined
              ? current.Route.RouteGrade?.originalGradeSystem
              : prev.originalGradeSystem,

          project: prev.project || !!current.Route.RouteGrade?.project,
          maxAid: [prev.maxAid, aidValue].every((v) => v === undefined)
            ? undefined
            : Math.max(Number(prev.maxAid ?? 0), Number(aidValue ?? 0)),
        };
      },
      {
        maxGrade: 0,
        gradeRouteKind: "Sport",
        project: false,
        originalGradeSystem: GradeSystems.Yosemite,
        maxAid: undefined,
      },
    );

    return {
      id: mp.id,
      name: mp.name,
      position: mp.position,
      wallId: mp.wallId,
      Author: mp.Author,
      numberOfPitches: mp.Pitches.length,
      gradeRouteKind: reduce.gradeRouteKind,
      grade: reduce.maxGrade === 0 ? null : reduce.maxGrade,
      project: false,
      originalGradeSystem: reduce.originalGradeSystem,
      maxAid: reduce.maxAid,
    };
  });
};

export default parseMultiPitch;
