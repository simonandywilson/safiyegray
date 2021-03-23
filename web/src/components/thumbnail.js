import React, { useEffect, useState, useRef } from "react";
import Image from "gatsby-image";
import { Link } from "gatsby";
import style from "../styles/thumbnail.module.css";
import gsap from "gsap";

const Thumbnail = React.forwardRef((props, ref) => {
    const tagsRef = useRef([]);
    const [tags, setTags] = useState({
        topLeft: "blank",
        topRight: "blank",
        bottomLeft: "blank",
        bottomRight: "blank",
    });

    useEffect(() => {
        // Add 'blank' to fill in missing tags (up to 4) & then randomise
        let rawTags = props.tags;
        rawTags.length = 4;
        rawTags = Array.from(rawTags, (item) => item || "blank");

        const shuffle = (arr) =>
            [...arr].reduceRight(
                (res, _, __, s) => (res.push(s.splice(0 | (Math.random() * s.length), 1)[0]), res),
                []
            );
        let processedTags = shuffle(rawTags);

        setTags({
            topLeft: processedTags[0],
            topRight: processedTags[1],
            bottomLeft: processedTags[2],
            bottomRight: processedTags[3],
        });
    }, []);

    useEffect(() => {
      if (props.complete === true) {
        gsap.to(tagsRef.current, {
            scale: 1,
            stagger: {
                each: 0.25,
                from: "random",
                grid: "auto",
                ease: "power2.inOut",
            },
        });
      } else {
          gsap.to(tagsRef.current, {
              scale: 0,
              stagger: {
                  each: 0.25,
                  from: "random",
                  grid: "auto",
                  ease: "power2.inOut",
              },
          });
      }
    }, [props.complete]);

    // Update title on mouseover
    function setTitle() {
        props.setProjectTitle(props.title);
    }

    return (
        <figure
            ref={ref}
            className={style.thumbnail}
            id={props.id}
            onMouseOver={setTitle}
            onFocus={setTitle}
        >
            <Link to={props.slug}>
                <Image
                    fluid={{
                        ...props.thumb,
                        aspectRatio: 0.7,
                    }}
                />
            </Link>
            <div
                className={`${style.topLeft} ${style[tags.topLeft]}`}
                ref={(el) => (tagsRef.current[0] = el)}
            ></div>
            <div
                className={`${style.topRight} ${style[tags.topRight]}`}
                ref={(el) => (tagsRef.current[1] = el)}
            ></div>
            <div
                className={`${style.bottomLeft} ${style[tags.bottomLeft]}`}
                ref={(el) => (tagsRef.current[2] = el)}
            ></div>
            <div
                className={`${style.bottomRight} ${style[tags.bottomRight]}`}
                ref={(el) => (tagsRef.current[3] = el)}
            ></div>
            {/* <figcaption className={style.figcaption}>{props.title}</figcaption> */}
        </figure>
    );
});

export default Thumbnail;
