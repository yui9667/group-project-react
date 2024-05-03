import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../styles/showanswer.css";
//import TriviaButton from "./TriviaButton";

const TriviaData = () => {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [lock, setLock] = useState(false);
  const [icon, setIcon] = useState(false);
  //const [correctAnswer, setCorrectAnswer] = useState("");

  //Showing which option is answer. But it is not working. Need to figure out the issue
  // let option1 = useRef(null);
  // let option2 = useRef(null);
  // let option3 = useRef(null);
  // let option4 = useRef(null);
  // let options_array = [option1, option2, option3, option4];
  // console.log(option1, option2, option3, option4);
  // .get method of axios to get data from the link of API:
  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
      )
      // .then method to set the data in to state with setCurrentQuestion
      .then((response) => response.data)
      .then((data) => setCurrentQuestion([data.results[0]]));
  }, []);

  // function nextQuestion() {
  //   if (currentQuestion < 9) {
  //     setCurrentQuestion(currentQuestion + 1);
  //   } else if (currentQuestion === 9) {
  //     setIsFinished(1);
  //   }
  // }

  //Showing correct or incorrect
  const checkAnswer = (e, ans) => {
    const correctAnswer = currentQuestion[0].correct_answer === ans;
    if (lock === false) {
      if (correctAnswer) {
        e.target.classList.add("correct");
        setLock(true);
        setIcon("correct");
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        setIcon("wrong");
      }
      console.log("Correct Answer:", currentQuestion[0].correct_answer);
      console.log("Selected Answer:", ans);
    }
  };

  return (
    <div className="wrapper">
      {currentQuestion.map((q, index) => (
        <div className="question-card" key={index}>
          <h3>{q.question}</h3>
          <ul className="btn-container">
            <li
              onClick={(e) => {
                checkAnswer(e, q.correct_answer);
              }}
            >
              {icon === "correct" && (
                <FontAwesomeIcon
                  icon={faCheck}
                  size="sm"
                  style={{ color: "#000000", paddingRight: "10px" }}
                />
              )}
              A. {q.correct_answer}
            </li>

            <li
              onClick={(e) => {
                checkAnswer(e, q.incorrect_answers[0]);
              }}
            >
              {icon === "wrong" && (
                <FontAwesomeIcon
                  icon={faXmark}
                  size="sm"
                  style={{ color: "#000000", paddingRight: "10px" }}
                />
              )}
              B. {q.incorrect_answers[0]}
            </li>
            <li
              onClick={(e) => {
                checkAnswer(e, q.incorrect_answers[1]);
              }}
            >
              C. {q.incorrect_answers[1]}
            </li>
            <li
              onClick={(e) => {
                checkAnswer(e, q.incorrect_answers[2]);
              }}
            >
              D. {q.incorrect_answers[2]}
            </li>
          </ul>
        </div>
      ))}
      <div className="controls">
        <button onClick={nextQuestion} className="next-btn">
          Next Question
        </button>
      </div>
    </div>
  );
};

export default TriviaData;
