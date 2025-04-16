// ChatBox.jsx

import React, { useState, useEffect, useRef } from "react";
import { startVoiceRecognition } from "../api/voiceRecognitionService";

const ChatBox = ({ messages, sendMessage }) => {
  const [isSpeaking, setIsSpeaking] = useState(false); // Currently speaking index
  const [inputText, setInputText] = useState(""); // User input text
  const [isListening, setIsListening] = useState(false); // Voice input state
  const chatEndRef = useRef(null); // Ref to auto-scroll
  const audioRef = useRef(null); // Ref for audio playback

  // Scroll to bottom whenever new messages appear
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSpeech = async (text, index) => {
    if (isSpeaking === index) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
      setIsSpeaking(false);
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3001/api/tts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.audioContent) {
        throw new Error(data.error || "TTS başarısız");
      }

      const audio = new Audio(
        `data:audio/mp3;base64,${data.audioContent}`
      );
      audioRef.current = audio;
      audio.play();
      setIsSpeaking(index);

      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };
    } catch (error) {
      console.error("TTS Hatası:", error);
      setIsSpeaking(false);
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

      <div ref={chatEndRef}></div>

      {/* User message input area */}
      <div className="input-container">
        <textarea
          className="textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Sorunuzu buraya yazabilirsiniz..."
          onKeyDown={handleKeyDown}
        />

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

      <div ref={chatEndRef}></div>
    </div>
  );
};

export default ChatBox;
