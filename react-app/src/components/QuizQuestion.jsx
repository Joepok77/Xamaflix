// Composant pour afficher une question du Quiz
function QuizQuestion({ question, currentIndex, totalQuestions, selectedAnswer, onSelectAnswer, onNext, isLastQuestion }) {
  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          {/* Indicateur de progression */}
          <div className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-white">
                Question {currentIndex + 1}/{totalQuestions}
              </span>
              <span className="text-white-50">
                {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                aria-valuenow={(currentIndex + 1)}
                aria-valuemin="0"
                aria-valuemax={totalQuestions}
              />
            </div>
          </div>

          {/* Question */}
          <div className="card bg-dark text-white mb-4" style={{ border: '1px solid #333' }}>
            <div className="card-body p-4">
              <h3 className="card-title mb-0">{question.question}</h3>
            </div>
          </div>

          {/* Options de réponse */}
          <div className="row g-3 mb-4">
            {question.options.map((option, index) => (
              <div key={index} className="col-12">
                <button
                  className={`btn w-100 text-start p-3 ${
                    selectedAnswer === option
                      ? 'btn-danger'
                      : 'btn-outline-light'
                  }`}
                  onClick={() => onSelectAnswer(option)}
                  style={{
                    transition: 'all 0.3s ease',
                    fontSize: '1.1rem'
                  }}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>

          {/* Bouton suivant */}
          <div className="text-center">
            <button
              className="btn btn-danger btn-lg px-5"
              onClick={onNext}
              disabled={!selectedAnswer}
            >
              {isLastQuestion ? 'Voir mes résultats' : 'Question suivante'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizQuestion;
