import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { inferProcedureOutput } from "@trpc/server";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";
import { useAtom } from "jotai";

type RecentZones = inferProcedureOutput<AppRouter["user"]["zoneHistory"]>;

const atomRecentZones = atomWithMMKV<RecentZones | undefined>(
  Storage.RECENT_ZONES,
  undefined,
);

const useRecentZones = () => {
  const utils = trpc.useContext();
  const [persistedRecentZones, setPersistedRecentZones] =
    useAtom(atomRecentZones);

  const recentZones = trpc.user.zoneHistory.useQuery(undefined, {
    initialData: persistedRecentZones,
    placeholderData: persistedRecentZones,
    staleTime: 1000 * 60,
    onSuccess: (data) => {
      setPersistedRecentZones(data);
    },
    onError() {
      utils.user.zoneHistory.setData(undefined, persistedRecentZones);
    },
  });
  return recentZones;
};

export default useRecentZones;
