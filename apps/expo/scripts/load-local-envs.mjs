import spawnAsync from "@expo/spawn-async";
import chalk from "chalk";
import dotenv from "dotenv";
import fs from "fs/promises";

const appDir = process.cwd();

dotenv.config();

console.log();
console.log(chalk.green("Loading local envs"));
console.log(appDir);

console.log();

const run = async () => {
  const [command, ..._args] = process.argv.slice(2);

  const args = [..._args];

  const buildProcess = spawnAsync(command, args, {
    stdio: ["inherit", "pipe", "pipe"],
    env: process.env,
    cwd: process.cwd(),
  });
  const {
    child: { stdout, stderr },
  } = buildProcess;

  if (!(stdout && stderr)) {
    throw new Error("Failed to spawn build process");
  }

  let output = [];
  let errorOccurred = false;

  console.log(chalk.green("[local-envs] Running the following command:"));
  console.log(command, args.join(" "));
  console.log();

  stdout.on("data", (data) => {
    const stringData = data.toString("utf8");
    console.log(chalk.green("[local-envs]"), stringData);
    output.push({ type: "stdout", content: stringData.trim() });
  });

  stderr.on("data", (data) => {
    const stringData = data.toString("utf8");
    console.log(chalk.red("[local-envs]"), stringData);
    output.push({ type: "stderr", content: stringData.trim() });
    errorOccurred = true;
  });

  try {
    await buildProcess;
  } catch (err) {
    errorOccurred = true;
    console.log(chalk.red("[local-envs] Error:"), err.message);
    output.push({ type: "error", content: err.message });
  }

  if (errorOccurred) {
    const date = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `error-log_${command}_${date}.json`;

    const errorLog = {
      command: `${command} ${args.join(" ")}`,
      cwd: process.cwd(),
      env: process.env,
      output: output,
      timestamp: new Date().toISOString(),
    };

    try {
      await fs.writeFile(fileName, JSON.stringify(errorLog, null, 2));
      console.log(
        chalk.yellow(`[local-envs] Error log written to ${fileName}`),
      );
    } catch (writeErr) {
      console.error(
        chalk.red(
          `[local-envs] Failed to write error log: ${writeErr.message}`,
        ),
      );
    }
  }

  console.log(chalk.blue("Output summary:"));
  output.forEach(({ type, content }) => {
    console.log(
      chalk[type === "stderr" ? "red" : "green"](`[${type}] ${content}`),
    );
  });
};

run().then((r) => {
  console.log(chalk.yellow("Done!"));
});
