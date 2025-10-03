import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizStart from '../components/QuizStart';
import QuizQuestion from '../components/QuizQuestion';
import QuizResults from '../components/QuizResults';

const quizQuestions = [
  {
    id: 1,
    question: "Qui a réalisé le film 'Inception' (2010) ?",
    options: [
      "Steven Spielberg",
      "Christopher Nolan",
      "James Cameron",
      "Ridley Scott"
    ],
    correctAnswer: "Christopher Nolan"
  },
  {
    id: 2,
    question: "Quel film a remporté l'Oscar du meilleur film en 2020 ?",
    options: [
      "1917",
      "Joker",
      "Parasite",
      "Once Upon a Time in Hollywood"
    ],
    correctAnswer: "Parasite"
  },
  {
    id: 3,
    question: "Dans quel film trouve-t-on la réplique culte 'May the Force be with you' ?",
    options: [
      "Star Trek",
      "Star Wars",
      "Interstellar",
      "Avatar"
    ],
    correctAnswer: "Star Wars"
  },
  {
    id: 4,
    question: "Qui incarne Iron Man dans l'univers cinématographique Marvel ?",
    options: [
      "Chris Evans",
      "Chris Hemsworth",
      "Robert Downey Jr.",
      "Mark Ruffalo"
    ],
    correctAnswer: "Robert Downey Jr."
  },
  {
    id: 5,
    question: "Quel est le film d'animation le plus rentable de tous les temps ?",
    options: [
      "Le Roi Lion (2019)",
      "La Reine des Neiges 2",
      "Toy Story 4",
      "Les Indestructibles 2"
    ],
    correctAnswer: "Le Roi Lion (2019)"
  },
  {
    id: 6,
    question: "Combien d'Oscars a remporté le film 'Titanic' (1997) ?",
    options: [
      "8",
      "11",
      "14",
      "9"
    ],
    correctAnswer: "11"
  },
  {
    id: 7,
    question: "Quel réalisateur est connu pour ses films 'Pulp Fiction' et 'Kill Bill' ?",
    options: [
      "Martin Scorsese",
      "Quentin Tarantino",
      "David Fincher",
      "Guy Ritchie"
    ],
    correctAnswer: "Quentin Tarantino"
  },
  {
    id: 8,
    question: "Dans 'Le Seigneur des Anneaux', qui doit détruire l'anneau unique ?",
    options: [
      "Aragorn",
      "Gandalf",
      "Frodon",
      "Sam"
    ],
    correctAnswer: "Frodon"
  },
  {
    id: 9,
    question: "Quel acteur joue le rôle de Jack Sparrow dans 'Pirates des Caraïbes' ?",
    options: [
      "Orlando Bloom",
      "Johnny Depp",
      "Geoffrey Rush",
      "Javier Bardem"
    ],
    correctAnswer: "Johnny Depp"
  },
  {
    id: 10,
    question: "Quel film de science-fiction se déroule en grande partie dans une ville appelée Gotham ?",
    options: [
      "Spider-Man",
      "Superman",
      "Batman",
      "Iron Man"
    ],
    correctAnswer: "Batman"
  }
];

function Quiz() {
  const navigate = useNavigate();

  const [quizState, setQuizState] = useState('start'); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // Démarrer le quiz
  const handleStart = () => {
    setQuizState('question');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer('');
  };

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex === quizQuestions.length - 1) {
      setQuizState('results');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    }
  };

  // Recommencer le quiz
  const handleRestart = () => {
    setQuizState('start');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer('');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Calculer le score
  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return answer === quizQuestions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', paddingBottom: '40px', position: 'relative' }}>
      {}
      {(quizState === 'start' || quizState === 'question') && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
          <button
            className="btn btn-outline-light"
            onClick={handleGoHome}
          >
            ← Quitter le quiz
          </button>
        </div>
      )}

      {quizState === 'start' && (
        <QuizStart onStart={handleStart} />
      )}

      {quizState === 'question' && (
        <QuizQuestion
          question={quizQuestions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex}
          totalQuestions={quizQuestions.length}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          onNext={handleNext}
          isLastQuestion={currentQuestionIndex === quizQuestions.length - 1}
        />
      )}

      {quizState === 'results' && (
        <QuizResults
          score={calculateScore()}
          totalQuestions={quizQuestions.length}
          userAnswers={userAnswers}
          questions={quizQuestions}
          onRestart={handleRestart}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}

export default Quiz;
