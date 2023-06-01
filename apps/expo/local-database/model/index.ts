import { GradeSystemsSchema } from "@andescalada/db/zod";
import { schema, Tables } from "@local-database/model/schema";
import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  json,
  readonly,
  relation,
  text,
} from "@nozbe/watermelondb/decorators";

const hasMany = "has_many" as const;
const belongsTo = "belongs_to" as const;

export class User extends Model {
  static table = Tables.USERS;
  static associations = {
    [Tables.ROUTE_COMMENTS]: {
      type: hasMany,
      foreignKey: schema[Tables.ROUTE_COMMENTS].userId.name,
    },
    [Tables.ROUTE_EVALUATIONS]: {
      type: hasMany,
      foreignKey: schema[Tables.ROUTE_EVALUATIONS].userId.name,
    },
  };

  @text(schema[Tables.USERS].name.name) name!: string;
  @text(schema[Tables.USERS].username.name) username!: string;
  @field(schema[Tables.USERS].ownUser.name) ownUser!: boolean;
  @readonly @date(schema[Tables.USERS].createdAt.name) createdAt!: Date;
  @text(schema[Tables.USERS].email.name) email!: string;
  @text(schema[Tables.USERS].backendId.name) backendId!: string;
  @json(schema[Tables.USERS].preferredSportGrade.name, (rawReaction) =>
    GradeSystemsSchema.parse(rawReaction),
  )
  preferredSportGrade!: typeof GradeSystemsSchema._type;
  @json(schema[Tables.USERS].preferredBoulderGrade.name, (rawReaction) =>
    GradeSystemsSchema.parse(rawReaction),
  )
  preferredBoulderGrade!: typeof GradeSystemsSchema._type;
  @json(schema[Tables.USERS].preferredTradGrade.name, (rawReaction) =>
    GradeSystemsSchema.parse(rawReaction),
  )
  preferredTradGrade!: typeof GradeSystemsSchema._type;
}

export class Route extends Model {
  static table = Tables.ROUTES;
  static associations = {
    [Tables.ROUTE_COMMENTS]: {
      type: hasMany,
      foreignKey: schema[Tables.ROUTE_COMMENTS].routeId.name,
    },
    [Tables.ROUTE_EVALUATIONS]: {
      type: hasMany,
      foreignKey: schema[Tables.ROUTE_EVALUATIONS].routeId.name,
    },
  };

  @text(schema[Tables.ROUTES].name.name) name!: string;
  @text(schema[Tables.ROUTES].backendId.name) backendId!: string;
}

export class RouteComment extends Model {
  static table = Tables.ROUTE_COMMENTS;
  static associations = {
    [Tables.USERS]: {
      type: belongsTo,
      key: schema[Tables.ROUTE_COMMENTS].userId.name,
    },
  };

  @text(schema[Tables.ROUTE_COMMENTS].comment.name) comment!: string;
  @text(schema[Tables.ROUTE_COMMENTS].routeId.name) routeId!: string;
  @text(schema[Tables.ROUTE_COMMENTS].userId.name) userId!: string;
  @text(schema[Tables.ROUTE_COMMENTS].backendId.name) backendId!: string;
  @readonly
  @date(schema[Tables.ROUTE_COMMENTS].createdAt.name)
  createdAt!: Date;
  @readonly
  @date(schema[Tables.ROUTE_COMMENTS].updatedAt.name)
  updatedAt!: Date;
  @relation(Tables.USERS, schema[Tables.ROUTE_COMMENTS].userId.name)
  user!: User;
}

export class RouteEvaluation extends Model {
  static table = Tables.ROUTE_EVALUATIONS;
  static associations = {
    [Tables.ROUTES]: {
      type: belongsTo,
      key: schema[Tables.ROUTE_EVALUATIONS].routeId.name,
    },
    [Tables.USERS]: {
      type: belongsTo,
      key: schema[Tables.ROUTE_EVALUATIONS].userId.name,
    },
  };

  @text(schema[Tables.ROUTE_EVALUATIONS].routeId.name) routeId!: string;
  @text(schema[Tables.ROUTE_EVALUATIONS].userId.name) userId!: string;
  @text(schema[Tables.ROUTE_EVALUATIONS].backendId.name) backendId!: string;
  @field(schema[Tables.ROUTE_EVALUATIONS].evaluation.name) evaluation!: number;
  @readonly
  @date(schema[Tables.ROUTE_EVALUATIONS].createdAt.name)
  createdAt!: Date;
  @readonly
  @date(schema[Tables.ROUTE_EVALUATIONS].updatedAt.name)
  updatedAt!: Date;
  @relation(Tables.ROUTES, schema[Tables.ROUTE_EVALUATIONS].routeId.name)
  route!: Route;
}

export default [User, RouteComment, Route, RouteEvaluation];
