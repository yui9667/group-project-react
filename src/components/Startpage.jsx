import { useEffect, useState } from "react";
//import Questions from "./Questions";
import ShowAnswer from "./ShowAnswer";
import "../styles/intro.css";
import "../styles/startpage.css";

function StartPage({ username }) {
  const [btnClicked, setBtnClicked] = useState(null);

  const handleClick = () => {
    setBtnClicked(1);
  };

  useEffect(() => {
    console.log("btnClicked: ", btnClicked);
  }, []);

  return (
    <div className="container">
      <h2>QUIZ TIME</h2>
      <div className="start-container">
        {btnClicked == null && (
          <div className="welcome-container">
            <p className="welcome-text">
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
        {btnClicked !== null && <ShowAnswer username={username} />}
      </div>
    </div>
  );
}

export default StartPage;
