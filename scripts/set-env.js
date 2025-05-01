const fs = require("fs");
const branch = process.env.VERCEL_GIT_BRANCH;

let envFile = ".env.production"; // Mặc định

if (branch === "staging") {
  envFile = ".env.staging";
}

fs.copyFileSync(envFile, ".env");
