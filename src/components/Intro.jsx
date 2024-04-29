import { useState } from "react";
import "../styles/intro.css";

function Intro({ setName }) {
    const [username, setUsername] = useState("");

    const handleSubmit = (event) => {
        setName(username);
    }
}