import { useEffect, useState } from "react";
import Questions from "./Questions";
import "../styles/intro.css";
import "../styles/startpage.css";

function StartPage(welcomeMessage) {
    const [btnClicked, setBtnClicked] = useState(null);

    const handleClick = () => {
        setBtnClicked(1);
    };

    useEffect(() => {
        console.log("btnClicked: ", btnClicked)
    }, [])
}