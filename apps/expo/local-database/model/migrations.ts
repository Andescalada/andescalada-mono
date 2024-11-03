import { isDefined } from "@andescalada/api/src/utils/filterGuards";
import { migrationRecord } from "@andescalada/utils/local-database";
import {
  createTable,
  schemaMigrations,
} from "@nozbe/watermelondb/Schema/migrations";

const parseMigrationSteps = (migrationNumber: number) => {
  const selectedMigration = Object.entries(migrationRecord).find(
    ([version]) => Number(version) === migrationNumber,
  );

  if (!selectedMigration) {
    throw new Error(`Migration ${migrationNumber} not found`);
  }

  return Object.entries(selectedMigration[1])
    .map(([action, instructions]) => {
      if (action === "createTable") {
        return instructions
          .map((tablesObject) => {
            return Object.entries(tablesObject).map(
              ([tableName, columnsObject]) => {
                const columns = Object.values(columnsObject);
                return createTable({
                  name: tableName,
                  columns,
                });
              },
            );
          })
          .flat();
      }
    })
    .filter(isDefined)
    .flat();
};

export default schemaMigrations({
  migrations: [
    {
      // ⚠️ Set this to a number one larger than the current schema version
      toVersion: 2,
      steps: parseMigrationSteps(2),
    },
  ],
});
