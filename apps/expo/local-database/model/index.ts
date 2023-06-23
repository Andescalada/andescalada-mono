import { GradeSystemsSchema } from "@andescalada/db/zod";
import { columns } from "@andescalada/utils/local-database";
import { schema, Table } from "@local-database/model/schema";
import { Model, Q } from "@nozbe/watermelondb";
import {
  date,
  field,
  json,
  lazy,
  readonly,
  relation,
  text,
  writer,
} from "@nozbe/watermelondb/decorators";

const hasMany = "has_many" as const;
const belongsTo = "belongs_to" as const;

export class User extends Model {
  static table = Table.USER;
  static associations = {
    // [Table.ROUTE_COMMENT]: {
    //   type: hasMany,
    //   foreignKey: schema[Table.ROUTE_COMMENT].userId.name,
    // },
    [Table.ROUTE_EVALUATION]: {
      type: hasMany,
      foreignKey: schema[Table.ROUTE_EVALUATION].userId.name,
    },
    [Table.ROUTE_GRADE_EVALUATION]: {
      type: hasMany,
      foreignKey: schema[Table.ROUTE_GRADE_EVALUATION].userId.name,
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

  @relation(Table.ROUTE_EVALUATION, schema[Table.ROUTE_EVALUATION].userId.name)
  routeEvaluations!: RouteEvaluation[];

  @relation(
    Table.ROUTE_GRADE_EVALUATION,
    schema[Table.ROUTE_GRADE_EVALUATION].userId.name,
  )
  routeGradeEvaluations!: RouteGradeEvaluation[];
}

// export class RouteComment extends Model {
//   static table = Table.ROUTE_COMMENT;
//   static associations = {
//     [Table.USER]: {
//       type: belongsTo,
//       key: schema[Table.ROUTE_COMMENT].userId.name,
//     },
//   };

//   @text(schema[Table.ROUTE_COMMENT].comment.name) comment!: string;
//   @text(schema[Table.ROUTE_COMMENT].routeId.name) routeId!: string;
//   @text(schema[Table.ROUTE_COMMENT].userId.name) userId!: string;
//   @readonly
//   @date(schema[Table.ROUTE_COMMENT].createdAt.name)
//   createdAt!: Date;
//   @readonly
//   @date(schema[Table.ROUTE_COMMENT].updatedAt.name)
//   updatedAt!: Date;
//   @relation(Table.USER, schema[Table.ROUTE_COMMENT].userId.name)
//   user!: User;
// }

export class RouteGradeEvaluation extends Model {
  static table = Table.ROUTE_GRADE_EVALUATION;
  static associations = {
    [Table.USER]: {
      type: belongsTo,
      key: schema[Table.ROUTE_GRADE_EVALUATION].userId.name,
    },
  };

  @text(columns[Table.ROUTE_GRADE_EVALUATION].routeId) routeId!: string;
  @text(columns[Table.ROUTE_GRADE_EVALUATION].userId) userId!: string;
  @field(columns[Table.ROUTE_GRADE_EVALUATION].evaluation) evaluation!: number;
  @json(
    columns[Table.ROUTE_GRADE_EVALUATION].originalGradeSystem,
    (rawReaction) => GradeSystemsSchema.parse(rawReaction),
  )
  originalGradeSystem!: typeof GradeSystemsSchema._type;
  @field(columns[Table.ROUTE_GRADE_EVALUATION].originalGrade)
  originalGrade!: string;
  @readonly
  @date(columns[Table.ROUTE_GRADE_EVALUATION].createdAt)
  createdAt!: Date;
  @readonly
  @date(columns[Table.ROUTE_GRADE_EVALUATION].updatedAt)
  updatedAt!: Date;
  @relation(Table.USER, columns[Table.ROUTE_GRADE_EVALUATION].userId)
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
  @relation(Table.USER, schema[Table.ROUTE_EVALUATION].userId.name)
  user!: User;

  @lazy async getEvaluation({ routeId }: { routeId: string }) {
    const routeEvaluations = await this.collections
      .get<RouteEvaluation>(Table.ROUTE_EVALUATION)
      .query(
        Q.and(
          Q.where("routeId", routeId),
          Q.on("user", Q.where(columns.User.ownUser, true)),
        ),
      );

    return routeEvaluations.length ? routeEvaluations[0] : null;
  }

  @writer async setEvaluation({
    evaluation,
    routeId,
    id,
  }: {
    evaluation: number;
    routeId: string;
    id?: string;
  }) {
    const users = await this.collections
      .get<User>(Table.USER)
      .query(Q.where("ownUser", true));

    const userId = users.length ? users[0].id : null;

    if (!userId) throw new Error("User not found");

    const routeEvaluations = await this.collections
      .get<RouteEvaluation>(Table.ROUTE_EVALUATION)
      .query(
        Q.where(columns.RouteEvaluation.userId, userId),
        Q.where(columns.RouteEvaluation.routeId, routeId),
        Q.take(1),
      );

    const routeEvaluation = routeEvaluations.length
      ? routeEvaluations[0]
      : null;

    if (routeEvaluation) {
      return await routeEvaluation.update((routeEvaluation) => {
        if (id) routeEvaluation._raw.id = id;
        routeEvaluation.evaluation = evaluation;
        routeEvaluation.routeId = routeId;
      });
    }
    return await this.collections
      .get<RouteEvaluation>(Table.ROUTE_EVALUATION)
      .create((routeEvaluation) => {
        if (id) routeEvaluation._raw.id = id;
        routeEvaluation.userId = userId;
        routeEvaluation.evaluation = evaluation;
        routeEvaluation.routeId = routeId;
      });
  }
}

export default [User, RouteEvaluation, RouteGradeEvaluation];
