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
              Welcome to the QUIZ TIME! Let's test your general knowledge with
              10 trivia multiple-choice questions of varying difficulty. You'll
              see 4 options for each question. The correct choice turns green
              with a check icon. If you select an incorrect answer, it shows red
              color with a small x-mark. If you would like to leave the game,
              click on the X mark at the top right of questions. Have fun!
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
