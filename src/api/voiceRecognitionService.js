// voiceRecognitionService.js

export const startVoiceRecognition = () => {
  return new Promise((resolve, reject) => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(
        new Error(
          "Bu tarayıcı ses tanımayı desteklemiyor. Lütfen Google Chrome kullanmayı deneyin."
        )
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "tr-TR"; 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript.trim();
      resolve(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Ses tanıma hatası:", event.error);
      reject(
        new Error(`Ses tanıma hatası: ${event.error}`)
      );
    };

    recognition.onnomatch = () => {
      reject(
        new Error("Anlaşılamadı, lütfen tekrar deneyin.")
      );
    };
  });
};
