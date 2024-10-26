import { join, normalize } from "path";

import { getFilesRecursively } from "../utils/getFilesRecursively";
import { getFolders } from "../utils/getFolders";
import { readFile, writeFile } from "fs/promises";

export async function compile() {
  const docsDir = normalize("./docs");

  const folders = await getFolders(docsDir);

  for (const folder of folders) {
    const documentation: string[] = [];

    const inputFiles = await getFilesRecursively(join(folder, "input"));
    const outputFiles = await getFilesRecursively(join(folder, "output"));

    const sortedFiles = (outputFiles.length ? outputFiles : inputFiles).sort(
      ([a, b]) => b.localeCompare(a)
    );

    for (const file of sortedFiles) {
      const content = await readFile(file, "utf8");
      documentation.push(content);
    }

    const name = folder.split("/").slice(-1)[0];

    await writeFile(`./public/docs/${name}.md`, documentation.join("\n\n"));
  }
}

compile();
