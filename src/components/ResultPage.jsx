//Show the total score to the user:
// use props for passing data from parent components to children (e.g., the questions and selected answers in the showanswer page)
// fetch the scores from showanswer to resultpage

//Two buttons which will give the user an option to end the game or restart:
// rerun showanswer component using 'try again' (don't run intro or startpage) and
// rerun useEffect() from scratch, let it fetch new 10 questions)

import { useState, useEffect } from "react";
import "../styles/resultpage.css";



function ResultPage (props) {
    return(
        <div className="container">
            <div className="endpage-initial">
                <h3>Good job!</h3>
            </div>
            <div className="endpage-info" onClick={props.onPress}>
                <h3>You got a score of {(props.correctQuestions / props.totalQuestions)} !</h3>
                <button onClick={props.onEndGame} className="close-modal">End game</button>
                <button onClick={props.onTryAgain} className="exit-btn">Try again</button>
            </div>
        </div>
    )
}


export default ResultPage