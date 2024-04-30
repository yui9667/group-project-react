import axios from "axios";
import { useState, useEffect } from "react";
//import TriviaButton from "./TriviaButton";

const TriviaData = () => {
   // initalize our state variables to store data from the API:
   const [currentQuestion, setCurrentQuestion] = useState([]);
   const [] = useState([]);

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

   return (
      <div className="wrapper">
         {currentQuestion.map((q, index) => (
            <div className="question-card" key={index}>
               <h2>{q.question}</h2>
               <button>{q.correct_answer}</button>
               <button>{q.incorrect_answers[0]}</button>
               <button>{q.incorrect_answers[1]}</button>
               <button>{q.incorrect_answers[2]}</button>
            </div>
         ))}
         <div className="controls">
            <button className="next-btn">Next Question</button>
         </div>
      </div>
   );
};

export default TriviaData;
