import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const maxDuration = 30;

// Configure OpenAI with your API key
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("📩 Received messages:", messages);

    const result = await generateText({
      model: openai('gpt-3.5-turbo'),
      messages,
      system: `You are a helpful AI assistant for a Todo App. You help users with:
      - Task suggestions and planning
      - Organizing and prioritizing tasks
      - Breaking down complex tasks into smaller ones
      - Time management advice
      - Productivity tips
      
      Keep responses concise and actionable. Focus on helping users manage your tasks effectively.`,
    });

    return Response.json({ text: result.text });
  } catch (error) {
    console.error('AI Agent error:', error);
    return Response.json({ error: 'Error processing request', details: error.message }, { status: 500 });
  }
}
