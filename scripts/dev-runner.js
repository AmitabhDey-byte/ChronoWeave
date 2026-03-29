const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";
const pythonCommand = isWindows ? "python" : "python3";
const repoRoot = path.resolve(__dirname, "..");
const ragDir = path.join(repoRoot, "rag");
const ragEmbeddingsCandidates = [
  path.join(ragDir, "data", "embeddings", "chroma.sqlite3"),
  path.join(ragDir, "core", "rag", "data", "embeddings", "chroma.sqlite3"),
  path.join(ragDir, "rag", "data", "embeddings", "chroma.sqlite3"),
];

const processes = [
  {
    name: "backend",
    color: "\x1b[33m",
    command: pythonCommand,
    args: ["run.py"],
    cwd: path.join(repoRoot, "backend"),
  },
  {
    name: "frontend",
    color: "\x1b[36m",
    command: npmCommand,
    args: ["run", "dev"],
    cwd: path.join(repoRoot, "frontend", "my-app"),
  },
];

const reset = "\x1b[0m";
const children = [];
let shuttingDown = false;

function log(name, color, message) {
  process.stdout.write(`${color}[${name}]${reset} ${message}`);
}

function runProcess(proc) {
  const useShell = proc.shell ?? (isWindows && proc.command.toLowerCase().endsWith(".cmd"));
  const child = spawn(proc.command, proc.args, {
    cwd: proc.cwd,
    stdio: ["inherit", "pipe", "pipe"],
    shell: useShell,
  });

  child.stdout.on("data", (chunk) => {
    log(proc.name, proc.color, chunk.toString());
  });

  child.stderr.on("data", (chunk) => {
    log(proc.name, proc.color, chunk.toString());
  });

  return child;
}

function stopAll(exitCode = 0) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGINT");
    }
  }

  setTimeout(() => process.exit(exitCode), 250);
}

function hasEmbeddings() {
  return ragEmbeddingsCandidates.some((candidate) => fs.existsSync(candidate));
}

function prepareRag() {
  if (hasEmbeddings() || process.env.SKIP_RAG_PREP === "true") {
    log("rag", "\x1b[35m", "embeddings detected, skipping setup\n");
    return Promise.resolve();
  }

  log("rag", "\x1b[35m", "no embeddings found, running ingest + embed once before startup\n");

  return new Promise((resolve, reject) => {
    const child = runProcess({
      name: "rag",
      color: "\x1b[35m",
      command: pythonCommand,
      args: ["run.py", "--mode", "all"],
      cwd: ragDir,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`RAG setup stopped with exit code ${code}`));
    });
  });
}

async function main() {
  try {
    await prepareRag();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log("rag", "\x1b[35m", `${message}\n`);
    process.exit(1);
  }

  for (const proc of processes) {
    const child = runProcess(proc);
    children.push(child);

    child.on("exit", (code) => {
      if (!shuttingDown && code && code !== 0) {
        log(proc.name, proc.color, `stopped with exit code ${code}\n`);
        stopAll(code);
      }
    });
  }
}

process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));
main();
