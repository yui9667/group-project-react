import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"; // Importera även ikonen för 'faTimes' eller 'faXmark'
import "../styles/Modal.css";

const ErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState(false);

  const toggleModal = () => {
    setErrorMessage(!errorMessage); //! = true to false and false to true
  };

  const backToMenu = () => {
    console.log("to do back to menu");
  };

  if (errorMessage) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const element = <FontAwesomeIcon icon={faXmark} />;

  return (
    <>
      {errorMessage && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="popup-content">
            <div onClick={toggleModal} className="xmark">
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </div>
            <h3 className="modal-info">
              Something went wrong. We couldn't start the game. Please try
              starting it again.{" "}
            </h3>
            <div className="buttons">
              <button onClick={backToMenu} className="exit-btn">
                {" "}
                Start the game again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
