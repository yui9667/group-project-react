//en popup kommer upp för att säkerställa att användaren verkligen vill avsluta
//trycker användaren på exit så kommer man tillbaka till menyn
//trycker man på go back så återgår man till spelet och där man var
import { useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import StartPage from "./Startpage";

/*import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';*/

export default function Modal() {
  const [Modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!Modal); //! = true to false and false to true
  };

  const backToMenu = () => <StartPage />;

  if (Modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const element = <FontAwesomeIcon icon={faXmark} />;

  return (
    /* <div onClick={toggleModal} className="xmark">
<FontAwesomeIcon icon={faXmark} size="2x" />
</div> put inside question card when questions is done*/
    <>
      {Modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="popup-content">
            <div onClick={toggleModal} className="modal-xmark">
              <FontAwesomeIcon className="{faXmark}" icon={faXmark} size="2x" />
            </div>
            {/* <div onClick={toggleModal} className="modal-xmark">
                     <FontAwesomeIcon icon={faXmark} size="2x" />
                  </div> */}
            <h3 className="modal-info">
              Are you sure you want to exit the game? All your answers will be
              lost.{" "}
            </h3>
            <div className="buttons">
              <button onClick={toggleModal} className="close-modal">
                No, go back
              </button>
              <button onClick={backToMenu} className="exit-btn">
                {" "}
                Yes, exit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
