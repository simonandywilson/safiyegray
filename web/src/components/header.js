import React from "react";
import {
    useNameContext,
    useTitleContext,
} from "../state/store";
import style from "../styles/header.module.css";

const Header = () => {
    const name = useNameContext()
    const title = useTitleContext();

    return (
        <header className={style.header}>
            <div className={style.left}>{name}</div>
            <div className={style.right}>{title}</div>
        </header>
    );
};

export default Header;
