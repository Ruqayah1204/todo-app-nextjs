"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent-mock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      
      if (res.ok) {
        const aiMessage = { role: "assistant", content: data.text };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        console.error("API Error:", data.error);
        const errorMessage = { role: "assistant", content: "Sorry, I encountered an error. Please try again." };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Network Error:", error);
      const errorMessage = { role: "assistant", content: "Sorry, I couldn't connect to the server. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tasks
        </Link>
        <h1 className="text-2xl font-bold">AI Task Assistant</h1>
      </div>
      
      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-gray-50">
        {messages.length === 0 ? (
<p className="text-gray-500 text-center">👋 Hi! I&apos;m your AI task assistant. Ask me anything about organizing your tasks!</p>
        ) : (
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-lg ${
                m.role === 'user' 
                  ? 'bg-blue-500 text-white ml-8' 
                  : 'bg-white border mr-8'
              }`}>
                <strong className="text-sm opacity-75">{m.role === 'user' ? 'You' : 'AI Assistant'}:</strong>
                <p className="mt-1">{m.content}</p>
              </div>
            ))}
            {loading && (
              <div className="bg-white border mr-8 p-3 rounded-lg">
                <strong className="text-sm opacity-75">AI Assistant:</strong>
                <p className="mt-1 text-gray-500">Thinking...</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="border rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me to help with your tasks..."
          disabled={loading}
        />
        <button 
          onClick={sendMessage} 
          disabled={loading || !input.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      
      <div className="mt-4">
<p className="text-sm text-gray-600">Try asking: &quot;Suggest 5 morning routine tasks&quot; or &quot;Help me plan my workday&quot;</p>
      </div>
    </div>
  );
}
