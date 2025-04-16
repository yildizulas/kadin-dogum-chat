### **🩺 Doç. Dr. Ali Ovayolu's AI-Powered Assistant**

This project is an AI-based chatbot designed to answer questions about obstetrics and gynecology. Users can interact with the assistant via text or voice input and receive AI-powered responses.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1️⃣ Install Dependencies

Run the following command in the project directory:

```bash
npm install
```

### 2️⃣ Configure Environment Variables

Important: Add your API keys and other sensitive data in a .env file.
Your .env file should be structured as follows:

```bash
REACT_APP_GOOGLE_TTS_KEY=your-google-tts-api-key
REACT_APP_OPENAI_KEY=your-openai-api-key
```

### 3️⃣ Start the Development Server

Run the following command to start the application:

```bash
npm start
```

This will open the app in your default browser at:
👉 http://localhost:3000

## 🛠 Features

- ✅ Text-based Chat – Ask medical questions via text.
- 🎤 Voice Input – Use speech-to-text for hands-free interaction.
- 🔊 Text-to-Speech (TTS) – Listen to AI-generated responses.
- 🎨 Modern UI – User-friendly and responsive interface.
- 🌍 Multilingual Support – Supports multiple languages for accessibility.

## 📦 Technologies Used

- React.js – Frontend framework
- OpenAI API – AI-based chatbot responses
- Google Text-to-Speech API – For speech synthesis
- Web Speech API – For voice recognition
- Styled Components – For modern UI styling
- GitHub Actions – Continuous deployment and version control

## 📜 Project Structure

```
/src
 ├── /components
 │    ├── ChatBox.jsx
 │    ├── Header.jsx
 │    ├── RecommendedQuestions.jsx
 │    ├── VoiceRecognition.jsx
 │    └── MessageInput.jsx
 ├── /api
 │    ├── gptService.js
 │    ├── textToSpeechService.js
 │    └── voiceRecognitionService.js
 ├── /pages
 │    ├── ChatPage.jsx
 ├── App.js
 ├── index.js
 ├── global.css
 └── .env (not tracked in Git)
```

## 🐞 Troubleshooting

### 1️⃣ npm start not working?

- Ensure you have Node.js (>=14.x) installed.
- Run npm install to check if all dependencies are installed.

### 2️⃣ .env file not working?

- Restart the development server after adding environment variables.
- Make sure there are no spaces around the = in .env.

### 3️⃣ Voice Input not working on Mobile?

- Ensure your browser supports Web Speech API.
- Some mobile browsers block microphone access; try Google Chrome.

Developed by: Ulaş Yıldız

### 📅 2025
