import { spawn } from "node:child_process";

const processes = [
  spawn("npm", ["run", "dev:api"], { stdio: "inherit", shell: true }),
  spawn("npm", ["run", "dev:client"], { stdio: "inherit", shell: true }),
];

const stopAll = () => {
  for (const child of processes) {
    if (!child.killed) child.kill("SIGTERM");
  }
};

for (const child of processes) {
  child.on("exit", (code) => {
    if (code && code !== 0) {
      stopAll();
      process.exit(code);
    }
  });
}

process.on("SIGINT", () => {
  stopAll();
  process.exit(0);
});

process.on("SIGTERM", () => {
  stopAll();
  process.exit(0);
});
