import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gemini-1.5-flash",
  temperature: number = 0.7,
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

      // Add specific instruction to return only JSON without markdown
      output_format_prompt += `\nReturn ONLY the JSON response without any markdown formatting, code blocks, or additional text.`;

      const model_instance = genAI.getGenerativeModel({ 
        model,
        generationConfig: {
          temperature,
          maxOutputTokens: 8192,
        }
      });

      const full_prompt = system_prompt + output_format_prompt + error_msg + "\n\n" + 
        (Array.isArray(user_prompt) ? user_prompt.join("\n") : user_prompt);

      const result = await model_instance.generateContent(full_prompt);
      const response = await result.response;
      const res = response.text().trim();

      if (!res) {
        throw new Error("Empty response from Gemini");
      }

      if (verbose) {
        console.log("System prompt:", system_prompt + output_format_prompt + error_msg);
        console.log("\nUser prompt:", user_prompt);
        console.log("\nGemini response:", res);
      }

      // Enhanced JSON extraction to handle markdown code blocks and other formats
      let sanitizedRes = res;
      
      // Try to extract JSON from markdown code blocks first
      const codeBlockMatch = res.match(/``````/);
      if (codeBlockMatch) {
        sanitizedRes = codeBlockMatch[1].trim();
      } else {
        // Try to find JSON object/array patterns
        const jsonMatch = res.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
        if (jsonMatch) {
          sanitizedRes = jsonMatch[1].trim();
        }
      }

      // Clean up any remaining formatting issues
      sanitizedRes = sanitizedRes
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\t/g, '\t');

      let output;
      try {
        output = JSON.parse(sanitizedRes);
      } catch (parseError) {
        // If JSON parsing fails, try cleaning the response more aggressively
        const cleanedRes = sanitizedRes
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
          .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
          .trim();

        try {
          output = JSON.parse(cleanedRes);
        } catch (secondParseError) {
          throw new Error(`Failed to parse Gemini response after cleaning. Original: "${res}", Sanitized: "${sanitizedRes}", Cleaned: "${cleanedRes}"`);
        }
      }

      if (list_input && !Array.isArray(output)) {
        output = [output];
      }

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
              value = value.split(":");
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

      return list_input ? validatedOutput : validatedOutput;
    } catch (e) {
      console.error(`Attempt ${i + 1} failed:`, e);
      error_msg = `\n\nPrevious error: ${e instanceof Error ? e.message : "Unknown error"}. Please fix this error and return valid JSON without any markdown formatting.`;

      if (i === num_tries - 1) {
        console.error("All attempts failed");
        throw e;
      }
    }
  }

  throw new Error("All attempts failed");
}