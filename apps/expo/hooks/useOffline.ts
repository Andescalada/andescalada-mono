import { trpc } from "@andescalada/utils/trpc";
import useOfflineMode from "@hooks/useOfflineMode";
import { onlineManager, useQueryClient } from "@tanstack/react-query";
import {
  persistQueryClientRestore,
  persistQueryClientSubscribe,
} from "@tanstack/react-query-persist-client";
import featureFlags from "@utils/featureFlags";
import { createMMKVStoragePersister } from "@utils/mmkv/createMMKVPersister";
import storage from "@utils/mmkv/storage";
import { useEffect, useMemo } from "react";

const persister = createMMKVStoragePersister({ storage });

type Key = {
  zoneId: "zoneId";
  sectorId: "sectorId";
  wallId: "wallId";
  routeId: "routeId";
  topoId: "topoId";
  routePathId: "routePathId";
};

type QueryKey = [string[], Partial<{ [key in keyof Key]: string }>];

const useOffline = () => {
  const queryClient = useQueryClient();

  const downloadList = trpc.user.getDownloadedAssets.useQuery(undefined, {
    enabled: featureFlags.offline,
  });
  const utils = trpc.useContext();

  const idsToCached = useMemo(() => {
    const ids = new Set<QueryKey>([]);

    downloadList?.data?.DownloadedZones.flatMap((z) => {
      ids.add([["zones", "allSectors"], { zoneId: z.id }]);
      utils.zones.allSectors.prefetch({ zoneId: z.id });
      return z.sectors;
    })
      .flatMap((s) => {
        ids.add([["sectors", "allWalls"], { sectorId: s.id }]);
        utils.sectors.allWalls.prefetch({ sectorId: s.id });
        return s.walls;
      })
      .flatMap((w) => {
        ids.add([["walls", "byId"], { wallId: w.id }]);
        utils.walls.byId.prefetch({ wallId: w.id });
        const { routes, topos } = w;
        return { routes, topos };
      })
      .flatMap((rt) => {
        const routePaths = rt.routes.flatMap((r) => {
          ids.add([["route"], { routeId: r.id }]);
          return r.RoutePath;
        });
        rt.topos.forEach((t) => {
          ids.add([["topos", "byId"], { topoId: t.id }]);
          utils.topos.byId.prefetch({ topoId: t.id });
        });
        return routePaths;
      })
      .forEach((rp) => {
        ids.add([["routePath"], { routePathId: rp.id }]);
      });

    return Array.from(ids).map((k) => hashQueryKey(k));
  }, [
    downloadList?.data?.DownloadedZones,
    utils.sectors.allWalls,
    utils.topos.byId,
    utils.walls.byId,
    utils.zones.allSectors,
  ]);

  if (featureFlags.offline) {
    const unsubscribe = persistQueryClientSubscribe({
      queryClient,
      persister,
      dehydrateOptions: {
        shouldDehydrateQuery: ({ queryKey, queryHash, state }) => {
          return idsToCached.includes(queryHash);
        },
      },
    });
  }
  const { isOfflineMode } = useOfflineMode();
  useEffect(() => {
    if (isOfflineMode) {
      persistQueryClientRestore({ queryClient, persister, maxAge: 0 });
    }
    onlineManager.setOnline(!isOfflineMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOfflineMode]);
};

export default useOffline;

function hasObjectPrototype(o: any): boolean {
  return Object.prototype.toString.call(o) === "[object Object]";
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isPlainObject(o: any): o is Object {
  if (!hasObjectPrototype(o)) {
    return false;
  }

  // If has modified constructor
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }

  // If has modified prototype
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }

  // If constructor does not have an Object-specific method
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

export function hashQueryKey(queryKey: QueryKey): string {
  return JSON.stringify(queryKey, (_, val) =>
    isPlainObject(val)
      ? Object.keys(val)
          .sort()
          .reduce((result, key) => {
            result[key] = val[key];
            return result;
          }, {} as any)
      : val,
  );
}
