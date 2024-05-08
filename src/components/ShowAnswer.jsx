import axios from "axios";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Loading from "react-loading";
import LoadingPage from "./LoadingPage";
import "../components/showanswer.css";
import "../styles/questions.css";

const ShowAnswer = () => {
   // const [currentQuestion, setCurrentQuestion] = useState([]);
   const [lock, setLock] = useState(false);
   const [icon, setIcon] = useState(false);
   // const [correctAnswer, setCorrectAnswer] = useState("");
   const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
   // tracks the current question.  it starts at the first question (0)
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [answers, setAnswers] = useState([]);
   // store each answer given by the user
   const [selectedAnswer, setSelectedAnswer] = useState();
   // this state variable allows us to control whether the loading screen should be displayed
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

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
   }, []);

   // if something happens during fetch, a error screen will render
   if (hasError) return <ErrorMessage />;

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
      if (currentQuestionIndex < 9) {
         setLock(false);
         setIcon(false);
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
         // push and store each answer to answer array
         answers.push(ans);
         setSelectedAnswer(ans);
      }
   };

   return (
      //Adding optional chaining so if the {questionsAndAnswers[currentQuestionIndex] is null or undefined, accessing to the question
      //Use dangerouslySetInnerHTML for removing special characters in the questions. Because of the code structure of buttons which include children, this feature could not be included in buttons.
      //Use ternary condition aligning with react.fragment in to let the first question be seen before the button next and to have a link to the result page
      <>
         {loading ? (
            <LoadingPage />
         ) : (
            <div>
               {questionsAndAnswers.length > 0 ? (
                  <div className="wrapper">
                     <h3
                        dangerouslySetInnerHTML={{
                           __html:
                              questionsAndAnswers[currentQuestionIndex]
                                 ?.question,
                        }}></h3>
                     <div className="btn-container">
                        {questionsAndAnswers[
                           currentQuestionIndex
                        ]?.shuffledAnswers.map((ans, index) => (
                           // when key = index, it only render the 4 options once. but we need to change (re-render) the all elements, so create a unique button using unique key value including #question. This also provides the syle being reset.
                           <button
                              key={currentQuestionIndex + "-" + index}
                              onClick={(e) => checkAnswer(e, ans)}>
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
                              {String.fromCharCode(65 + index) + ". "}
                              {ans}
                           </button>
                        ))}
                        <div className="controls">
                           <button onClick={nextQuestion} className="next-btn">
                              Next Question
                           </button>
                           {
                              // After the last page is completed, 'ResultPage' will be updated considering the given name to move on to the last page.
                              questionsAndAnswers.length === 9 ? (
                                 <ResultPage />
                              ) : (
                                 ""
                              )
                           }
                        </div>
                     </div>
                  </div>
               ) : (
                  ""
               )}
            </div>
         )}
      </>
   );
};

export default ShowAnswer;
