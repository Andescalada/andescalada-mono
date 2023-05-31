import create from "@andescalada/api/src/routers/zones/create";
import { schema, Tables } from "@local-database/model/schema";
import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  readonly,
  relation,
  text,
  writer,
} from "@nozbe/watermelondb/decorators";

const hasMany = "has_many" as const;
const belongsTo = "belongs_to" as const;

export class User extends Model {
  static table = Tables.USERS;
  static associations = {
    [Tables.ROUTE_COMMENTS]: {
      type: hasMany,
      foreignKey: schema[Tables.ROUTE_COMMENTS].user_id.name,
    },
    [Tables.ROUTE_EVALUATIONS]: {
      type: hasMany,
      foreignKey: schema[Tables.ROUTE_EVALUATIONS].user_id.name,
    },
  };

  @text(schema[Tables.USERS].name.name) name!: string;
  @text(schema[Tables.USERS].username.name) username!: string;
  @field(schema[Tables.USERS].ownUser.name) ownUser!: boolean;
  @readonly @date(schema[Tables.USERS].created_at.name) createdAt!: Date;
  @text(schema[Tables.USERS].email.name) email!: string;
  @text(schema[Tables.USERS].backend_id.name) backendId!: string;
}

export class Route extends Model {
  static table = Tables.ROUTES;
  static associations = {
    [Tables.ROUTE_COMMENTS]: {
      type: hasMany,
      foreignKey: schema[Tables.ROUTE_COMMENTS].route_id.name,
    },
    [Tables.ROUTE_EVALUATIONS]: {
      type: hasMany,
      foreignKey: schema[Tables.ROUTE_EVALUATIONS].route_id.name,
    },
  };

  @text(schema[Tables.ROUTES].name.name) name!: string;
  @text(schema[Tables.ROUTES].backend_id.name) backendId!: string;
}

export class RouteComment extends Model {
  static table = Tables.ROUTE_COMMENTS;
  static associations = {
    [Tables.USERS]: {
      type: belongsTo,
      key: schema[Tables.ROUTE_COMMENTS].user_id.name,
    },
  };

  @text(schema[Tables.ROUTE_COMMENTS].comment.name) comment!: string;
  @text(schema[Tables.ROUTE_COMMENTS].route_id.name) routeId!: string;
  @text(schema[Tables.ROUTE_COMMENTS].user_id.name) userId!: string;
  @text(schema[Tables.ROUTE_COMMENTS].backend_id.name) backendId!: string;
  @readonly
  @date(schema[Tables.ROUTE_COMMENTS].created_at.name)
  createdAt!: Date;
  @readonly
  @date(schema[Tables.ROUTE_COMMENTS].updated_at.name)
  updatedAt!: Date;
  @relation(Tables.USERS, schema[Tables.ROUTE_COMMENTS].user_id.name)
  user!: User;
}

export class RouteEvaluation extends Model {
  static table = Tables.ROUTE_EVALUATIONS;
  static associations = {
    [Tables.ROUTES]: {
      type: belongsTo,
      key: schema[Tables.ROUTE_EVALUATIONS].route_id.name,
    },
    [Tables.USERS]: {
      type: belongsTo,
      key: schema[Tables.ROUTE_EVALUATIONS].user_id.name,
    },
  };

  @text(schema[Tables.ROUTE_EVALUATIONS].route_id.name) routeId!: string;
  @text(schema[Tables.ROUTE_EVALUATIONS].user_id.name) userId!: string;
  @text(schema[Tables.ROUTE_EVALUATIONS].backend_id.name) backendId!: string;
  @field(schema[Tables.ROUTE_EVALUATIONS].evaluation.name) evaluation!: number;
  @readonly
  @date(schema[Tables.ROUTE_EVALUATIONS].created_at.name)
  createdAt!: Date;
  @readonly
  @date(schema[Tables.ROUTE_EVALUATIONS].updated_at.name)
  updatedAt!: Date;
  @relation(Tables.ROUTES, schema[Tables.ROUTE_EVALUATIONS].route_id.name)
  route!: Route;
}

export default [User, RouteComment, Route, RouteEvaluation];
