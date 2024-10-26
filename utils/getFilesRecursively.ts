import { readdir } from "fs/promises";
import path from "path";

export async function getFilesRecursively(
  directory: string
): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? await getFilesRecursively(fullPath)
        : fullPath;
    })
  );
  return files.flat();
}
