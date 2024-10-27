import { unlink } from "fs/promises";
import { extname, join, normalize } from "path";

import { getFolders } from "../utils/getFolders";
import { getFilesRecursively } from "../utils/getFilesRecursively";

export async function clean() {
  const docsDir = normalize("./docs");

  const folders = await getFolders(docsDir);

  for (const folder of folders) {
    const files = await getFilesRecursively(join(folder, "input"));

    for (const file of files) {
      if (![".md", ".mdx"].includes(extname(file))) {
        unlink(file);
      }
    }
  }
}

clean();
