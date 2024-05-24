import axios from "axios";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"; // Importera även ikonen för 'faTimes' eller 'faXmark'
// use the function of 'icon' provided by angular-fontawesome library. (But) since we already have a const defined as 'icon' in the 16th line, refer 'icon' in '@fontawesome...-core' as 'fontawesomeIcon' to use it inside the checkAnswer function.
import { icon as fontawesomeIcon } from "@fortawesome/fontawesome-svg-core";
import Loading from "react-loading";
import LoadingPage from "./LoadingPage.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import Modal from "./Modal.jsx";
import "../styles/Modal.css";
import "../styles/showanswer.css";

import ResultPage from "./ResultPage.jsx";

const ShowAnswer = ({ username, restartGame }) => {
  // const [currentQuestion, setCurrentQuestion] = useState([]);
  const [lock, setLock] = useState(false);
  const [icon, setIcon] = useState(false);
  // store questions, not questions and answer!
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  // tracks the current question.  it starts at the first question (0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  // store each answer given by the user
  const [selectedAnswer, setSelectedAnswer] = useState("");
  // this state variable allows us to control whether the loading screen should be displayed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [fetchNewQuestions, setFetchNewQuestions] = useState(false);

  const [showModal, setShowModal] = useState(false);

  // function to call for the Modal to open when click on the Xmark
  const toggleModal = () => {
    console.log("Toggle modal function called");
    setShowModal(!showModal);
  };

  useEffect(() => {
    // an asynchronous function that doesn't stop the
    const fetchData = () => {
      axios
        .get(
          "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
        )
        .then((response) => response.data)
        .then((data) => {
          console.log("Fetched data:", data);
          // takes the fetched data and maps it into a new structure
          const questions = data.results.map((questionObject) => ({
            question: questionObject.question,
            // combines correct and incorrect answers and shuffles them using the shuffle function

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

          setTimeout(() => {
            console.log("Loading completed");
            // Loading set to false to signal that the loading operation is complete
            setLoading(false);
          }, 2000);
        })
        // if an error occurs during the request, the .catch method will be invoked
        .catch((error) => {
          setError(true);
          setLoading(false);
        });
    };
    fetchData();
  }, [fetchNewQuestions]);

  // if something happens during fetch, a error screen will render
  if (error) return <ErrorMessage />;

  // a function to shuffle correct and incorrect answers
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
    console.log(selectedAnswer);
    if (currentQuestionIndex < 9) {
      setLock(false);
      setIcon(false);
      //add setSelectedAnswer("") as a second step to let the user answer array becomes empty before each question.
      setSelectedAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuestionIndex === 9) {
      console.log("hello");
    }
  }


  //Showing correct or incorrect
  const checkAnswer = (e, ans) => {
    const correctAnswer = questionsAndAnswers[currentQuestionIndex].correctAnswer;
    //if lock is equal to false, change to true which means then user can select only one option.
    //if correct answer equal to ans, change the color to green, otherwise change to red.

    if (!lock) {
      console.log("hello");

      if (correctAnswer === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setIcon("correct");
      } else {
        e.target.classList.add("incorrect");
        setLock(true);
        setIcon("wrong");
        //Showing correct answer when an user press the wrong

        const correctBtn = document.querySelector(
          `[data-answer="${correctAnswer}"]`
        );

        console.log(correctBtn);
        if (correctBtn) {
          correctBtn.classList.add("correct");
          let innerHtml = correctBtn.innerHTML;
          // console.log(innerHtml)
          let correctIcon = fontawesomeIcon(faCheck);
          // correctIcon.styles = "color:rgb(0, 0, 0); padding-right: 10px";
          // console.log(correctIcon);
          let iconHtml = correctIcon.html;
          // console.log(iconHtml)
          correctBtn.innerHTML = `
            ${iconHtml}
            <span> ${innerHtml}</span>
          `;
        }
      }

      console.log("currentQuestionIndex:", currentQuestionIndex);
      console.log("correctAnswer:", correctAnswer);
      console.log(ans);
      // push and store each answer to answer array
      if(answers.length === 9){
        setTimeout(() => {
        // When answers.push(ans) is used, react coult not render the code block inside setTimeout. So, define a new array to push answers to this array.
          let arr = [...answers];
          arr.push(ans);
          setAnswers(arr);
        }, 1000)
      } else {
        answers.push(ans);
      }

      setSelectedAnswer(ans);
    }
  };


  //Replace special letters to correct letters
  const removeSpecialLetter = (re) => {
    const regex = /&#039;|&ouml;|&auml;|&aring;|&iacute;/gi;
    const removeLetter = {
      "&#039;": "' ",
      "&ouml;": "ö",
      " &auml;": "ä",
      "&aring;": "å",
      "&iacute;": "í ",
    };
    return re.replaceAll(regex, (match) => removeLetter[match]);
  };


  const resetAnswers = () => {
    //Reset the game and start again
    //Reset the relevant states or set an initial value to them
    setAnswers([]); // reset the answers state
    setCurrentQuestionIndex(0); // set currentQuestionIndex state to initial value
    setSelectedAnswer(null); // reset selectedAnswer state
    setIcon(null); // reset icon state
    setQuestionsAndAnswers([]);
    //set button disable to false
    setLock(false);
    console.log("Reset the game!");
  };

   // define event handler for ending the game
   const handleEndGame = () => {
      // Add logic here to end the game (e.g., reset state, show final results)
      setGameEnded(true);
      restartGame();
      // Add logic here to end the game (e.g., reset state, show final results)
      // You can set state to render ResultPage
      console.log("Bye!");
   };


  // Define event handler for trying again
  const handleTryAgain = () => {
    // Add logic here to reset the game (e.g., reset state, start over)
    setGameEnded(false);
    // Add logic here to reset the game (e.g., reset state, start over)
    console.log("Let's try again!");
    resetAnswers();
    setFetchNewQuestions(!fetchNewQuestions);
  };

  return (
    //Adding optional chaining so if the {questionsAndAnswers[currentQuestionIndex] is null or undefined, accessing to the question
    //Use dangerouslySetInnerHTML for removing special characters in the questions. Because of the code structure of buttons which include children, this feature could not be included in buttons.
    //Use ternary condition aligning with react.fragment in to let the first question be seen before the button next and to have a link to the result page
    //add disabled={!selectedAnswer} as a first step to let the user go to the next question only if s/he answers the question
    //add handleEndGame and handleTryAgain to use the functions with the help of relevant props in the resultpage.
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="outer-cover">
          {/* onClick-event to call the toggleModal function */}
          {
          questionsAndAnswers.length > 0 && answers.length !== 10 ? (
            <div onClick={toggleModal} className="xmark">
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </div>
            ) : (
              ""
            )
          }
          {showModal ? <Modal /> : null}
          {questionsAndAnswers.length > 0 && answers.length !== 10 ? (
            <div className="outer">
              <h3 className="currentQuestionTrack">
                Question {currentQuestionIndex + 1} / 10
              </h3>
              <div className="wrapper">
                <h3
                  className="currentQuestion"
                  dangerouslySetInnerHTML={{
                    __html: questionsAndAnswers[currentQuestionIndex]?.question,
                  }}
                ></h3>
                <div className="btn-container">
                  {questionsAndAnswers[
                    currentQuestionIndex
                  ]?.shuffledAnswers.map((ans, index) => (
                    // when key = index, it only render the 4 options once. but we need to change (re-render) the all elements, so create a unique button using unique key value including #question. This also provides the syle being reset.
                    <button
                      className="options"
                      key={currentQuestionIndex + "-" + index}
                      onClick={(e) => checkAnswer(e, ans)}
                      data-answer={ans}
                    >
                      {selectedAnswer === ans && icon === "correct" && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          size="sm"
                          style={{
                            color: "#000000",
                            paddingRight: "10px",
                          }}
                        />
                      )}
                      {selectedAnswer === ans && icon === "wrong" && (
                        <FontAwesomeIcon
                          icon={faXmark}
                          size="sm"
                          style={{
                            color: "#000000",
                            paddingRight: "10px",
                          }}
                        />
                      )}
                      {index + 1 + ". "}
                      {removeSpecialLetter(ans)}
                    </button>
                  ))}
                </div>
                <div className="controls">
                  {currentQuestionIndex < 9 &&
                  <button
                    onClick={nextQuestion}
                    disabled={!selectedAnswer}
                    className="next-btn"
                  >
                    {" "}
                    Next Question{" "}
                  </button>
                  }
                  {currentQuestionIndex === 9 &&
                  <button
                  onClick={nextQuestion}
                  disabled={!selectedAnswer}
                  className="finish-btn"
                >
                  {" "}
                  See the Results{" "}
                  </button>
                  }
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {
            // After the last page is completed, 'ResultPage' will be updated considering the given name to move on to the last page.
            answers.length === 10 ? (
              <ResultPage
                onEndGame={handleEndGame}
                questionsAndAnswers={questionsAndAnswers}
                answers={answers}
                username={username}
                onTryAgain={handleTryAgain}
              />
            ) : (
              ""
            )
          }
        </div>
      )}
    </>
  );
};

export default ShowAnswer;