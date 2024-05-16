//Show the total score to the user:
// use props for passing data from parent components to children (e.g., the questions and selected answers in the showanswer page)
// fetch the scores from showanswer to resultpage

//Two buttons which will give the user an option to end the game or restart:
// rerun showanswer component using 'try again' (don't run intro or startpage) and
// rerun useEffect() from scratch, let it fetch new 10 questions)

import { useState, useEffect } from "react";
import ResultPageCSS from "../styles/resultpage.module.css";

const calculateScore = (questionsAndAnswers, answers) => {
  let score = 0;

  if (
    questionsAndAnswers.length === answers.length &&
    questionsAndAnswers.every(
      (question) => question && question.correctAnswer
    ) &&
    answers.every((answer) => answer !== undefined)
  ) {
    // Iterate over each question
    questionsAndAnswers.forEach((question, index) => {
      // Get the answer from the user
      const answer = answers[index];
      // Get the correct answer
      const correctAnswer = question.correctAnswer;
      // If the selected answer matches the correct answer, compare the score
      if (answer === correctAnswer) {
        score++;
      }
    });
  }
  return score;
};

function ResultPage(props) {
  // Calculate the score
  const [score, setScore] = useState([0]);

  useEffect(() => {
    setScore(calculateScore(props.questionsAndAnswers, props.answers));
  }, [props.questionsAndAnswers, props.answers]);

  return (
    <div className={ResultPageCSS.container}>
      <div className="endpage-initial">
        <h3>Good job!</h3>
      </div>
      <div className="endpage-info" onClick={props.onPress}>
        <h3>
          {props.username}, you got a score of {score} out of{" "}
          {props.questionsAndAnswers.length}!
        </h3>
        <button onClick={props.onEndGame} className="close-modal">
          End game
        </button>
        <button onClick={props.onTryAgain} className="exit-btn">
          Try again
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
