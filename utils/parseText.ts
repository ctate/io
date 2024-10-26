import { groq } from "@ai-sdk/groq";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { readFile } from "fs/promises";

export async function parseText(prompt: string) {
  const system = await readFile("./scripts/prompt.md", "utf8");
  try {
    console.log("Trying Groq...");

    const { textStream } = await streamText({
      model: groq("llama-3.2-90b-text-preview"),
      system,
      prompt,
    });

    let text = "";
    for await (const textPart of textStream) {
      text += textPart;

      process.stdout.write(textPart);
    }

    return text;
  } catch (error) {
    if (
      !(error as Error).message.includes(
        "Request too large for model `llama-3.2-90b-text-preview`"
      )
    ) {
      throw error;
    }

    console.log("Trying OpenAI...");

    const { textStream } = await streamText({
      model: openai("gpt-4o-mini"),
      system,
      prompt,
    });

    let text = "";
    for await (const textPart of textStream) {
      text += textPart;

      process.stdout.write(textPart);
    }

    return text;
  }
}
