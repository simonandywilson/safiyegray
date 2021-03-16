import React from "react";
import Image from "gatsby-image";
import style from "../styles/thumbnail.module.css"

const Thumbnail = React.forwardRef((props, ref) => {
    return (
        <figure ref={ref} className={style.thumbnail}>
            <Image
                fluid={{
                    ...props.thumb,
                    aspectRatio: 0.66,
                }}
            />
            <figcaption className={style.figcaption}>{props.title}</figcaption>
        </figure>
    );
});

export default Thumbnail;
