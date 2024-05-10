//Show the total score to the user
//Two buttons which will give the user an option to end the game or restart

import { useState, useEffect } from "react";
import Questions from "./components/Questions.jsx"

const Quiz = () => {
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswer, selectedAnswer] = useState(null)

 
    return (
        //if showresult is true show results. Otherwise show questions
        {!showResult ? (
            <div>
              <Questions />
            </div>
        )}
        <div className="quiz-container">
            <div className="endpage-info">
              <h3>Good job!</h3>
            </div>
            <div>
                <h3 className="endpage-info">You got a score of <span> {result.correctAnswers} </span> / <span> {questions.length} </span>! </h3>
                <button onClick={toggleModal} className="close-modal">Exit</button>
                <button onClick={backToMenu} className="exit-btn"> Try again </button>
            </div>
        </div>
      )
}
  


export default ResultPage;