import { useEffect, useState } from "react";
//import Questions from "./Questions";
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
                {
                    !btnClicked  && (
                    <div className="welcome-container">
                        <p className="welcome-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic beatae quas officia a nihil, asperiores impedit fugit aliquam ex dolorem. Autem inventore, nam tempore recusandae velit eos!</p>
                        <button onClick={handleClick} className="btn btn-primary start-btn">Start</button>
                    </div>
                    )
                }
                {
                    btnClicked && (
                        <ShowAnswer
                        username={username}
                        restartGame={handleRestartGame}/>
                    )
                }
            </div>
        </div>
    )

}

export default StartPage;
