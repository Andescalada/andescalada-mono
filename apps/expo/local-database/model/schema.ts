import { appSchema, ColumnType, tableSchema } from "@nozbe/watermelondb";

type ColumnOption = {
  name: string;
  type: ColumnType;
  isOptional?: boolean | undefined;
  isIndexed?: boolean | undefined;
};

type Schema = { [key in Tables]: { [key: string]: ColumnOption } };

export enum Tables {
  USERS = "users",
  ROUTE_COMMENTS = "route_comments",
  ROUTES = "routes",
  ROUTE_EVALUATIONS = "route_evaluations",
}

export const schema = {
  [Tables.USERS]: {
    name: { type: "string", name: "name" },
    username: { type: "string", name: "username" },
    email: { type: "string", isIndexed: true, name: "email" },
    backend_id: { type: "string", isIndexed: true, name: "backend_id" },
    created_at: { type: "number", name: "created_at" },
  },
  [Tables.ROUTE_COMMENTS]: {
    comment: { type: "string", name: "comment" },
    route_id: { type: "string", isIndexed: true, name: "route_id" },
    user_id: { type: "string", isIndexed: true, name: "user_id" },
    created_at: { type: "number", name: "created_at" },
    updated_at: { type: "number", name: "updated_at" },
    backend_id: {
      type: "string",
      isIndexed: true,
      isOptional: true,
      name: "backend_id",
    },
  },
  [Tables.ROUTES]: {
    name: { type: "string", name: "name" },
    backend_id: { type: "string", isIndexed: true, name: "backend_id" },
  },
  [Tables.ROUTE_EVALUATIONS]: {
    route_id: { type: "string", isIndexed: true, name: "route_id" },
    user_id: { type: "string", isIndexed: true, name: "user_id" },
    created_at: { type: "number", name: "created_at" },
    updated_at: { type: "number", name: "updated_at" },
    backend_id: {
      type: "string",
      isIndexed: true,
      isOptional: true,
      name: "backend_id",
    },
    evaluation: { type: "number", isOptional: true, name: "evaluation" },
  },
} as const satisfies Schema;

const tables = Object.entries(schema).map(([name, columns]) => {
  return tableSchema({
    name,
    columns: Object.values(columns).map((options) => options),
  });
});

export default appSchema({
  version: 1,
  tables,
});
