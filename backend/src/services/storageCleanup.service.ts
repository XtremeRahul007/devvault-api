import path from "node:path";
import fs from 'node:fs/promises';
import { infrastructureConfig } from "../core/configs/infrastructure.js";

const metadataDir = path.join(process.cwd(), infrastructureConfig.METADATA_PATH);
const phyFileDir = path.join(process.cwd(), infrastructureConfig.FILES_PATH)

export async function cleanupOrphanFiles() {
  try {
    await cleanup();
    console.log("Clean up complete");
  } catch (err) {
    console.log("Clean up failed.");
    return;
  }
}

const cleanup = async (): Promise<void> => {
  const metaIDs = new Set(await getMetaIDs());
  const fileIDs = await getPhyFileIDs();

  for (const file of fileIDs) {
    if (!metaIDs.has(file)) {
      await fs.unlink(getFilePathByName(file));
    }
  }
}

const getMetaIDs = async (): Promise<string[]> => {
  return (await fs.readdir(metadataDir)).map(fileID => fileID.slice(12, -5));
}

const getPhyFileIDs = async (): Promise<string[]> => {
  return (await fs.readdir(phyFileDir)).map(fileId => fileId.slice(0, 36));
}

const getFilePathByName = (name: string): string => {
  return path.join(phyFileDir, name);
}
