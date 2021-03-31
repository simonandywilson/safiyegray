import React from "react";
import {
    useNameContext,
    useTitleContext,
    useDateContext,
} from "../state/store";
import style from "../styles/header.module.css";

const Header = () => {
    const name = useNameContext()
    const title = useTitleContext();
    const date = useDateContext();

    return (
        <header className={style.header}>
            <div className={style.left}>{name}</div>
            <div className={style.centre}>{title}</div>
            <div className={style.right}>{date}</div>
        </header>
    );
};

export default Header;
