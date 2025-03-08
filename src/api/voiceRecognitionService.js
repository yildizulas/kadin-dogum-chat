export const startVoiceRecognition = () => {
  return new Promise((resolve, reject) => {
    // Check if SpeechRecognition API is available
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(
        new Error("Tarayıcınız ses tanımayı desteklemiyor.")
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Automatically stop recognition when speech ends
    recognition.onspeechend = () => {
      recognition.stop();
    };

    // Handle successful recognition
    recognition.onresult = (event) => {
      resolve(event.results[0][0].transcript.trim());
    };

    // Handle errors
    recognition.onerror = (error) => {
      console.error("Ses tanıma hatası:", error);
      reject(
        new Error(
          "Ses tanıma başarısız oldu. Lütfen tekrar deneyin."
        )
      );
    };

    try {
      recognition.start();
    } catch (error) {
      reject(
        new Error(
          "Ses tanıma başlatılamadı. Tarayıcı izinlerini kontrol edin."
        )
      );
    }
  });
};
