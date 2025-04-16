const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const { askGPT } = require("./services/gptService");
const {
  textToSpeech,
} = require("./services/textToSpeechService");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const result = await askGPT(req.body.message);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/tts", async (req, res) => {
  try {
    const result = await textToSpeech(req.body.text);

    if (!result || !result.audioContent) {
      return res
        .status(400)
        .json({ error: "TTS başarısız" });
    }

    res.json({ audioContent: result.audioContent });
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

app.listen(3001, () => {
  console.log("Backend çalışıyor: http://localhost:3001");
});
