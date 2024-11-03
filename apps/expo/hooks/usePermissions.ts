import type { Permissions } from "@andescalada/api/src/types/permissions";
import type { PermissionActions, Zone } from "@andescalada/db";
import { trpc } from "@andescalada/utils/trpc";
import useOwnInfo from "@hooks/useOwnInfo";
import storage, { Storage } from "@utils/mmkv/storage";
import { parse, stringify } from "superjson";

interface Args {
  zoneId: Zone["id"];
}

const usePermissions = ({ zoneId }: Args) => {
  const { data: userData } = useOwnInfo();

  if (!userData) throw new Error("No own info");

  const storagePermissions = getPermissionFromStorage(userData.id, zoneId);

  const permissions = trpc.user.zonePermissions.useQuery(
    { zoneId },
    {
      staleTime: storagePermissions !== undefined ? 1000 * 60 * 2 : 0,
      cacheTime: 1000 * 60 * 2,
      ...(storagePermissions && { initialData: storagePermissions }),
      onSuccess: (data) => {
        storage.set(
          `${Storage.PERMISSIONS}.${userData.id}.${zoneId}`,
          stringify(data),
        );
      },
    },
  );

  const defaultPermission = new Set<PermissionActions>();

  return {
    permission: permissions.data ?? defaultPermission,
    getPermissions: permissions.refetch,
    isLoading: permissions.isLoading,
  };
};

export default usePermissions;

const getPermissionFromStorage = (userId: string, zoneId: string) => {
  try {
    const s = storage.getString(`${Storage.PERMISSIONS}.${userId}.${zoneId}`);
    if (!s) return undefined;
    return parse<Permissions>(s);
  } catch (error) {
    return new Set<PermissionActions>();
  }
};
