import React, { useState } from "react";
import {
  textToSpeech,
  stopSpeech,
} from "../api/textToSpeechService";
import { startVoiceRecognition } from "../api/voiceRecognitionService";

// Component for handling chat interactions
const ChatBox = ({ messages, sendMessage }) => {
  // Component state for tracking speech playback, user input, and voice recognition status
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Handles text-to-speech playback and stopping
  const handleSpeech = (text) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      textToSpeech(text, setIsSpeaking);
    }
  };

  // Handles sending user messages and clearing the input field after submission
  const handleSend = () => {
    if (inputText.trim() !== "") {
      sendMessage(inputText);
      setInputText(""); // Clear input field after sending the message
    }
  };

  // Starts voice recognition and updates the input field with the recognized text
  const handleVoiceInput = () => {
    setIsListening(true); // Update button state

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
      {/* Rendering chat messages and controls */}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.role}`}
        >
          <p>{msg.content}</p>
          {/* If the message is from the assistant, display a button to listen to the text */}
          {msg.role === "assistant" && (
            <button
              className="read-aloud-button"
              onClick={() => handleSpeech(msg.content)}
            >
              {isSpeaking ? "⏹️ Durdur" : "🔊 Dinle"}
            </button>
          )}
        </div>
      ))}

      {/* User input field for typing messages */}
      <div className="input-container">
        <textarea
          className="textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Sorunuzu buraya yazın..."
        />

        {/* Buttons for voice input and sending messages */}
        <div className="button-group">
          <button
            className="voice-button"
            onClick={handleVoiceInput}
          >
            🎤 {isListening ? "Dinleniyor..." : "Sesle Yaz"}
          </button>
          <button
            className="send-button"
            onClick={handleSend}
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
