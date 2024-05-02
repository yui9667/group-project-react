//Questions component will be included here.

import axios from "axios";
import { useState, useEffect } from "react";
//import SingleQuestion from "./SingleQuestion";

const Questions = () => {
   // tracks the current question.  it starts at the first question (0)
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   // stores a list of questions and their answers. it starts as an empty array []
   const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);

   useEffect(() => {
      // use axios to get the data from the TriviaAPI
      axios
         .get(
            "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
         )
         .then((response) => response.data)
         .then((data) => {
            // takes the fetched data and maps it into a new structure
            setQuestionsAndAnswers(
               data.results.map((questionObject) => ({
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
               }))
            );
         });
   }, []);

   // a function to shuffle the array with correct and incorrect answers. array = argument.
   const shuffle = (array) => {
      // this declares two variables; the length of the array
      let currentIndex = array.length,
         randomIndex;
      //  The while statement creates a loop (araund a code block) that is executed while a condition is true: as long as currentIndex is not zero
      while (currentIndex != 0) {
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

   return <div></div>;
};

export default Questions;
