import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setIsLoading(true);
    setBotResponse("");

    try {
      const res = await axios.post("http://localhost:5000/chatbot", { message });
      setBotResponse(res.data.bot_response);
    } catch (err) {
      console.error("Error:", err);
      setBotResponse("Error connecting to server. Please try again.");
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Navbar />
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl items-center font-semibold text-green-700 mb-4">
          🌱 Sustainability Chatbot
        </h2>

        <textarea
          className="w-full border border-gray-300 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="3"
          placeholder="Ask about sustainability..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <div className="flex justify-end mt-3">
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>

        {botResponse && (
          <div className="mt-5 bg-gray-100 border border-gray-200 p-4 rounded-xl">
            <p className="text-gray-800 whitespace-pre-wrap">{botResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
