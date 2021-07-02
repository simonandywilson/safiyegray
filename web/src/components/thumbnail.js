import React, { useEffect, useState, useRef } from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import style from "../styles/thumbnail.module.css";
import gsap from "gsap";
import { usePropertiesContext, useTitleUpdateContext, useDateUpdateContext } from "../state/store";
import Tag from "../components/tag";

const Thumbnail = React.forwardRef((props, ref) => {
    const hasWindow = typeof window !== "undefined";
    const properties = usePropertiesContext();
    let thumbnailContainer = useRef(null);
    let tagsContainer = useRef(null);
    const innerRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);

    const setTitle = useTitleUpdateContext();
    const setDate = useDateUpdateContext();

    // Add refs to each tag
    const tagRefs = useRef([]);
    tagRefs.current = [];
    const addToRefs = (el) => {
        if (el && !tagRefs.current.includes(el)) {
            tagRefs.current.push(el);
        }
    };

    const [hover, setHover] = useState(false);
    const [origin, setOrigin] = useState({
        height: 0,
        width: 0,
        left: 0,
        top: 0
    })
    const [offset, setOffset] = useState({
        left: 0,
        top: 0,
    });

    useEffect(() => {
        if (props.status === "complete" && hasWindow) {

            const result = properties.find(({ id }) => id === props.id);
        //     setOrigin({
        //         height: parseInt(getComputedStyle(document.documentElement).getPropertyValue("--thumbnail-height"), 10),
        //        width: parseInt(
        //       getComputedStyle(document.documentElement).getPropertyValue("--thumbnail-width"),
        //       10
        //   ),
        // left: result.left,
        // top: result.top
            // })
        }
        


    }, [props.status])




    // const height = hasWindow
    //     ? parseInt(
    //           getComputedStyle(document.documentElement).getPropertyValue("--thumbnail-height"),
    //           10
    //       )
    //     : null;
    // const width = hasWindow
    //     ? parseInt(
    //           getComputedStyle(document.documentElement).getPropertyValue("--thumbnail-width"),
    //           10
    //       )
    //     : null;
    // const properties = hasWindow ? JSON.parse(window.sessionStorage.getItem(props.id)) : null;
    
    // const result = properties.find( ({ id }) => id === props.id );

    // Animate dots in and out
    // useEffect(() => {
    //     if (tagRefs.current.length > 0) {
    //         if (props.status === "complete") {
    //             gsap.set(tagRefs.current, {
    //                 scale: 0,
    //                 x: (index, target) => {
    //                     let left = randomise(target.offsetWidth, width) - target.offsetWidth;
    //                     return left;
    //                 },
    //                 y: (index, target) => {
    //                     let top = randomise(target.offsetWidth, height) - target.offsetHeight;
    //                     return top;
    //                 },
    //             });
    //             gsap.to(tagRefs.current, {
    //                 scale: 1,
    //                 stagger: {
    //                     each: 0.25,
    //                     from: "random",
    //                     grid: "auto",
    //                     ease: "power2.inOut",
    //                 },
    //             });
    //         } else {
    //             gsap.to(tagRefs.current, {
    //                 scale: 0,
    //                 stagger: {
    //                     each: 0.25,
    //                     from: "random",
    //                     grid: "auto",
    //                     ease: "power2.inOut",
    //                 },
    //             });
    //         }
    //     }
    // }, [props.status]);

    // Mouseover thumbnails
    // useEffect(() => {
    //     if (props.status === "complete") {
    //         gsap.to(thumbnailContainer, {
    //             scale: 1.05,
    //             x: (index, target) => {
    //                 let movement = offset.left / 15;
    //                 return movement;
    //             },
    //             y: (index, target) => {
    //                 let movement = offset.top / 15;
    //                 return movement;
    //             },
    //         });
    //         gsap.to(tagsContainer, {
    //             scale: 1.05,
    //             x: (index, target) => {
    //                 let movement = offset.left / 30;
    //                 return movement * -1;
    //             },
    //             y: (index, target) => {
    //                 let movement = offset.top / 30;
    //                 return movement * -1;
    //             },
    //         });
    //     }
    // }, [offset]);

    // Recentre thumbnails
    // useEffect(() => {
    //     if (props.status === "complete") {
    //         if (!hover) {
    //             gsap.to(thumbnailContainer, {
    //                 scale: 1,
    //                 x: 0,
    //                 y: 0,
    //             });
    //             gsap.to(tagsContainer, {
    //                 scale: 1,
    //                 x: 0,
    //                 y: 0,
    //             });
    //         }
    //     }
    // }, [hover]);

    function mouseMove(e) {
        if (props.status === "complete") {
            setOffset({
                left: e.clientX - (origin.left + Math.floor(origin.width / 2)),
                top: e.clientY - (origin.top + Math.floor(origin.height / 2)),
            });
        }
    }

    function setHeadings() {
        setTitle(props.title);
        setDate(props.date);
    }

    return (
        <div>
            <Link to={props.slug}>
                <figure
                    ref={combinedRef}
                    className={style.thumbnail}
                    id={props.id}
                    onMouseOver={() => setHeadings()}
                    onFocus={() => setHeadings()}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onMouseMove={(e) => mouseMove(e)}
                    role="presentation"
                >
                    <div ref={(el) => (thumbnailContainer = el)}>
                        <Img
                            fluid={{
                                ...props.thumb,
                                aspectRatio: 0.7,
                            }}
                        />
                    </div>
                    <div className={style.tagsContainer} ref={(el) => (tagsContainer = el)}>
                        {props.tags.map((tag, index) => {
                            return (
                                <Tag
                                    key={index}
                                    ref={addToRefs}
                                    tag={tag}
                                    status={props.status}
                                />
                            );
                        })}
                    </div>
                </figure>
            </Link>
        </div>
    );
});

export default Thumbnail;

function useCombinedRefs(...refs) {
    const targetRef = React.useRef();

    React.useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) return;

            if (typeof ref === "function") {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
}

function randomise(min, max) {
    return Math.random() * (max - min) + min;
}
