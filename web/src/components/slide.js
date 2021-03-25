import React, { useState, useEffect, useRef } from "react";
import Image from "gatsby-image";
import style from "../styles/project.module.css";
import { gsap } from "gsap";

const Slide = (props) => {
    const [aspect, setAspect] = useState(0);
    let element = useRef(null);

    useEffect(() => {
        if (props.aspectRatio > 1.1) {
            setAspect(1.5);
        } else if (props.aspectRatio < 0.9) {
            setAspect(0.66);
        } else {
            setAspect(1);
        }
        if (props.rotate) {
            gsap.to(element, {
                rotation: "random(-10, 10)",
                duration: 1,
            });
        }

        gsap.to(element, {
            x: "random(-25, 25)",
            y: "random(-25, 25)",
            duration: 3,
        });
    }, [props.aspectRatio, props.rotate]);

    // className={ `${style[props.size]} ${style.item}` }

    return (
        
        <div className={style.wrapper} ref={(el) => (element = el)}>
            <Image
            className={style.item}
                key={props._key}
                alt={props.alt}
                fluid={{
                    ...props.image,
                    aspectRatio: aspect,
                }}
                durationFadeIn={1000}
            />
        </div>
    );
};

export default Slide;
