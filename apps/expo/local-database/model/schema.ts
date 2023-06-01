import { appSchema, ColumnType, tableSchema } from "@nozbe/watermelondb";

type ColumnOption = {
  name: string;
  type: ColumnType;
  isOptional?: boolean | undefined;
  isIndexed?: boolean | undefined;
};

type Schema = { [key in Table]: { [key: string]: ColumnOption } };

export enum Table {
  USER = "User",
  ROUTE_COMMENT = "RouteComment",
  ROUTE_EVALUATION = "RouteEvaluation",
}

export const schema = {
  [Table.USER]: {
    name: { type: "string", name: "name" },
    username: { type: "string", name: "username" },
    email: { type: "string", isIndexed: true, name: "email" },
    ownUser: { type: "boolean", name: "ownUser", isOptional: true },
    createdAt: { type: "number", name: "createdAt" },
    preferredSportGrade: { type: "string", name: "preferredSportGrade" },
    preferredBoulderGrade: { type: "string", name: "preferredBoulderGrade" },
    preferredTradGrade: { type: "string", name: "preferredTradGrade" },
  },
  [Table.ROUTE_COMMENT]: {
    comment: { type: "string", name: "comment" },
    routeId: { type: "string", isIndexed: true, name: "routeId" },
    userId: { type: "string", isIndexed: true, name: "userId" },
    createdAt: { type: "number", name: "createdAt" },
    updatedAt: { type: "number", name: "updatedAt" },
  },
  [Table.ROUTE_EVALUATION]: {
    routeId: { type: "string", isIndexed: true, name: "routeId" },
    userId: { type: "string", isIndexed: true, name: "userId" },
    createdAt: { type: "number", name: "createdAt" },
    updatedAt: { type: "number", name: "updatedAt" },
    evaluation: { type: "number", name: "evaluation" },
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
