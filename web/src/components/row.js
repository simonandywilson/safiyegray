import React, { useState, useEffect } from "react";
import style from "./project.module.css";
import Image from "gatsby-image";

const Row = React.forwardRef((props, ref) => {
    const [aspect, setAspect] = useState(0);
    const [size, setSize] = useState(null);
    const imgSize = props.size.toLowerCase();

    useEffect(() => {
        if (props.aspectRatio > 1.1) {
            setSize(imgSize);
            setAspect(1.5);
        } else if (props.aspectRatio < 0.9) {
            setSize("portrait");
            setAspect(0.66);
        } else {
            setAspect(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <figure className={style.figure} key={props._key} ref={ref}>
            <figcaption className={style.figcaption}>
                <div className={style.name}>{props.title}</div>
                <div className={style.count}>
                    {props.index}/{props.length}
                </div>
                <div className={style.materials}>{props.materials}</div>
                <div className={style.dimensions}>{props.dimensions}</div>
                <div className={style.year}>{props.date}</div>
            </figcaption>
            <div className={style.image}>
                <div className={style[size]}>
                    <Image
                        alt={props.alt}
                        fluid={{
                            ...props.image,
                            aspectRatio: aspect,
                        }}
                        durationFadeIn={1000}
                    />
                </div>
            </div>
        </figure>
    );
});

export default Row;
