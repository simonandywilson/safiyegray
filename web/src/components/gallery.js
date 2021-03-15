import React, { useState } from "react";
import style from "./gallery.module.css";
import Image from "gatsby-image";

const Gallery = React.forwardRef((props, ref) => {
    
    const thumbnails = React.Children.map(props.children, (child) =>
        React.cloneElement(child, {
            onMouseOver: () => {
                setThumb({
                    caption: child.props.children.props.title,
                    preview: child.props.children.props.fluid,
                    alt: child.props.children.props.alt,
                });
            },
        })
    );

    const [thumb, setThumb] = useState({
        caption: thumbnails[0].props.children.props.title,
        preview: thumbnails[0].props.children.props.fluid,
        alt: thumbnails[0].props.children.props.alt,
    });
    
    return (
        <figure className={style.figure}>
            <figcaption className={style.figcaption}>
                <div className={style.name}>{props.name}</div>
                <div className={style.caption}>{thumb.caption}</div>
            </figcaption>
            <div className={style.preview}>
                <div className={style.small}>
                    <Image
                        alt={thumb.alt}
                        fluid={{
                            ...thumb.preview,
                            aspectRatio: 1.5,
                        }}
                    />
                </div>
            </div>
            <div className={style.gallery}>{thumbnails}</div>
        </figure>
    );
});

export default Gallery;
