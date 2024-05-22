import "./App.css";
import { useEffect, useState } from "react";
import Intro from "./components/Intro";
import StartPage from "./components/Startpage.jsx";
import Modal from "./components/Modal.jsx";
import { Route, Routes } from 'react-router-dom';

// Component Functional
function App() {
  // variables, each state is a variable kept in the component all the time
  const [username, setUsername] = useState("");

 
  useEffect(() => {
    console.log(username);
  }, []);
  // dynamic html content
  return (
    <div className="App">
      {username.length == 0 ? <Intro setName={setUsername} /> : ""}
      {username.length > 0 ? <StartPage username={username} /> : ""}
    </div>
  );
}

function AppPages() {
  return (
    <div className="App">
      <Routes>
       <Route path='./components.Startpage.jsx' element={<StartPage/>} />
       <Route path='./compoents.Modal.jsx' element={<Modal/>} />
     </Routes>
    </div>
  );
}
export default App;
