// ChatPage.jsx

import React, { useState } from "react";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";
import RecommendedQuestions from "../components/RecommendedQuestions";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch(
        "http://localhost:3001/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "GPT hatası");
      }

      const botMessage = {
        role: "assistant",
        content: data.result,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("GPT API hatası:", error);
    }
  };

  return (
    <div className="container">
      <Header />
      <ChatBox
        messages={messages}
        sendMessage={handleSendMessage}
      />
      <RecommendedQuestions
        onSelectQuestion={handleSendMessage}
      />
    </div>
  );
};

export default ChatPage;
