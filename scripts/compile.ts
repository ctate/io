import { existsSync } from "fs";
import { extname, join, normalize } from "path";

import { getFilesRecursively } from "../utils/getFilesRecursively";
import { getFolders } from "../utils/getFolders";
import { readFile, writeFile } from "fs/promises";

export async function compile() {
  const docsDir = normalize("./docs");

  const folders = await getFolders(docsDir);

  for (const folder of folders) {
    const documentation: string[] = [];

    const inputFiles = existsSync(join(folder, "input"))
      ? await getFilesRecursively(join(folder, "input"))
      : [];
    const outputFiles = existsSync(join(folder, "output"))
      ? await getFilesRecursively(join(folder, "output"))
      : [];

    const sortedFiles = (outputFiles.length ? outputFiles : inputFiles).sort(
      ([a, b]) => b.localeCompare(a)
    );

    for (const file of sortedFiles) {
      if (![".md", ".mdx"].includes(extname(file))) {
        continue;
      }

      const content = await readFile(file, "utf8");
      documentation.push(content);
    }

    const name = folder.split("/").slice(-1)[0];

    await writeFile(`./public/docs/${name}.md`, documentation.join("\n\n"));
  }
}

compile();
