//Show the total score to the user
//Two buttons which will give the user an option to end the game or restart
//console log the answers

import { useState, useEffect } from "react";
import Questions from "./components/Questions.jsx"

const ResultPage = () => {
    const [showResult, setShowResult] = useState(false)
    //variable to track the score
    const [result, setResult] = useState({
      score: 0,
      correctAnswers: 0,
    })


    const onClickNext = () => {
      setSelectedAnswer(null)
      setActiveQuestion((prev) => prev + 1)
      setResult((prev) =>
        selectedAnswer
            ,{
              //catch content from object and copy to new object
              ...prev,
              //adding 1 point to the score since previous correct answer
              score: prev.score + 1,
              correctAnswers: prev.correctAnswers + 1,
            })

      //state to trigger the showresult when the last question is done
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1)
      } else {
        setActiveQuestion(0)
        setShowResult(true)
      }
    }


return ( 
  <>
  //if showresult is true show results. Otherwise show questions
  {showResult ? (
        <Questions />
    )}

  ) : (

    <div className="quiz-container">
        <div className="endpage-info">
          <h3>Good job!</h3>
        </div>
        <div>
            <h3 className="endpage-info">You got a score of <span> {result.correctAnswers} </span> / <span> {questions.length} </span>! </h3>
            <button onClick={backToMenu} className="close-modal">Exit</button>
            <button onClick={} className="exit-btn"> Try again </button>
        </div>
    </div>
  )
 </>
};
  


export default ResultPage;