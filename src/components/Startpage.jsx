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
              10 randomized trivia questions from various subjects. 
              <p className="introtext">Have fun!</p>
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
