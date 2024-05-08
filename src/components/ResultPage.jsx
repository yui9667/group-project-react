//Show the total score to the user
//Two buttons which will give the user an option to end the game or restart

import { useState, useEffect } from "react";
import Questions from "./components/Questions.jsx"

//run function when page loads 
/*useEffect ({} => {
    Questions ()

}, [])

const */


return (

    <div>
        <h1 className="endpage-info">Good job! </h1>
        <h3 className="endpage-info">You got a score of /10! </h3>
        <button onClick={toggleModal} className="close-modal">Exit</button>
        <button onClick={backToMenu} className="exit-btn"> Try again </button>
    </div>

)

export default ResultPage;