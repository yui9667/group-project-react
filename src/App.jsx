import "./App.css";
import { StrictMode, useEffect, useState } from "react";
import Intro from "./components/Intro";
import StartPage from "./components/Startpage.jsx";
import Modal from "./components/Modal.jsx";

// Component Functional
function App() {
   // variables, each state is a variable kept in the component all the time
   const [username, setUsername] = useState("");

   useEffect(() => {
      console.log(username);
   }, []);
   // dynamic html content
   return (
      // <StrictMode>
      <div className="App">
         {username.length == 0 ? <Intro setName={setUsername} /> : ""}
         {username.length > 0 ? <StartPage username={username} /> : ""}
         <Modal />
      </div>
      //</StrictMode>
   );
}

export default App;
