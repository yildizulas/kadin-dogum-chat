### **🩺 Doç. Dr. Ali Ovayolu's AI-Powered Assistant**

This project is an AI-based chatbot designed to answer questions about obstetrics and gynecology. Users can interact with the assistant via text or voice input and receive AI-powered responses.

> **📦 Node.js Required**: Make sure you have Node.js version **>=16.x** installed on your machine.

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1️⃣ Configure Environment Variables

Create a `.env` file **inside the `/backend` folder** with the following content:

```bash
OPENAI_CHAT_KEY=your-openai-api-key
GOOGLE_TTS_KEY=your-google-tts-api-key
```

### 2️⃣ Install Frontend Dependencies

In the project root directory:

```bash
npm install
```

### 3️⃣ Install Backend Dependencies

Navigate into the `backend` folder:

```bash
cd backend
npm install express axios dotenv cors
```

### 4️⃣ Start the Backend Server

From the `backend` folder, run:

```bash
node index.js
```

This will start the API server at:
👉 http://localhost:3001

### 5️⃣ Start the Frontend Application

In the root folder, run:

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
/backend
 ├── index.js
 ├── services/
 │    ├── gptService.js
 │    ├── textToSpeechService.js
 ├── .env (not tracked in Git)

/src
 ├── /components
 │    ├── ChatBox.jsx
 │    ├── Header.jsx
 │    ├── RecommendedQuestions.jsx
 │    └── MessageInput.jsx
 ├── /api
 │    └── voiceRecognitionService.js
 ├── /pages
 │    ├── ChatPage.jsx
 ├── App.js
 ├── index.js
 ├── global.css
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

## 🔧 Example API Test

You can test the Text-to-Speech (TTS) API with a simple `curl` command:

```bash
curl -X POST http://localhost:3001/api/tts \
  -H "Content-Type: application/json" \
  -d '{"text": "Merhaba, nasılsınız?"}'
```

This should return a JSON object with `audioContent` (Base64-encoded MP3) that you can decode and play.

Developed by: Ulaş Yıldız

### 📅 2025
