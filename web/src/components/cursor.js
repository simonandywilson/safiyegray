import React, { useEffect, useRef } from "react";
import style from "../styles/cursor.module.css";
import gsap from "gsap";

const Cursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousemove", move);

        function move(e) {
            const { clientX, clientY } = e;

            const cursorX = clientX - cursorRef.current.clientWidth / 2;
            const cursorY = clientY - cursorRef.current.clientHeight / 2;

            gsap.to(cursorRef.current, {
                x: cursorX,
                y: cursorY,
                duration: 0.1,
            });
        }
        document.addEventListener("mouseenter", () => {
            gsap.to(cursorRef.current, {
                autoAlpha: 1,
                duration: 0.25,
            });
        });
        document.addEventListener("mouseleave", () => {
            gsap.to(cursorRef.current, {
                autoAlpha: 0,
                duration: 0.25,
            });
        });
        document.addEventListener("mousedown", () => {
            gsap.to(cursorRef.current, {
                scale: 0.55,
                duration: 0.15,
            });
        });
        document.addEventListener("mouseup", () => {
            gsap.to(cursorRef.current, {
                scale: 0.75,
                duration: 0.15,
            });
        });
        return () => {
            document.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <>
            <div className={style.cursor} ref={cursorRef}></div>
        </>
    );
};

export default Cursor;
