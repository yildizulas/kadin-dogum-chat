import React, { useState } from "react";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";
import { askGPT } from "../api/gptService";
import RecommendedQuestions from "../components/RecommendedQuestions";

// State to store chat messages
const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  // Function to handle sending user messages and getting GPT response
  const handleSendMessage = async (message) => {
    // Prevent sending empty messages
    if (!message.trim()) return;

    // Create user message object
    const userMessage = { role: "user", content: message };

    // Add user message to chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
    ]);

    try {
      // Send message to GPT API and await response
      const response = await askGPT(message);

      // Create bot response message object
      const botMessage = {
        role: "assistant",
        content: response,
      };

      // Add bot message to chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        botMessage,
      ]);
    } catch (error) {
      // Catch and log any API errors
      console.error("GPT API error:", error);
    }
  };

  return (
    // Render main chat container
    <div className="container">
      {/* Render header component */}
      <Header />

      {/* Render chat box and pass messages and send function */}
      <ChatBox
        messages={messages}
        sendMessage={handleSendMessage}
      />

      {/* Render recommended questions component with handler */}
      <RecommendedQuestions
        onSelectQuestion={handleSendMessage}
      />
    </div>
  );
};

export default ChatPage;
