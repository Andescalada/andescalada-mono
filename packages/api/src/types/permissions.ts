import { PermissionActions } from "@andescalada/db";
import { SuperJSONResult } from "superjson/src/types";

export type Access = SuperJSONResult;

export type Permissions = Set<PermissionActions>;
