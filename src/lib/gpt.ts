import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENROUTER_API_KEY,
  basePath: "https://openrouter.ai/api/v1",
});

const openai = new OpenAIApi(configuration);

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  const list_input = Array.isArray(user_prompt);
  const dynamic_elements = /<.*?>/.test(JSON.stringify(output_format));
  const list_output = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg = "";

  for (let i = 0; i < num_tries; i++) {
    try {
      let output_format_prompt = `\nYou are to output ${
        list_output ? "an array of objects in" : "the following"
      } JSON format: ${JSON.stringify(output_format)}. \nDo not put quotation marks or escape character \\ in the output fields.`;

      if (list_output) {
        output_format_prompt += `\nIf the output field is a list, classify the output into the best element of the list.`;
      }

      if (dynamic_elements) {
        output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it.`;
      }

      if (list_input) {
        output_format_prompt += `\nGenerate an array of JSON, one JSON for each input element.`;
      }

      const response = await openai.createChatCompletion({
        temperature,
        model,
        messages: [
          {
            role: "system",
            content: system_prompt + output_format_prompt + error_msg,
          },
          {
            role: "user",
            content: Array.isArray(user_prompt)
              ? user_prompt.join("\n")
              : user_prompt,
          },
        ],
      });

      if (!response?.data?.choices?.[0]?.message?.content) {
        throw new Error("Invalid response structure from OpenAI");
      }

      const res = response.data.choices[0].message.content.trim();

      if (!res) {
        throw new Error("Empty response from OpenAI");
      }

      if (verbose) {
        console.log(
          "System prompt:",
          system_prompt + output_format_prompt + error_msg
        );
        console.log("\nUser prompt:", user_prompt);
        console.log("\nGPT response:", res);
      }

      const sanitizedRes = res.replace(/\\([\"\\])/g, "$1");
      let output;
      try {
        output = JSON.parse(sanitizedRes);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        throw new Error(`Failed to parse GPT response: ${sanitizedRes}`);
      }

      if (list_input && !Array.isArray(output)) {
        output = [output];
      }

      // Validate and process the output
      const processedOutput = Array.isArray(output) ? output : [output];

      const validatedOutput = processedOutput.map((item) => {
        const processedItem = { ...item };

        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue;

          if (!(key in processedItem)) {
            throw new Error(`Missing required key: ${key}`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            let value = Array.isArray(processedItem[key])
              ? processedItem[key][0]
              : processedItem[key];

            if (typeof value === "string" && value.includes(":")) {
              value = value.split(":")[0];
            }

            processedItem[key] = choices.includes(value)
              ? value
              : default_category;
          }
        }

        return output_value_only
          ? Object.values(processedItem).length === 1
            ? Object.values(processedItem)[0]
            : Object.values(processedItem)
          : processedItem;
      });

      return list_input ? validatedOutput : validatedOutput[0];
    } catch (e) {
      console.error(`Attempt ${i + 1} failed:`, e);
      error_msg = `\n\nPrevious error: ${e instanceof Error ? e.message : "Unknown error"}. Please fix this error and try again.`;

      if (i === num_tries - 1) {
        console.error("All attempts failed");
        throw e;
      }
    }
  }

  throw new Error("All attempts failed");
}
