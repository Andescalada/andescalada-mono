import { AppRouter } from "@andescalada/api/src/routers/_app";
import { routeKindLabel } from "@andescalada/common-assets/routeKind";
import { trpc } from "@andescalada/utils/trpc";
import useGradeSystem from "@hooks/useGradeSystem";
import type { inferProcedureOutput } from "@trpc/server";
import { useCallback } from "react";

type Wall = inferProcedureOutput<AppRouter["walls"]["routeList"]>;

type ParsedChildrenRoute = Wall["routes"][0]["Extension"][0] & {
  kindStringify: string;
  gradeStringify: string;
};

const useRouteList = (
  {
    wallId,
    zoneId,
  }: {
    wallId: string;
    zoneId: string;
  },
  { staleTime, cacheTime }: { staleTime?: number; cacheTime?: number } = {
    staleTime: 0,
    cacheTime: 0,
  },
) => {
  const { gradeLabel } = useGradeSystem();
  const wallQuery = trpc.walls.routeList.useQuery(
    { wallId, zoneId },
    {
      staleTime,
      cacheTime,
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
            ChildrenRoutes: [] as ParsedChildrenRoute[],
            variantRouteId: null,
            extendedRouteId: null,
          }));
          const routesWithChildren = wall.routes.map((route) => ({
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
            ChildrenRoutes: [...route.Extension, ...route.Variant].map(
              (childrenRoute) => ({
                ...childrenRoute,
                kindStringify: routeKindLabel(childrenRoute.kind).long,
                gradeStringify: gradeLabel(
                  {
                    grade: childrenRoute.RouteGrade?.grade ?? null,
                    project: !!childrenRoute.RouteGrade?.project,
                  },
                  childrenRoute.kind,
                  childrenRoute.RouteGrade?.originalGradeSystem,
                ),
              }),
            ),
          }));
          return {
            ...wall,
            routes: [...routesWithChildren, ...multiPitch].sort(
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
