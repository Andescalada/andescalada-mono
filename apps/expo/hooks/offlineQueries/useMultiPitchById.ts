import {
  type ReactQueryOptions,
  type RouterInputs,
  type RouterOutputs,
  trpc,
} from "@andescalada/utils/trpc";
import { downloadedZonesAtom, isOfflineModeAtom } from "@atoms/index";
import { useQuery } from "@tanstack/react-query";
import constants from "@utils/constants";
import getOfflineData from "@utils/getOfflineData";
import offlineDb from "@utils/quick-sqlite";
import { useAtom } from "jotai";

type Data = RouterOutputs["multiPitch"]["byId"];

type Params = RouterInputs["multiPitch"]["byId"];

type Options = ReactQueryOptions["multiPitch"]["byId"];

const path = { router: "multiPitch", procedure: "byId" };

const useMultiPitchById = (params: Params, options?: Options) => {
  const isOfflineMode = useAtom(isOfflineModeAtom)[0];
  const downloadedZones = useAtom(downloadedZonesAtom)[0];

  const assetId = `${path.router}.${path.procedure}/${params.multiPitchId}`;

  const offlineStates = useQuery({
    networkMode: "always",
    enabled: isOfflineMode,
    queryKey: [constants.offlineData, assetId, params] as const,
    queryFn: ({ queryKey }) => getOfflineData<Params, Data>(...queryKey),
  });

  const onlineStates = trpc.multiPitch.byId.useQuery(params, {
    enabled: !isOfflineMode,
    onSuccess: (data) => {
      if (!!downloadedZones[params.zoneId]) {
        const db = offlineDb.open();
        offlineDb.set(db, assetId, params.zoneId, data, data.version);
      }
    },
    ...options,
  });

  return isOfflineMode ? offlineStates : onlineStates;
};

export default useMultiPitchById;
