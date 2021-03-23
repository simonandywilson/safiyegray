import React, { useEffect, useRef } from "react";
import style from "../styles/header.module.css";
import gsap from "gsap";

const Header = () => {
    let header = useRef(null);

    useEffect(() => {
        gsap.to(header, {
            autoAlpha: 1,
            duration: 2
        });
    });

    return (
        <header className={style.header} ref={(el) => (header = el)}>
            <div>Title</div>
            <div className={style.details}>Details</div>
            <div className={style.date}>Year</div>
        </header>
    );
};

export default Header;
