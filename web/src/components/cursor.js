import React, { useEffect, useRef } from "react";
import style from "../styles/cursor.module.css";
import { isMobile } from "react-device-detect";
import gsap from "gsap";

const Cursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousemove", move);
        console.log();

        function move(e) {
            console.log(e.target.tagName);
        

            const { clientX, clientY } = e;

            const cursorX = clientX - cursorRef.current.clientWidth / 2;
            const cursorY = clientY - cursorRef.current.clientHeight / 2;

            gsap.to(cursorRef.current, {
                x: cursorX,
                y: cursorY,
                duration: 0.1,
            });

            if (
                e.target.tagName === "A" ||
                e.target.dataset.tag ||
                e.target.parentNode.dataset.tag
            ) {
                gsap.to(cursorRef.current, {
                    scale: 1.1,
                    duration: 0.5,
                });
            } else {
                gsap.to(cursorRef.current, {
                    scale: 0.75,
                    duration: 0.5,
                });
            }
        }
        document.addEventListener("mouseover", () => {
            gsap.to(cursorRef.current, {
                autoAlpha: 1,
                duration: 0.25,
            });
        });
        document.addEventListener("mouseout", () => {
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
            <div
                style={{ display: isMobile ? "none" : "block" }}
                className={style.cursor}
                ref={cursorRef}
            ></div>
        </>
    );
};

export default Cursor;
