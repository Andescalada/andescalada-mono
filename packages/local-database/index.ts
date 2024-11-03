type ColumnType = "string" | "number" | "boolean";

type ColumnOption = {
  name: string;
  type: ColumnType;
  isOptional?: boolean | undefined;
  isIndexed?: boolean | undefined;
};

type Schema = { [key in Table]: { [key: string]: ColumnOption } };
type Column = { [key in Table]: { [key: string]: string } };

/**
 * @see
 * This is a schema for the local user database.
 * For that reason every table must have a `userId` and `isDeleted` columns in the server.
 * Names of the tables and columns must match the names in the server.
 *
 */

export enum Table {
  USER = "User",
  // ROUTE_COMMENT = "RouteComment",
  ROUTE_EVALUATION = "RouteEvaluation",
  ROUTE_GRADE_EVALUATION = "RouteGradeEvaluation",
  ROUTE_ALERT = "RouteAlert",
}

export const schema = {
  [Table.USER]: {
    name: { type: "string", name: "name" },
    username: { type: "string", name: "username" },
    email: { type: "string", isIndexed: true, name: "email" },
    ownUser: { type: "boolean", name: "ownUser", isOptional: true },
    createdAt: { type: "number", name: "created_at" },
    preferredSportGrade: { type: "string", name: "preferredSportGrade" },
    preferredBoulderGrade: { type: "string", name: "preferredBoulderGrade" },
    preferredTradGrade: { type: "string", name: "preferredTradGrade" },
  },
  // [Table.ROUTE_COMMENT]: {
  //   comment: { type: "string", name: "comment" },
  //   routeId: { type: "string", isIndexed: true, name: "routeId" },
  //   userId: { type: "string", isIndexed: true, name: "userId" },
  //   createdAt: { type: "number", name: "createdAt" },
  //   updatedAt: { type: "number", name: "updatedAt" },
  // },
  [Table.ROUTE_EVALUATION]: {
    routeId: { type: "string", isIndexed: true, name: "routeId" },
    userId: { type: "string", isIndexed: true, name: "userId" },
    createdAt: { type: "number", name: "created_at" },
    updatedAt: { type: "number", name: "updated_at" },
    evaluation: { type: "string", name: "evaluation" },
  },
  [Table.ROUTE_GRADE_EVALUATION]: {
    routeId: { type: "string", isIndexed: true, name: "routeId" },
    userId: { type: "string", isIndexed: true, name: "userId" },
    createdAt: { type: "number", name: "created_at" },
    updatedAt: { type: "number", name: "updated_at" },
    evaluation: { type: "number", name: "evaluation" },
    originalGradeSystem: { type: "string", name: "originalGradeSystem" },
    originalGrade: { type: "string", name: "originalGrade" },
  },
  [Table.ROUTE_ALERT]: {
    routeId: { type: "string", isIndexed: true, name: "routeId" },
    zoneId: { type: "string", isIndexed: true, name: "zoneId" },
    userId: { type: "string", isIndexed: true, name: "userId" },
    createdAt: { type: "number", name: "created_at" },
    updatedAt: { type: "number", name: "updated_at" },
    title: { type: "string", name: "title" },
    description: { type: "string", name: "description", isOptional: true },
    dueDate: { type: "number", name: "dueDate", isOptional: true },
    kind: { type: "string", name: "kind" },
    severity: { type: "string", name: "severity" },
    routeName: { type: "string", name: "routeName" },
    sectorName: { type: "string", name: "sectorName" },
  },
} as const satisfies Schema;

export const columns = {
  [Table.USER]: {
    name: schema[Table.USER].name.name,
    username: schema[Table.USER].username.name,
    ownUser: schema[Table.USER].ownUser.name,
    createdAt: schema[Table.USER].createdAt.name,
    preferredSportGrade: schema[Table.USER].preferredSportGrade.name,
    preferredBoulderGrade: schema[Table.USER].preferredBoulderGrade.name,
    preferredTradGrade: schema[Table.USER].preferredTradGrade.name,
  },
  // [Table.ROUTE_COMMENT]: {
  //   comment: schema[Table.ROUTE_COMMENT].comment.name,
  //   routeId: schema[Table.ROUTE_COMMENT].routeId.name,
  //   userId: schema[Table.ROUTE_COMMENT].userId.name,
  //   createdAt: schema[Table.ROUTE_COMMENT].createdAt.name,
  //   updatedAt: schema[Table.ROUTE_COMMENT].updatedAt.name,
  // },
  [Table.ROUTE_EVALUATION]: {
    routeId: schema[Table.ROUTE_EVALUATION].routeId.name,
    userId: schema[Table.ROUTE_EVALUATION].userId.name,
    createdAt: schema[Table.ROUTE_EVALUATION].createdAt.name,
    updatedAt: schema[Table.ROUTE_EVALUATION].updatedAt.name,
    evaluation: schema[Table.ROUTE_EVALUATION].evaluation.name,
  },
  [Table.ROUTE_GRADE_EVALUATION]: {
    routeId: schema[Table.ROUTE_GRADE_EVALUATION].routeId.name,
    userId: schema[Table.ROUTE_GRADE_EVALUATION].userId.name,
    createdAt: schema[Table.ROUTE_GRADE_EVALUATION].createdAt.name,
    updatedAt: schema[Table.ROUTE_GRADE_EVALUATION].updatedAt.name,
    evaluation: schema[Table.ROUTE_GRADE_EVALUATION].evaluation.name,
    originalGradeSystem:
      schema[Table.ROUTE_GRADE_EVALUATION].originalGradeSystem.name,
    originalGrade: schema[Table.ROUTE_GRADE_EVALUATION].originalGrade.name,
  },
  [Table.ROUTE_ALERT]: {
    routeId: schema[Table.ROUTE_ALERT].routeId.name,
    zoneId: schema[Table.ROUTE_ALERT].zoneId.name,
    userId: schema[Table.ROUTE_ALERT].userId.name,
    createdAt: schema[Table.ROUTE_ALERT].createdAt.name,
    updatedAt: schema[Table.ROUTE_ALERT].updatedAt.name,
    title: schema[Table.ROUTE_ALERT].title.name,
    description: schema[Table.ROUTE_ALERT].description.name,
    dueDate: schema[Table.ROUTE_ALERT].dueDate.name,
    kind: schema[Table.ROUTE_ALERT].kind.name,
    severity: schema[Table.ROUTE_ALERT].severity.name,
    routeName: schema[Table.ROUTE_ALERT].routeName.name,
    sectorName: schema[Table.ROUTE_ALERT].sectorName.name,
  },
} as const satisfies Column;

export const migrationRecord = {
  [2]: {
    createTable: [
      {
        [Table.ROUTE_ALERT]: {
          routeId: { type: "string", isIndexed: true, name: "routeId" },
          routeName: { type: "string", name: "routeName" },
          sectorName: { type: "string", name: "sectorName" },
          zoneId: { type: "string", isIndexed: true, name: "zoneId" },
          userId: { type: "string", isIndexed: true, name: "userId" },
          createdAt: { type: "number", name: "created_at" },
          updatedAt: { type: "number", name: "updated_at" },
          title: { type: "string", name: "title" },
          description: {
            type: "string",
            name: "description",
            isOptional: true,
          },
          dueDate: { type: "number", name: "dueDate", isOptional: true },
          kind: { type: "string", name: "kind" },
          severity: { type: "string", name: "severity" },
        },
      },
    ],
  },
} as const;
