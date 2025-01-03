import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuizGeneratorForm from './components/QuizGeneratorForm'
import Question from './components/Question'
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {
  /*const quiz = [
    {
      "question": "What is Naruto's signature jutsu?",
      "options": {
        "A": "Chidori",
        "B": "Rasengan",
        "C": "Amaterasu",
        "D": "Shadow Possession"
      },
      "answer": "B"
    },
    {
      "question": "Who is the leader of Team 7 in the original Naruto series?",
      "options": {
        "A": "Jiraiya",
        "B": "Kakashi Hatake",
        "C": "Itachi Uchiha",
        "D": "Tsunade"
      },
      "answer": "B"
    },
    {
      "question": "What is the name of Naruto's tailed beast?",
      "options": {
        "A": "Shukaku",
        "B": "Matatabi",
        "C": "Kurama",
        "D": "Gyuki"
      },
      "answer": "C"
    },
    {
      "question": "What clan does Sasuke belong to?",
      "options": {
        "A": "Uzumaki",
        "B": "Hyuga",
        "C": "Nara",
        "D": "Uchiha"
      },
      "answer": "D"
    },
    {
      "question": "What is the goal of the Akatsuki organization?",
      "options": {
        "A": "To collect all tailed beasts",
        "B": "To destroy the Hidden Leaf Village",
        "C": "To revive Madara Uchiha",
        "D": "To gain control over all ninja villages"
      },
      "answer": "A"
    }
  ]*/
  
  const [quiz, setQuiz] = useState("");

  const [score, setScore] = useState(-1);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizScoreMessage, setQuizScoreMessage] = useState("")
  const [resetCount, setResetCount] = useState(0);
  const [quizGenerated, setQuizGenerated] = useState(false);

  const handleAnswerUpdate = (questionIndex, isCorrect) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = isCorrect;
    setUserAnswers(newUserAnswers);
  };

  const handleQuizSubmit = () => {
    const newScore = userAnswers.filter((answer) => answer).length;
    setScore(newScore);
    const quizScoreMessage = `Quiz Score: ${newScore} out of ${quiz.length}`;
    setQuizScoreMessage(quizScoreMessage);
    //alert(`Your final score is: ${newScore}/${quiz.length}`);

  }

  const handleResetQuiz = () => {
    setScore(-1);
    setUserAnswers([]);
    setQuizScoreMessage("");
    setResetCount((prevValue) => prevValue + 1);

  }

  const handleBackToQuizGenerator = () => {
    setScore(-1);
    setUserAnswers([]);
    setQuizScoreMessage("");
    setQuizGenerated(false);
  }

  const handleGenerateQuiz = () => {
    setQuizGenerated((prevValue) => !prevValue);
  }
  

  return (
    <>
      <a onClick={handleBackToQuizGenerator} style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}><h1>Quiz AI</h1></a>
      {quizGenerated === false && <QuizGeneratorForm onGenerateQuiz={handleGenerateQuiz} setQuiz={setQuiz}/>}
      { quizGenerated && <div className='Quiz'>
        {quiz.map((questionItem, index) => {
          const { question, options, answer} = questionItem;
          const {A, B, C, D} = options;
          const questionNumber = index + 1;

          return(
            <Question key={`${index}-${resetCount}`} 
              question={question} 
              A={A} 
              B={B} 
              C={C} 
              D={D}
              options={options} 
              answer={answer} 
              question_number={questionNumber}
              onAnswerChange= {(isCorrect) => handleAnswerUpdate(index, isCorrect)}
              submitted={score}
              />
          )
        })}
        {score === -1 && <button onClick={handleQuizSubmit}>Submit</button>} <br/>
        {score != -1 && <div className='post_submission_buttons'>
          <button onClick={handleResetQuiz}>Take Again</button>
          <button onClick={handleBackToQuizGenerator}>New Quiz</button>
        </div> }
        {quizScoreMessage && <p>{quizScoreMessage}</p>}
      </div>}

      <SpeedInsights/>
    </>
  )
}

export default App
