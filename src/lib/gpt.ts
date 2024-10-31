// import axios from "axios";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_API_URL =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// interface OutputFormat {
//   [key: string]: string | string[] | OutputFormat;
// }

// export async function strict_output(
//   system_prompt: string,
//   user_prompt: string | string[],
//   output_format: OutputFormat,
//   default_category: string = "",
//   output_value_only: boolean = false,
//   model: string = "gemini-1.5-flash",
//   temperature: number = 1,
//   num_tries: number = 3,
//   verbose: boolean = false
// ) {
//   const isListInput = Array.isArray(user_prompt);
//   const hasDynamicElements = /<.*?>/.test(JSON.stringify(output_format));
//   const isListOutput = /\[.*?\]/.test(JSON.stringify(output_format));

//   let errorMsg = "";

//   for (let attempt = 0; attempt < num_tries; attempt++) {
//     const outputFormatPrompt = generateOutputFormatPrompt(
//       output_format,
//       isListOutput,
//       hasDynamicElements,
//       isListInput
//     );

//     try {
//       const response = await axios.post(
//         GEMINI_API_URL,
//         {
//           temperature,
//           model,
//           messages: [
//             {
//               role: "system",
//               content: `${system_prompt}${outputFormatPrompt}${errorMsg}`,
//             },
//             { role: "user", content: user_prompt.toString() },
//           ],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${GEMINI_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Log full response to debug why output might be empty
//       console.log("Full response from Gemini API:", response.data);

//       // Ensure the response structure is valid
//       if (!response.data.choices || response.data.choices.length === 0) {
//         throw new Error("No choices returned from the API.");
//       }

//       const res = formatResponse(
//         response.data.choices[0].message?.content || ""
//       );

//       if (verbose) {
//         logVerboseOutput(
//           system_prompt,
//           outputFormatPrompt,
//           errorMsg,
//           user_prompt,
//           res
//         );
//       }

//       const output = parseAndValidateOutput(
//         res,
//         output_format,
//         isListInput,
//         default_category
//       );

//       if (output_value_only) {
//         return formatOutputValues(output);
//       }

//       return isListInput ? output : output[0];
//     } catch (e) {
//       errorMsg = `\n\nAttempt ${attempt + 1} failed. Error: ${e.message || e}`;
//       if (verbose) console.error("Error occurred:", e);
//     }
//   }

//   return [];
// }

// function generateOutputFormatPrompt(
//   output_format: OutputFormat,
//   isListOutput: boolean,
//   hasDynamicElements: boolean,
//   isListInput: boolean
// ): string {
//   return `
//     You are to output ${isListOutput ? "an array of objects in" : ""} the following JSON format: ${JSON.stringify(output_format)}.
//     ${isListOutput ? "Classify list fields with the best element." : ""}
//     ${
//       hasDynamicElements
//         ? `
//       Any text enclosed by < and > indicates dynamic content that you must generate.
//       Keys enclosed in < and > also require generation, like {'<location>': 'description'}.`
//         : ""
//     }
//     ${isListInput ? "Return an array of JSON objects, one for each input." : ""}
//   `;
// }

// function formatResponse(responseText: string): string {
//   return responseText.replace(/'/g, '"').replace(/(\w)"(\w)/g, "$1'$2");
// }

// function parseAndValidateOutput(
//   res: string,
//   output_format: OutputFormat,
//   isListInput: boolean,
//   default_category: string
// ) {
//   const output = JSON.parse(res);
//   if (isListInput && !Array.isArray(output)) {
//     throw new Error("Expected an array output.");
//   }

//   const outputs = isListInput ? output : [output];
//   outputs.forEach((item) =>
//     validateOutputFields(item, output_format, default_category)
//   );
//   return outputs;
// }

// function validateOutputFields(
//   output: Record<string, any>, // Specify type more clearly
//   output_format: OutputFormat,
//   default_category: string
// ) {
//   Object.keys(output_format).forEach((key) => {
//     if (!output.hasOwnProperty(key) && !/<.*?>/.test(key)) {
//       throw new Error(`Missing key: ${key}`);
//     }

//     const choices = output_format[key] as string[];
//     if (
//       Array.isArray(choices) &&
//       !choices.includes(output[key]) &&
//       default_category
//     ) {
//       output[key] = default_category;
//     }
//   });
// }

// function formatOutputValues(output: Record<string, any>[]): any {
//   return output.map((item) => {
//     const values = Object.values(item);
//     return values.length === 1 ? values[0] : values;
//   });
// }

// function logVerboseOutput(
//   system_prompt: string,
//   outputFormatPrompt: string,
//   errorMsg: string,
//   user_prompt: string | string[],
//   res: string
// ) {
//   console.log(
//     "System prompt:",
//     `${system_prompt}${outputFormatPrompt}${errorMsg}`
//   );
//   console.log("\nUser prompt:", user_prompt);
//   console.log("\nGemini response:", res);
// }
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
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output ${
      list_output ? "an array of objects in" : "the following"
    } JSON format: ${JSON.stringify(output_format)}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf the output field is a list, classify the output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: 'a place for education'}`;
    }

    if (list_input) {
      output_format_prompt += `\nGenerate an array of JSON, one JSON for each input element.`;
    }

    const response = await openai.createChatCompletion({
      temperature: temperature,
      model: model,
      messages: [
        {
          role: "system",
          content: system_prompt + output_format_prompt + error_msg,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });

    let res: string = response.data.choices[0].message?.content ?? "";
    // Directly use the response without altering the quotes
    res = res.trim();

    if (verbose) {
      console.log(
        "System prompt:",
        system_prompt + output_format_prompt + error_msg
      );
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

    try {
      let output: any = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output format not in an array of JSON");
        }
      } else {
        output = [output];
      }

      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) {
            continue;
          }

          if (!(key in output[index])) {
            throw new Error(`${key} not in JSON output`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            if (output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]);
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
      console.log("Current invalid JSON format ", res);
    }
  }

  return [];
}
