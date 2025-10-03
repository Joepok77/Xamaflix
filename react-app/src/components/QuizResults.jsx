// Composant pour afficher les résultats du Quiz
function QuizResults({ score, totalQuestions, userAnswers, questions, onRestart, onGoHome }) {
  // Calculer le message personnalisé selon le score
  const getScoreMessage = () => {
    if (score <= 3) {
      return { text: "Vous devriez regarder plus de films ! 🎬", color: "text-danger" };
    } else if (score <= 6) {
      return { text: "Pas mal ! Un vrai amateur de cinéma 🍿", color: "text-warning" };
    } else if (score <= 8) {
      return { text: "Excellent ! Vous êtes un cinéphile confirmé 🌟", color: "text-info" };
    } else {
      return { text: "Parfait ! Vous êtes un expert du 7ème art ! 🏆", color: "text-success" };
    }
  };

  const scoreMessage = getScoreMessage();

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          {/* Score global */}
          <div className="text-center mb-5">
            <h1 className="display-1 text-white mb-3">
              {score}/{totalQuestions}
            </h1>
            <h2 className={`${scoreMessage.color} mb-4`}>
              {scoreMessage.text}
            </h2>
            <p className="text-white-50 fs-5">
              Vous avez obtenu {score} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''} sur {totalQuestions} questions
            </p>
          </div>

          {/* Détail des réponses */}
          <h3 className="text-white mb-4">📋 Détail de vos réponses</h3>

          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="card bg-dark text-white mb-3"
                style={{ border: `2px solid ${isCorrect ? '#28a745' : '#dc3545'}` }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">
                      Question {index + 1}: {question.question}
                    </h5>
                    <span style={{ fontSize: '1.5rem' }}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>

                  <div className="mb-2">
                    <strong className={isCorrect ? 'text-success' : 'text-danger'}>
                      Votre réponse:
                    </strong>
                    <span className="ms-2">{userAnswer}</span>
                  </div>

                  {!isCorrect && (
                    <div>
                      <strong className="text-success">
                        Bonne réponse:
                      </strong>
                      <span className="ms-2">{question.correctAnswer}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Boutons d'action */}
          <div className="text-center mt-5">
            <button
              className="btn btn-danger btn-lg px-5 me-3"
              onClick={onRestart}
            >
              Recommencer le quiz
            </button>
            <button
              className="btn btn-outline-light btn-lg px-5"
              onClick={onGoHome}
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizResults;
