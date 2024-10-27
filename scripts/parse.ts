import { config } from "dotenv";
import { existsSync } from "fs";
import { dirname, extname, join, normalize } from "path";
import { mkdir, readFile, writeFile } from "fs/promises";

import { getChecksum } from "../utils/getChecksum";
import { getFilesRecursively } from "../utils/getFilesRecursively";
import { getFolders } from "../utils/getFolders";
import { parseText } from "../utils/parseText";
import { replaceInputWithOutput } from "../utils/replaceInputWithOutput";

config({ path: ".env.local" });

async function parse() {
  const docsDir = normalize("./docs");

  const folders = await getFolders(docsDir);

  for (const folder of folders) {
    const files = await getFilesRecursively(join(folder, "input"));

    for (const file of files) {
      if (![".md", ".mdx"].includes(extname(file))) {
        continue;
      }

      console.log(`Parsing: ${file}`);
      const prompt = await readFile(file, "utf8");
      const promptChecksum = getChecksum(prompt);

      const ioLockFile = normalize("io-lock.json");
      const ioLock = JSON.parse(await readFile("io-lock.json", "utf8"));

      if (ioLock[file] === promptChecksum) {
        console.log("Skipped");
        continue;
      }

      const text = await parseText(prompt);

      const outputFile = replaceInputWithOutput(file);
      const outputDir = dirname(outputFile);

      if (!existsSync(outputDir)) {
        await mkdir(outputDir, { recursive: true });
      }

      await writeFile(outputFile, text);

      ioLock[file] = promptChecksum;
      await writeFile(ioLockFile, JSON.stringify(ioLock, null, 2));

      console.log(`\nDone: ${outputFile}`);
    }
  }
}

parse();
