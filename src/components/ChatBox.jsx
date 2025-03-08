import React, { useState, useEffect, useRef } from "react";
import {
  textToSpeech,
  stopSpeech,
} from "../api/textToSpeechService";
import { startVoiceRecognition } from "../api/voiceRecognitionService";

const ChatBox = ({ messages, sendMessage }) => {
  const [isSpeaking, setIsSpeaking] = useState(false); // Currently speaking state
  const [inputText, setInputText] = useState(""); // User input text
  const [isListening, setIsListening] = useState(false); // Voice input state
  const chatEndRef = useRef(null); // Ref to auto-scroll

  // Scroll to bottom whenever new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Handle text-to-speech actions
  const handleSpeech = (text, index) => {
    if (isSpeaking === index) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      textToSpeech(text, () => setIsSpeaking(index));
    }
  };

  // Handle sending message
  const handleSend = () => {
    if (inputText.trim() !== "") {
      sendMessage(inputText);
      setInputText(""); // Clear input after sending
    }
  };

  // Handle voice input (speech to text)
  const handleVoiceInput = () => {
    setIsListening(true);
    startVoiceRecognition()
      .then((transcript) => {
        setInputText(transcript);
        setIsListening(false);
      })
      .catch(() => {
        setIsListening(false);
      });
  };

  // Handle Enter key to send messages
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent adding a new line
      handleSend();
    }
  };

  return (
    <div className="chat-box">
      {/* Render chat messages */}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.role}`}
        >
          <p>{msg.content}</p>

          {/* Button for text-to-speech */}
          {msg.role === "assistant" && (
            <button
              className="read-aloud-button"
              onClick={() =>
                handleSpeech(msg.content, index)
              }
            >
              {isSpeaking === index
                ? "⏹️ Durdur"
                : "🔊 Dinle"}
            </button>
          )}
        </div>
      ))}

      {/* Reference div for scrolling */}
      <div ref={chatEndRef}></div>

      {/* User message input area */}
      <div className="input-container">
        <textarea
          className="textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Sorunuzu buraya yazabilirsiniz..."
          onKeyDown={handleKeyDown} // Send message on Enter key press
        />

        {/* Button group: Voice input and Send message */}
        <div className="button-group">
          <button
            className="voice-button"
            onClick={handleVoiceInput}
          >
            🎤 {isListening ? "Dinliyorum..." : "Sesle Sor"}
          </button>
          <button
            className="send-button"
            onClick={handleSend}
          >
            Gönder
          </button>
        </div>
      </div>

      {/* End reference div for auto-scroll */}
      <div ref={chatEndRef}></div>
    </div>
  );
};

export default ChatBox;
