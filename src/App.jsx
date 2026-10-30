import { useEffect, useState } from 'react';
import questionsData from './quozquestions.json';
import './App.css';

function App() {
  const [currentQuestions, setCurrentQuestions] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  // Timer
  useEffect(() => {
    let interval;

    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowScore(true);
    }

    return () => clearInterval(interval);
  }, [timer, showScore]);

  // Answer
  const handleAnswerClick = (selectedOption) => {
    if (
      selectedOption ===
      questionsData[currentQuestions].correctOption
    ) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestions < questionsData.length - 1) {
      setCurrentQuestions((prevQuestion) => prevQuestion + 1);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  // Restart
  const handleRestartQuiz = () => {
    setCurrentQuestions(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="score-section">
          <h2>
            Your score: {score}/{questionsData.length}
          </h2>

          <button onClick={handleRestartQuiz}>
            Restart
          </button>
        </div>
      ) : (
        <div className="question-section">
          <h1>
            Question {currentQuestions + 1}
          </h1>

          <p>
            {questionsData[currentQuestions].question}
          </p>

          <div className="options">
            {questionsData[currentQuestions].options.map(
              (option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </button>
              )
            )}
          </div>

          <div className="timer">
            {timer}
            <span>s</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;