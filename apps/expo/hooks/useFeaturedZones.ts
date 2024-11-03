import { AppRouter } from "@andescalada/api/src/routers/_app";
import { trpc } from "@andescalada/utils/trpc";
import { inferProcedureOutput } from "@trpc/server";
import { atomWithMMKV, Storage } from "@utils/mmkv/storage";
import { useAtom } from "jotai";

type FeaturedZones = inferProcedureOutput<AppRouter["zones"]["featured"]>;

const atomFeaturedZones = atomWithMMKV<FeaturedZones | undefined>(
  Storage.FEATURED_ZONES,
  undefined,
);

const useFeaturedZones = () => {
  const utils = trpc.useContext();
  const [persistedFeatureZones, setPersistedFeaturedZones] =
    useAtom(atomFeaturedZones);

  const featuredZones = trpc.zones.featured.useQuery(undefined, {
    initialData: persistedFeatureZones,
    placeholderData: persistedFeatureZones,
    staleTime: 1000 * 60,
    onSuccess: (data) => {
      setPersistedFeaturedZones(data);
    },
    onError() {
      utils.zones.featured.setData(undefined, persistedFeatureZones);
    },
  });
  return featuredZones;
};

export default useFeaturedZones;
