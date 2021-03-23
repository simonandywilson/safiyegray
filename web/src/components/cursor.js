import React, { useEffect, useRef } from "react";
import style from "../styles/cursor.module.css";
import gsap from "gsap";

const Cursor = () => {
    const cursorRef = useRef(null);
    const followRef = useRef(null);

    useEffect(() => {
        document.addEventListener("mousemove", (event) => {
            const { clientX, clientY } = event;
        
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

        });
        document.addEventListener("mouseenter", () => {
            gsap.to(cursorRef.current, {
                autoAlpha: 1,
                duration: 0.25,
            });
            gsap.to(followRef.current, {
                autoAlpha: 1,
                duration: 0.25,
            });
        });
        document.addEventListener("mouseleave", () => {
            gsap.to(cursorRef.current, {
                autoAlpha: 0,
                duration: 0.25,
            });
            gsap.to(followRef.current, {
                autoAlpha: 0,
                duration: 0.25,
            });
        });
        return () => {};
    }, []);

    // const positionRef = useRef({
    //     mouseX: 0,
    //     mouseY: 0,
    //     destinationX: 0,
    //     destinationY: 0,
    //     distanceX: 0,
    //     distanceY: 0,
    //     key: -1,
    // });

    // useEffect(() => {
    //     document.addEventListener("mousemove", (event) => {
    //         const { clientX, clientY } = event;

    //          const mouseX = clientX - cursorRef.current.clientWidth / 2;
    //          const mouseY = clientY - cursorRef.current.clientHeight / 2;

    //         positionRef.current.mouseX = mouseX - followRef.current.clientWidth / 2;
    //         positionRef.current.mouseY = mouseY - followRef.current.clientHeight / 2;

    //         cursorRef.current.style.transform = `translate3D(${mouseX}px, ${mouseY}px, 0)`;
    //     });
    //     return () => {};
    // }, []);

    // useEffect(() => {
    //     const followMouse = () => {
    //         positionRef.current.key = requestAnimationFrame(followMouse);

    //         const {
    //             mouseX,
    //             mouseY,
    //             destinationX,
    //             destinationY,
    //             distanceX,
    //             distanceY,
    //         } = positionRef.current;

    //         if (!destinationX | !destinationY) {
    //             positionRef.current.destinationX = mouseX;
    //             positionRef.current.destinationY = mouseY;
    //         } else {
    //             positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
    //             positionRef.current.distanceY = (mouseY - destinationY) * 0.1;

    //             if (
    //                 Math.abs(positionRef.current.distanceX) +
    //                     Math.abs(positionRef.current.distanceY) <
    //                 0.1
    //             ) {
    //                 positionRef.current.destinationX = mouseX;
    //                 positionRef.current.destinationY = mouseY;
    //             } else {
    //                 positionRef.current.destinationX += distanceX;
    //                 positionRef.current.destinationY += distanceY;
    //             }
    //         }
    //         followRef.current.style.transform = `translate3D(${destinationX}px, ${destinationY}px, 0 )`;
    //     };
    //     followMouse();
    // }, []);

    return (
        <>
            <div className={style.cursor} ref={cursorRef}></div>
            <div className={style.follow} ref={followRef}></div>
        </>
    );
};

export default Cursor;
