import React, { useState, useEffect, useRef } from "react";
import {
  textToSpeech,
  stopSpeech,
} from "../api/textToSpeechService";
import { startVoiceRecognition } from "../api/voiceRecognitionService";

const ChatBox = ({ messages, sendMessage }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom when a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Handle text-to-speech functionality
  const handleSpeech = (text, index) => {
    if (isSpeaking === index) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      textToSpeech(text, () => setIsSpeaking(index));
    }
  };

  // Send user's text input as a message
  const handleSend = () => {
    if (inputText.trim() !== "") {
      sendMessage(inputText);
      setInputText(""); // Clear input after sending
    }
  };

  // Start voice recognition and convert speech to text
  const handleVoiceInput = () => {
    setIsListening(true); // Indicate listening state

    startVoiceRecognition()
      .then((transcript) => {
        setInputText(transcript);
        setIsListening(false);
      })
      .catch(() => {
        setIsListening(false);
      });
  };

  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.role}`}
        >
          <p>{msg.content}</p>
          {msg.role === "assistant" && (
            <button
              className="read-aloud-button"
              onClick={() =>
                handleSpeech(msg.content, index)
              }
            >
              {isSpeaking === index
                ? "⏹️ Stop"
                : "🔊 Listen"}
            </button>
          )}
        </div>
      ))}

      {/* Empty div for auto-scrolling */}
      <div ref={chatEndRef}></div>

      {/* User message input area */}
      <div className="input-container">
        <textarea
          className="textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your question here..."
        />

        {/* Buttons placed side by side */}
        <div className="button-group">
          <button
            className="voice-button"
            onClick={handleVoiceInput}
          >
            🎤{" "}
            {isListening ? "Listening..." : "Voice Input"}
          </button>
          <button
            className="send-button"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
