import { GoogleGenAI } from "@google/genai";

export const maxDuration = 30;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("📩 Received messages:", messages);

    // Format messages for Gemini
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `
You are a helpful AI assistant for a Todo App. You help users with:
- Task suggestions and planning
- Organizing and prioritizing tasks
- Breaking down complex tasks into smaller ones
- Time management advice
- Productivity tips

Keep responses concise and actionable. Focus on helping users manage their tasks effectively.
          `,
          },
        ],
      },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    ];

    // Generate response
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
    });

    const resultText = response.text ?? "No response text available.";

    return Response.json({ text: resultText });
  } catch (error) {
    console.error("AI Agent error:", error);
    return Response.json(
      {
        error: "Error processing request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


// import { GoogleGenAI } from "@google/genai";

// export const maxDuration = 30;

// // Create Gemini client with API key from environment variable
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();
//     console.log("📩 Received messages:", messages);

//     // Combine all user messages into one string
//     const userContent = messages
//       .map(
//         (msg: { role: string; content: string }) =>
//           `${msg.role}: ${msg.content}`
//       )
//       .join("\n");

//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash", // or gemini-1.5-flash / gemini-1.5-pro
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: `
// You are a helpful AI assistant for a Todo App. You help users with:
// - Task suggestions and planning
// - Organizing and prioritizing tasks
// - Breaking down complex tasks into smaller ones
// - Time management advice
// - Productivity tips

// Keep responses concise and actionable. Focus on helping users manage their tasks effectively.

// User input:
// ${userContent}
//               `,
//             },
//           ],
//         },
//       ],
//     });

//     // ✅ Access `.text` as a property, not as a function
//     const resultText = response.text;

//     return Response.json({ text: resultText });
//   } catch (error) {
//     console.error("AI Agent error:", error);
//     return Response.json(
//       {
//         error: "Error processing request",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }
