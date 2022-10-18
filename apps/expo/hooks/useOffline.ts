import { trpc } from "@andescalada/utils/trpc";
import useOfflineMode from "@hooks/useOfflineMode";
import useOwnInfo from "@hooks/useOwnInfo";
import type { Zone } from "@prisma/client";
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
  toposId: "toposId";
  routePathId: "routePathId";
};

const useOffline = () => {
  const queryClient = useQueryClient();

  const { data: ownInfo } = useOwnInfo();

  const downloadList = trpc.user.getDownloadedAssets.useQuery(undefined, {
    enabled: featureFlags.offline,
  });

  const idsToCached = useMemo(() => {
    const ids = new Set<Partial<{ [key in keyof Key]: string }>>([]);
    downloadList?.data?.DownloadedZones.flatMap((z) => {
      ids.add({ zoneId: z.id });
      return z.sectors;
    })
      .flatMap((s) => {
        ids.add({ sectorId: s.id });
        return s.walls;
      })
      .flatMap((w) => {
        ids.add({ wallId: w.id });
        const { routes, topos } = w;
        return { routes, topos };
      })
      .flatMap((rt) => {
        const routePaths = rt.routes.flatMap((r) => {
          ids.add({ routeId: r.id });
          return r.RoutePath;
        });
        rt.topos.forEach((t) => {
          ids.add({ toposId: t.id });
        });
        return routePaths;
      })
      .forEach((rp) => {
        ids.add({ routePathId: rp.id });
      });
    return ids;
  }, [downloadList?.data?.DownloadedZones]);

  if (featureFlags.offline) {
    const unsubscribe = persistQueryClientSubscribe({
      queryClient,
      persister,
      dehydrateOptions: {
        shouldDehydrateQuery: ({ queryKey, queryHash, state }) => {
          return true;
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
