import React, { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    onSendMessage(message);
    setMessage(""); // Clear input after sending
  };

  // Start voice recognition for speech-to-text
  const handleVoiceInput = () => {
    const recognition =
      new window.webkitSpeechRecognition();
    recognition.lang = "tr-TR"; // Set language to Turkish
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript); // Update input with recognized speech
    };
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      {/* Text input field for user messages */}
      <textarea
        className="textarea"
        placeholder="Sorunuzu buraya yazın veya mikrofonu kullanın..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* Voice input button for speech-to-text */}
      <button
        type="button"
        className="voice-button"
        onClick={handleVoiceInput}
      >
        🎤
      </button>

      {/* Submit button to send message */}
      <button type="submit" className="send-button">
        Gönder
      </button>
    </form>
  );
};

export default MessageInput;
