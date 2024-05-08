import { useEffect, useState } from "react";
//import Questions from "./Questions";
import "../styles/intro.css";
import "../styles/startpage.css";

function StartPage(welcomeMessage) {
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
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
              beatae quas officia a nihil, asperiores impedit fugit aliquam ex
              dolorem. Autem inventore, nam tempore recusandae velit eos!
            </p>
            <button onClick={handleClick} className="btn btn-primary start-btn">
              Start
            </button>
          </div>
        )}
        {btnClicked !== null && <Questions />}
      </div>
    </div>
  );
}

export default StartPage;
