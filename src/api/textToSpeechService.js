import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_TTS_KEY;
const API_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

let audio = null;
let setIsSpeakingGlobal = null; // Global state setter to track speaking status

export const textToSpeech = async (text, setIsSpeaking) => {
  try {
    // If audio is already playing, stop it first
    if (audio && !audio.paused) {
      stopSpeech();
      return;
    }

    setIsSpeakingGlobal = setIsSpeaking; // Store the state setter globally
    setIsSpeaking(true); // Update button to "Stop"

    const requestData = {
      input: { text: text },
      voice: {
        languageCode: "tr-TR",
        name: "tr-TR-Wavenet-D",
        ssmlGender: "FEMALE",
      },
      audioConfig: { audioEncoding: "MP3" },
    };

    const response = await axios.post(
      API_URL,
      requestData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.data.audioContent) {
      throw new Error("No audio content received!");
    }

    // Convert base64 audio content to a playable format
    const audioContent = response.data.audioContent;
    const audioBlob = new Blob(
      [
        Uint8Array.from(atob(audioContent), (c) =>
          c.charCodeAt(0)
        ),
      ],
      { type: "audio/mp3" }
    );
    const audioUrl = URL.createObjectURL(audioBlob);

    audio = new Audio(audioUrl);
    audio.play();

    // When audio finishes playing, reset the state
    audio.onended = () => {
      console.log("Speech playback completed.");
      setIsSpeaking(false); // Reset button to "Listen"
      audio = null;
    };
  } catch (error) {
    console.error(
      "Google TTS API Error:",
      error.response?.data || error.message
    );
  }
};

// **Stop the ongoing speech playback**
export const stopSpeech = () => {
  if (audio) {
    audio.pause(); // Pause the audio
    audio.currentTime = 0; // Reset playback position
    audio = null;
    if (setIsSpeakingGlobal) {
      setIsSpeakingGlobal(false); // Reset button to "Listen"
    }
  }
};
