import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../components/showanswer.css";

const ShowAnswer = () => {
  // const [currentQuestion, setCurrentQuestion] = useState([]);
  const [lock, setLock] = useState(false);
  const [icon, setIcon] = useState(false);
  // const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  // tracks the current question.  it starts at the first question (0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();

  useEffect(() => {
    // use axios to get the data from the TriviaAPI
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
      )
      .then((response) => response.data)
      .then((data) => {
        // takes the fetched data and maps it into a new structure
        const questions = data.results.map((questionObject) => ({
          question: questionObject.question,
          // combines correct and incorrect answers and shuffles them

          shuffledAnswers: shuffle([
            ...questionObject.incorrect_answers,
            questionObject.correct_answer,
          ]),
          //  stores the correct answer separately.
          correctAnswer: questionObject.correct_answer,
          // initializes the selected answer to an empty string
          selectedAnswer: "",
        }));
        setQuestionsAndAnswers(questions);
      });
  }, []);

  const shuffle = (array) => {
    // this declares two variables; the length of the array
    let currentIndex = array.length,
      randomIndex;
    //  The while statement creates a loop (araund a code block) that is executed while a condition is true: as long as currentIndex is not zero
    while (currentIndex !== 0) {
      // Math.random() used with Math.floor() used to pick an return a random index
      randomIndex = Math.floor(Math.random() * currentIndex);
      // the decrement --  operator subtracts one from the current variable's value.
      currentIndex--;
      // this swaps the element at currentIndex with the element at randomIndex
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    // returns the shuffled array
    return array;
  };
  //Going to nextQuestions
  function nextQuestion() {
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === 9) {
      // setIsFinished(1);
      console.log("hello");
    }
  }

  //Showing correct or incorrect
  const checkAnswer = (e, ans) => {
    const correctAnswer =
      questionsAndAnswers[currentQuestionIndex].correctAnswer;
    //if lock is equal to false, change to true which means then user can select only one option.
    //if correct answer equal to ans, change the color to green, otherwise change to red.
    if (!lock) {
      if (correctAnswer === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setIcon("correct");
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        setIcon("wrong");
      }

      console.log("currentQuestionIndex:", currentQuestionIndex);
      console.log("correctAnswer:", correctAnswer);
      console.log(ans);
      setSelectedAnswer(ans);
    }
  };

  return (
    //Adding optional chaining so if the {questionsAndAnswers[currentQuestionIndex] is null or undefined, accessing to the question
    <div className="wrapper">
      <h3>{questionsAndAnswers[currentQuestionIndex]?.question}</h3>
      <div className="btn-container">
        {questionsAndAnswers[currentQuestionIndex]?.shuffledAnswers.map(
          (ans, index) => (
            <button key={index} onClick={(e) => checkAnswer(e, ans)}>
              {selectedAnswer === ans && icon === "correct" && (
                <FontAwesomeIcon
                  icon={faCheck}
                  size="sm"
                  style={{ color: "#000000", paddingRight: "10px" }}
                />
              )}
              {selectedAnswer === ans && icon === "wrong" && (
                <FontAwesomeIcon
                  icon={faXmark}
                  size="sm"
                  style={{ color: "#000000", paddingRight: "10px" }}
                />
              )}
              {String.fromCharCode(65 + index) + ". "}
              {ans}
            </button>
          )
        )}

        <div className="controls">
          <button className="next-btn">Next Question</button>
        </div>
      </div>
    </div>
  );
};

export default ShowAnswer;
