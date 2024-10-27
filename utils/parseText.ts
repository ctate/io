import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { readFile } from "fs/promises";

export async function parseText(prompt: string) {
  const system = await readFile("./scripts/prompt.md", "utf8");

  const { textStream } = await streamText({
    model: openai("gpt-4o-mini"),
    system,
    experimental_continueSteps: true,
    onFinish: ({ usage }) => {
      const { promptTokens, completionTokens, totalTokens } = usage;
      console.log("Prompt tokens:", promptTokens);
      console.log("Completion tokens:", completionTokens);
      console.log("Total tokens:", totalTokens);
    },
    prompt,
  });

  let text = "";
  for await (const textPart of textStream) {
    text += textPart;

    process.stdout.write(textPart);
  }

  return text;
}
