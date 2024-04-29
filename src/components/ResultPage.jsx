import { useEffect, useState } from "react";
import Questions from "./Questions";
import "../styles/intro.css";
import "../styles/startpage.css";


const [btnClicked, setBtnClicked] = useState(null);

    const handleClick = () => {
        setBtnClicked(1);
    };