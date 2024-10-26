import path from "path";

export function replaceInputWithOutput(filePath: string): string {
  const parts = filePath.split(path.sep);

  // Replace the third component if it's "input"
  if (parts[2] === "input") {
    parts[2] = "output";
  }

  // Join the modified parts back and change the extension to ".md"
  const newPath = parts.join(path.sep);
  return path.join(
    path.dirname(newPath),
    path.basename(newPath, path.extname(newPath)) + ".md"
  );
}
