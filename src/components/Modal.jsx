//en popup kommer upp för att säkerställa att användaren verkligen vill avsluta
//trycker användaren på exit så kommer man tillbaka till menyn
//trycker man på go back så återgår man till spelet och där man var 
import { useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
/*import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';*/

/*const clicker = () => {
  setModal(!modal)//! = true to false and false to true

  const genPopup = ()=> {
        popup = j

  }

  const [modal, setModal] = useState(false);*/

  export default function Modal() {
    const [Modal, setModal] = useState(false);
  
    const toggleModal = () => {
      setModal(!Modal);//! = true to false and false to true

    };

    const backToMenu = () => {
        console.log("to do back to menu"
        )

    }
  
    if(Modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  
    const element = <FontAwesomeIcon icon={faXmark} />
    
  return (
/* <div onClick={toggleModal} className="xmark">
<FontAwesomeIcon icon={faXmark} size="2x" />
</div> put inside question card when questions is done*/ 
    <>

      {Modal && (
         <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
            <div className="popup-content">
                <div onClick={toggleModal} className="xmark">
                    <FontAwesomeIcon icon={faXmark} size="2x" />
                </div>
                <h3 className="modal-info">Are you sure you want to exit the game? All your answers will be lost. </h3>
                <div className="buttons">
                    <button onClick={toggleModal} className="close-modal">No, go back</button>
                    <button onClick={backToMenu} className="exit-btn"> Yes, exit</button>
                </div>
            </div>
          </div>
       )}
    
      </>
  );
};



/*function Example() {
  const [show, setShow] = useState(false);

  const closePopup = () => setShow(false);
  const showPopup = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={showPopup}>
        Exit
      </Button>

      <Modal show={show} onHide={closePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to exit the game? All your answers will be lost.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePopup}>
            Yes, exit
          </Button>
          <Button variant="primary" onClick={closePopup}>
            No, go back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;*/

