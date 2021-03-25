import React from "react";
import {
    useLeftContext,
    useCentreContext,
    useRightContext,
    useDescriptionContext,
} from "../state/store";
import style from "../styles/header.module.css";

const Header = () => {
    const left = useLeftContext()
    const centre = useCentreContext();
    const right = useRightContext();
    const description = useDescriptionContext();

    return (
        <header className={style.header}>
            <div className={style.left}>{left}</div>
            <div className={style.centre}>{centre}</div>
            <div className={style.right}>{right}</div>
            <div className={style.description}>{description}</div>
        </header>
    );
};

export default Header;
