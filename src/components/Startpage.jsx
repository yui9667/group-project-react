import { useEffect, useState } from "react";
import ShowAnswer from "./ShowAnswer";
import "../styles/intro.css";
import "../styles/startpage.css";

function StartPage({ username }) {
  const [btnClicked, setBtnClicked] = useState(false);
  const [restartGame, setRestartGame] = useState(null);

  const handleClick = () => {
    setBtnClicked(true);
  };

  useEffect(() => {
    console.log("btnClicked: ", btnClicked);
  }, []);

  // define event handler for restarting the game
  const handleRestartGame = () => {
    setBtnClicked(false);
    console.log("Welcome again!");
  };

  return (
    <div className="container">
      <h2>QUIZ TIME</h2>
      <div className="start-container">
        {!btnClicked && (
          <div className="welcome-container">
            <p className="welcome-text">
              {" "}
              This is a trivia quiz, a general Knowledge category with mixes all
              easy, middle, and difficult levels together. There are a total of
              10 questions and 4 options, it shows green with a check icon if
              you select the correct answer, but if you select the incorrect
              answer, it shows red color with an xmark. Have fun!
            </p>
            <button onClick={handleClick} className="btn btn-primary start-btn">
              Start
            </button>
          </div>
        )}
        {btnClicked && (
          <ShowAnswer username={username} restartGame={handleRestartGame} />
        )}
      </div>
    </div>
  );
}

export default StartPage;
