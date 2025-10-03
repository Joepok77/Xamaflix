function QuizStart({ onStart }) {
  return (
    <div className="container text-center" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="display-3 text-white mb-4">
            🎬 Quiz Cinéma - Testez vos connaissances !
          </h1>
          <h3 className="text-white-50 mb-4">
            10 questions sur l'univers du cinéma
          </h3>
          <p className="text-white mb-5 fs-5">
            Êtes-vous un véritable cinéphile ? Testez vos connaissances sur les films cultes,
            les réalisateurs légendaires et les acteurs iconiques du 7ème art !
          </p>
          <button
            className="btn btn-danger btn-lg px-5 py-3"
            onClick={onStart}
            style={{ fontSize: '1.2rem' }}
          >
            Commencer le quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizStart;
