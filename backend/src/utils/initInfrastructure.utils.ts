import { INFRA_DIR_LIST } from "../core/configs/infrastructure.js";
import fs from 'fs';

export function prepareRuntimeInfra() {
  console.log("Initializing runtime infrastructure...");

  INFRA_DIR_LIST.forEach((dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created missing directory: ${dirPath}`);
    }
  });
  console.log("Runtime infrastructure verified.");
}