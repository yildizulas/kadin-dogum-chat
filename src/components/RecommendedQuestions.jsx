import React from "react";

const RecommendedQuestions = ({ onSelectQuestion }) => {
  const questions = [
    "Hamilelikte beslenme nasıl olmalıdır?",
    "Doğum sonrası depresyon belirtileri nelerdir?",
    "Doğum kontrol yöntemleri nelerdir?",
    "Kadın sağlığı için düzenli kontroller nasıl olmalıdır?",
    "Menopoz döneminde dikkat edilmesi gerekenler nelerdir?",
    "Tüp bebek tedavisi nasıl yapılır?",
    "Polikistik over sendromu (PCOS) belirtileri nelerdir?",
    "Rahim ağzı kanseri taraması nasıl yapılır?",
    "Endometriozis nedir ve nasıl tedavi edilir?",
    "Gebelikte hangi testler yapılmalıdır?",
    "Adet düzensizliği neden olur ve nasıl tedavi edilir?",
    "Miyomlar nedir ve tedavi seçenekleri nelerdir?",
    "Sezaryen doğumun avantajları ve riskleri nelerdir?",
    "Normal doğum mu sezaryen mi daha sağlıklıdır?",
    "Emzirme sürecinde dikkat edilmesi gerekenler nelerdir?",
  ];

  return (
    <div className="recommended-questions">
      <h2>Önerilen Sorular</h2>
      <div className="question-list">
        {questions.map((q, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(q)}
            className="question-button"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendedQuestions;
