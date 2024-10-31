// import OpenAI from "openai";
//
// async function main() {
//   const client = new OpenAI();
//
//   const stream = await client.chat.completions.create({
//     model: "gpt-4",
//     messages: [{ role: "user", content: "Say this is a test" }],
//     stream: true,
//   });
//   for await (const chunk of stream) {
//     process.stdout.write(chunk.choices[0]?.delta?.content || "");
//   }
// }
