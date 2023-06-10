import { schema, Table } from "@andescalada/utils/local-database";
import { appSchema, tableSchema } from "@nozbe/watermelondb";

const tables = Object.entries(schema).map(([name, columns]) => {
  return tableSchema({
    name,
    columns: Object.values(columns).map((options) => options),
  });
});

export { schema, Table };

export default appSchema({
  version: 1,
  tables,
});
