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
    ownUser: { type: "boolean", name: "own_user" },
    backendId: { type: "string", isIndexed: true, name: "backend_id" },
    createdAt: { type: "number", name: "created_at" },
    preferredSportGrade: { type: "string", name: "preferred_sport_grade" },
    preferredBoulderGrade: { type: "string", name: "preferred_boulder_grade" },
    preferredTradGrade: { type: "string", name: "preferred_trad_grade" },
  },
  [Tables.ROUTE_COMMENTS]: {
    comment: { type: "string", name: "comment" },
    routeId: { type: "string", isIndexed: true, name: "route_id" },
    userId: { type: "string", isIndexed: true, name: "user_id" },
    createdAt: { type: "number", name: "created_at" },
    updatedAt: { type: "number", name: "updated_at" },
    backendId: {
      type: "string",
      isIndexed: true,
      isOptional: true,
      name: "backend_id",
    },
  },
  [Tables.ROUTES]: {
    name: { type: "string", name: "name" },
    backendId: { type: "string", isIndexed: true, name: "backend_id" },
  },
  [Tables.ROUTE_EVALUATIONS]: {
    routeId: { type: "string", isIndexed: true, name: "route_id" },
    userId: { type: "string", isIndexed: true, name: "user_id" },
    createdAt: { type: "number", name: "created_at" },
    updatedAt: { type: "number", name: "updated_at" },
    backendId: {
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
  version: 3,
  tables,
});
