import type { Permissions } from "@andescalada/api/src/types/permissions";
import { trpc } from "@andescalada/utils/trpc";
import { useAppSelector } from "@hooks/redux";
import type { Zone } from "@prisma/client";
import storage, { Storage } from "@utils/mmkv/storage";
import { parse, stringify } from "superjson";

interface Args {
  zoneId: Zone["id"];
}

const usePermissions = ({ zoneId }: Args) => {
  const { email } = useAppSelector((state) => state.auth);

  if (!email) throw new Error("No email found");
  const storagePermissions = getPermissionFromStorage(email, zoneId);

  const permissions = trpc.user.zonePermissions.useQuery(
    { zoneId },
    {
      staleTime: 1000 * 60 * 2,
      initialData: storagePermissions,
      onSuccess: (data) => {
        storage.set(
          `${Storage.PERMISSIONS}.${email}.${zoneId}`,
          stringify(data),
        );
      },
    },
  );

  return {
    permission: permissions.data,
    getPermissions: permissions.refetch,
    isLoading: permissions.isLoading,
  };
};

export default usePermissions;

const getPermissionFromStorage = (email: string, zoneId: string) => {
  const s = storage.getString(`${Storage.PERMISSIONS}.${email}.${zoneId}`);
  if (!s) return undefined;
  return parse<Permissions>(s);
};
