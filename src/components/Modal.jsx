import { useState } from "react";
import "../styles/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Startpage from "./Startpage.jsx";




export default function Modal() {
  const [showModal, setModal] = useState(true);

  const toggleModal = () => {
    setModal(!showModal); //! = true to false and false to true
  };

  if (showModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const element = <FontAwesomeIcon icon={faXmark} />;


  function refreshPage(){ 
    window.location.reload(); 
}
  
  return (
    <>
      {showModal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="popup-content">
            <div onClick={toggleModal} className="modal-xmark">
              <FontAwesomeIcon icon={faXmark} size="2x" />
            </div>
            <h3 className="modal-info">
              Are you sure you want to exit the game? All your answers will be
              lost.{" "}
            </h3>
            <div className="buttons">
              <button onClick={toggleModal} className="close-modal btn-modal">
                No, go back
              </button>
              <button onClick={refreshPage} className="exit-btn btn-modal">
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
