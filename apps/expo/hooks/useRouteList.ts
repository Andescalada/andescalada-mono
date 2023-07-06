import { AppRouter } from "@andescalada/api/src/routers/_app";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { trpc } from "@andescalada/utils/trpc";
import useGradeSystem from "@hooks/useGradeSystem";
import type { inferProcedureOutput } from "@trpc/server";
import { useCallback } from "react";

type Wall = inferProcedureOutput<AppRouter["walls"]["routeList"]>;

type ParsedExtension = Wall["routes"][0]["Extension"][0] & {
  kindStringify: string;
  gradeStringify: string;
};

const useRouteList = ({
  wallId,
  zoneId,
}: {
  wallId: string;
  zoneId: string;
}) => {
  const { gradeLabel } = useGradeSystem();
  const wallQuery = trpc.walls.routeList.useQuery(
    { wallId, zoneId },
    {
      staleTime: 0,
      cacheTime: 0,
      select: useCallback(
        (wall: Wall) => {
          const multiPitch = wall.MultiPitch.map((multiPitch) => ({
            ...multiPitch,
            id: multiPitch.id,
            position: multiPitch.position,
            kindStringify: `Multi largo, ${multiPitch.numberOfPitches} ${
              multiPitch.numberOfPitches > 1 || multiPitch.numberOfPitches === 0
                ? "largos"
                : "largo"
            } `,
            gradeStringify: gradeLabel(
              {
                grade: multiPitch.grade,
                project: multiPitch.project,
              },
              multiPitch.gradeRouteKind,
            ),
            isMultiPitch: true,
            Extension: [] as ParsedExtension[],
          }));
          const routesWithRef = wall.routes.map((route) => ({
            ...route,
            isMultiPitch: false,
            kindStringify: routeKindLabel(route.kind).long,
            gradeStringify: gradeLabel(
              {
                grade: route.RouteGrade?.grade ?? null,
                project: !!route.RouteGrade?.project,
              },
              route.kind,
              route.RouteGrade?.originalGradeSystem,
            ),
            Extension: route.Extension.map((extension) => ({
              ...extension,
              kindStringify: routeKindLabel(extension.kind).long,
              gradeStringify: gradeLabel(
                {
                  grade: extension.RouteGrade?.grade ?? null,
                  project: !!extension.RouteGrade?.project,
                },
                extension.kind,
                extension.RouteGrade?.originalGradeSystem,
              ),
            })),
          }));
          return {
            ...wall,
            routes: [...routesWithRef, ...multiPitch].sort(
              (a, b) => a.position - b.position,
            ),
          };
        },
        [gradeLabel],
      ),
    },
  );

  return wallQuery;
};

export type RouteListData = ReturnType<typeof useRouteList>["data"];

export default useRouteList;
