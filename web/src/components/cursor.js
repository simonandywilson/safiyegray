import React, { useEffect, useRef } from "react";
import style from "../styles/cursor.module.css";
import gsap from "gsap";

const Cursor = () => {
    const cursorRef = useRef(null);
    const followRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousemove", move);

        function move(e) {
            const { clientX, clientY } = e;

            const cursorX = clientX - cursorRef.current.clientWidth / 2;
            const cursorY = clientY - cursorRef.current.clientHeight / 2;
            const followX = clientX - followRef.current.clientWidth / 2;
            const followY = clientY - followRef.current.clientHeight / 2;

            gsap.to(cursorRef.current, {
                x: cursorX,
                y: cursorY,
                duration: 0.1,
            });

            gsap.to(followRef.current, {
                x: followX,
                y: followY,
                duration: 0.5,
            });
        }
        // document.addEventListener("mouseenter", () => {
        //     gsap.to(cursorRef.current, {
        //         autoAlpha: 1,
        //         duration: 0.25,
        //     });
        //     gsap.to(followRef.current, {
        //         autoAlpha: 1,
        //         duration: 0.25,
        //     });
        // });
        // document.addEventListener("mouseleave", () => {
        //     gsap.to(cursorRef.current, {
        //         autoAlpha: 0,
        //         duration: 0.25,
        //     });
        //     gsap.to(followRef.current, {
        //         autoAlpha: 0,
        //         duration: 0.25,
        //     });
        // });
        return () => {
            document.removeEventListener("mousemove", move);
        };
    }, []);

    return (
        <>
            <div className={style.follow} ref={followRef}></div>
            <div className={style.cursor} ref={cursorRef}></div>
        </>
    );
};

export default Cursor;
