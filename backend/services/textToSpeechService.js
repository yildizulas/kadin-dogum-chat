const axios = require("axios");

const API_KEY = process.env.GOOGLE_TTS_KEY;
const API_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

const textToSpeech = async (text) => {
  try {
    const requestData = {
      input: { text },
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

    return { audioContent: response.data.audioContent };
  } catch (error) {
    console.error(
      "Google TTS API Error:",
      error.response?.data || error.message
    );
    return { error: "Ses oluşturulamadı" };
  }
};

module.exports = { textToSpeech };
