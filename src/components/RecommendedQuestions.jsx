import React from "react";

const RecommendedQuestions = ({ onSelectQuestion }) => {
  const questions = [
    "Hamilelikte beslenme nasıl olmalıdır?",
    "Doğum sonrası depresyon belirtileri nelerdir?",
    "Kadın sağlığı için düzenli kontroller nasıl olmalıdır?",
    "Menopoz döneminde dikkat edilmesi gerekenler nelerdir?",
    "Polikistik over sendromu (PCOS) belirtileri nelerdir?",
    "Rahim ağzı kanseri taraması nasıl yapılır?",
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
