import React from "react";
import style from "../styles/nav.module.css";

const Nav = (props) => {
    return (
        <nav className={style.nav}>
            <div className={style.link}>{props.link}</div>
            <div className={style.title}>{props.title}</div>
            <div className={style.date}>{props.date}</div>
            <div className={style.description}>{props.description}</div>
        </nav>
    );
};

export default Nav;
