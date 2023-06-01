import { GradeSystemsSchema } from "@andescalada/db/zod";
import { schema, Table } from "@local-database/model/schema";
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
  static table = Table.USER;
  static associations = {
    [Table.ROUTE_COMMENT]: {
      type: hasMany,
      foreignKey: schema[Table.ROUTE_COMMENT].userId.name,
    },
    [Table.ROUTE_EVALUATION]: {
      type: hasMany,
      foreignKey: schema[Table.ROUTE_EVALUATION].userId.name,
    },
  };

  @text(schema[Table.USER].name.name) name!: string;
  @text(schema[Table.USER].username.name) username!: string;
  @field(schema[Table.USER].ownUser.name) ownUser!: boolean;
  @readonly @date(schema[Table.USER].createdAt.name) createdAt!: Date;
  @text(schema[Table.USER].email.name) email!: string;
  @json(schema[Table.USER].preferredSportGrade.name, (rawReaction) =>
    GradeSystemsSchema.parse(rawReaction),
  )
  preferredSportGrade!: typeof GradeSystemsSchema._type;
  @json(schema[Table.USER].preferredBoulderGrade.name, (rawReaction) =>
    GradeSystemsSchema.parse(rawReaction),
  )
  preferredBoulderGrade!: typeof GradeSystemsSchema._type;
  @json(schema[Table.USER].preferredTradGrade.name, (rawReaction) =>
    GradeSystemsSchema.parse(rawReaction),
  )
  preferredTradGrade!: typeof GradeSystemsSchema._type;
}

export class RouteComment extends Model {
  static table = Table.ROUTE_COMMENT;
  static associations = {
    [Table.USER]: {
      type: belongsTo,
      key: schema[Table.ROUTE_COMMENT].userId.name,
    },
  };

  @text(schema[Table.ROUTE_COMMENT].comment.name) comment!: string;
  @text(schema[Table.ROUTE_COMMENT].routeId.name) routeId!: string;
  @text(schema[Table.ROUTE_COMMENT].userId.name) userId!: string;
  @readonly
  @date(schema[Table.ROUTE_COMMENT].createdAt.name)
  createdAt!: Date;
  @readonly
  @date(schema[Table.ROUTE_COMMENT].updatedAt.name)
  updatedAt!: Date;
  @relation(Table.USER, schema[Table.ROUTE_COMMENT].userId.name)
  user!: User;
}

export class RouteEvaluation extends Model {
  static table = Table.ROUTE_EVALUATION;
  static associations = {
    [Table.USER]: {
      type: belongsTo,
      key: schema[Table.ROUTE_EVALUATION].userId.name,
    },
  };

  @text(schema[Table.ROUTE_EVALUATION].routeId.name) routeId!: string;
  @text(schema[Table.ROUTE_EVALUATION].userId.name) userId!: string;
  @field(schema[Table.ROUTE_EVALUATION].evaluation.name) evaluation!: number;
  @readonly
  @date(schema[Table.ROUTE_EVALUATION].createdAt.name)
  createdAt!: Date;
  @readonly
  @date(schema[Table.ROUTE_EVALUATION].updatedAt.name)
  updatedAt!: Date;
}

export default [User, RouteComment, RouteEvaluation];
