import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    
    // Call backend
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input })
    });
    const data = await res.json();
    
    setMessages([...messages, { role: "user", content: input }, { role: "ai", content: data.answer }]);
    setInput("");
  };

  return (
    <div className="border rounded p-4 bg-gray-50">
      <div className="h-64 overflow-y-auto mb-3 p-2 bg-white border">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === "user" ? "text-blue-600" : "text-green-700"}`}>
            <b>{msg.role.toUpperCase()}:</b> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="bg-blue-700 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}
