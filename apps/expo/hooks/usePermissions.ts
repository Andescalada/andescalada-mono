import { Permissions } from "@andescalada/api/src/types/permissions";
import { useAppSelector } from "@hooks/redux";
import type { Zone } from "@prisma/client";
import { useFocusEffect } from "@react-navigation/native";
import { isExpired } from "@utils/decode";
import Env from "@utils/env";
import storage, { Store } from "@utils/mmkv/storage";
import { useCallback, useState } from "react";
import * as Sentry from "sentry-expo";
import { parse, stringify } from "superjson";

const PERMISSIONS_DURATION = 5 * 60 * 1000; // 5 minutes

interface PermissionInStorage {
  permissions: Permissions;
  exp: number;
}

const getPermissionsFromUpstash = (key: string, value: string) =>
  fetch(`${Env.UPSTASH_REDIS_REST_URL}/hget/${key}/${value}`, {
    headers: {
      Authorization: `Bearer ${Env.UPSTASH_REDIS_REST_TOKEN}`,
    },
  })
    .then((r) => r.json())
    .then((r) => r.result);

interface Args {
  zoneId: Zone["id"];
}

const usePermissions = ({ zoneId }: Args) => {
  const { email } = useAppSelector((state) => state.auth);

  const [permission, setPermissions] = useState<Permissions | undefined>(
    new Set(),
  );

  const getPermissions = useCallback(async () => {
    try {
      if (!email) throw new Error("No email found");

      let { exp, permissions } = getPermissionFromStorage(email, zoneId) || {};

      if (permissions) setPermissions(permissions);

      if (!permissions || (exp && isExpired(exp))) {
        storage.delete(`${Store.PERMISSIONS}.${email}.${zoneId}`);

        permissions = await getPermissionsFromUpstash(email, zoneId).then((p) =>
          p ? parse<Permissions>(p) : undefined,
        );

        const d = new Date();
        exp = d.setTime(d.getTime() + PERMISSIONS_DURATION);
      }

      if (!permissions || Array.from(permissions || []).length === 0) {
        setPermissions(new Set());
        return;
      }

      const newPermissions = stringify({
        permissions,
        exp,
      });

      storage.set(`${Store.PERMISSIONS}.${email}.${zoneId}`, newPermissions);
    } catch (err) {
      Sentry.Native.captureException(err);
    }
  }, [email, zoneId]);

  useFocusEffect(
    useCallback(() => {
      getPermissions();
    }, [getPermissions]),
  );

  return { permission, getPermissions };
};

export default usePermissions;

const getPermissionFromStorage = (email: string, zoneId: string) => {
  const s = storage.getString(`${Store.PERMISSIONS}.${email}.${zoneId}`);
  if (!s) return undefined;
  return parse<PermissionInStorage>(s);
};
