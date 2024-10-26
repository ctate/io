import { readdir } from "fs/promises";
import path from "path";

export async function getFolders(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(directory, entry.name));
  return folders;
}
