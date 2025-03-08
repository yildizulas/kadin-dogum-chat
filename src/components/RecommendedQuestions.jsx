import React from "react";

const RecommendedQuestions = ({ onSelectQuestion }) => {
  const questions = [
    "Hamilelikte beslenme nasıl olmalıdır?",
    "Doğum sonrası depresyon belirtileri nelerdir?",
    "Doğum kontrol yöntemleri nelerdir?",
    "Kadın sağlığı için düzenli kontroller nasıl olmalıdır?",
    "Menopoz döneminde dikkat edilmesi gerekenler nelerdir?",
  ];

  return (
    <div className="recommended-questions">
      <h3>Önerilen Sorular</h3>
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
