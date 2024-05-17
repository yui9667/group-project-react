import { useState } from "react";
import "../styles/intro.css";

function Intro({ setName }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    setName(username);
  };

  return (
    <div className="container">
      <div className="inner-container">
        <h2>QUIZ TIME</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="username" className="form-label">
            Please submit your name before starting the quiz!
          </label>
          <input
            type="text"
            id="username"
            aria-describedby="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Intro;
