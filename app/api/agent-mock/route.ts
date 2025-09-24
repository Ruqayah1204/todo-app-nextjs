export const maxDuration = 30;

// Mock responses for testing
const mockResponses = [
  "Here are 5 morning routine tasks: 1) Make your bed, 2) Drink a glass of water, 3) Do 10 minutes of stretching, 4) Review your daily goals, 5) Have a healthy breakfast.",
  "To plan your workday effectively: Start by listing your top 3 priorities, block time for focused work, schedule breaks every 90 minutes, and review your progress at the end of the day.",
  "Let me break down 'Learn React' into smaller tasks: 1) Complete React tutorial basics, 2) Build a simple todo app, 3) Learn about hooks (useState, useEffect), 4) Practice with component composition, 5) Build a small project.",
  "For prioritizing weekend tasks, I recommend: Use the Eisenhower Matrix - Important & Urgent first, then Important but not Urgent, then Urgent but not Important, and finally neither urgent nor important.",
  "Meal prep checklist: 1) Plan 5-7 meals for the week, 2) Make grocery list, 3) Shop for ingredients, 4) Prep vegetables and proteins, 5) Cook grains and sauces, 6) Portion into containers, 7) Label with dates."
];

const generalResponses = [
  "That's a great question! For task management, I'd suggest breaking large tasks into smaller, actionable steps.",
  "Here's a helpful tip: Try using the 2-minute rule - if something takes less than 2 minutes, do it right away!",
  "For better productivity, consider time-blocking your calendar and setting specific times for different types of work.",
  "I'd recommend starting with your most important task when your energy is highest, typically in the morning.",
  "Consider using the Pomodoro Technique - 25 minutes of focused work followed by a 5-minute break."
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("📩 Mock AI - Received messages:", messages);
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    
    let response = "";
    
    // Match specific keywords to provide relevant responses
    if (lastMessage.includes("morning routine")) {
      response = mockResponses[0];
    } else if (lastMessage.includes("plan") && (lastMessage.includes("work") || lastMessage.includes("day"))) {
      response = mockResponses[1];
    } else if (lastMessage.includes("react") || lastMessage.includes("learn")) {
      response = mockResponses[2];
    } else if (lastMessage.includes("priorit")) {
      response = mockResponses[3];
    } else if (lastMessage.includes("meal") || lastMessage.includes("prep")) {
      response = mockResponses[4];
    } else {
      // Random general response
      response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
    
    return Response.json({ text: response });
  } catch (error) {
    console.error('Mock AI Agent error:', error);
    return Response.json({ 
      error: 'Error processing request', 
      details: error.message 
    }, { status: 500 });
  }
}