import spawnAsync from "@expo/spawn-async";
import chalk from "chalk";
import dotenv from "dotenv";

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
  console.log();
  console.log(chalk.green("[local-envs] Running the follwing command:"));
  console.log(command, args.join(" "));
  console.log();

  stdout.on("data", (data) => {
    const stringData = data.toString("utf8");
    console.log(chalk.green("[local-envs]"), stringData);
    output = stringData.split("\n").map((s) => s.trim());
  });

  await buildProcess;
  console.log(chalk.blue(`output: ${output}`));
};
run().then((r) => {
  console.log(chalk.yellow("Done!"));
});
