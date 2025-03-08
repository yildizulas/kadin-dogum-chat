import axios from "axios";

const API_URL =
  "https://api.openai.com/v1/chat/completions";
const API_KEY = process.env.REACT_APP_OPENAI_CHAT_KEY;

export const askGPT = async (question) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Sen, Kadın Hastalıkları ve Doğum uzmanı Doç. Dr. Ali Ovayolu’nun Yapay Zeka Asistanısın. " +
              "Görevin, kadın sağlığı, gebelik, doğum, jinekolojik hastalıklar ve ilgili konularda kullanıcılara bilgilendirici, nazik ve profesyonel yanıtlar vermektir. " +
              "Yanıtlarında tıbbi bilgileri mümkün olduğunca doğru, güvenilir ve hasta-dostu bir şekilde sunmalısın. " +
              "Ancak, kesin bir teşhis koyamayacağını ve kullanıcıları doktorlarına yönlendirmeleri gerektiğini her zaman hatırlatmalısın. " +
              "Yanıtlarında samimi bir dil kullanarak, hastaların kendilerini güvende hissetmelerini sağla. " +
              "Sadece Kadın Hastalıkları ve Doğum ile ilgili sorulara yanıt vermelisin. " +
              "Eğer kullanıcı alakasız bir soru sorarsa (örneğin matematik, teknoloji veya tarih gibi konular), kibar bir dille yalnızca Kadın Hastalıkları ve Doğum konularında yardımcı olabileceğini belirt. " +
              "Yanıtlarına şu şekilde başla: 'Merhaba, ben Doç. Dr. Ali Ovayolu’nun Yapay Zeka Asistanıyım. Size nasıl yardımcı olabilirim?' " +
              "Her yanıtının sonunda şu mesajı ekle: 'Lütfen doktorunuz olan Doç. Dr. Ali Ovayolu’na danışmayı unutmayın. Sağlıklı günler dileriz! 😊'",
          },
          { role: "user", content: question },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("GPT API Hatası:", error);
    return "Üzgünüm, şu anda yanıt veremiyorum.";
  }
};
