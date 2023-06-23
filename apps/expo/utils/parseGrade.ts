import type { RouteGrade } from "@andescalada/db";

const parseGrade = (gradeObject: RouteGrade | null) => {
  if (!gradeObject) return null;
  if (gradeObject.grade) return gradeObject.grade;
  if (gradeObject.project) return "project";
  return null;
};

export type ParseGrade = ReturnType<typeof parseGrade>;

export default parseGrade;
