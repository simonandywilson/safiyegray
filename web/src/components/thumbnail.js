import React, { useEffect, useState, useRef } from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";
import style from "../styles/thumbnail.module.css";
import gsap from "gsap";
import { useCentreUpdateContext } from "../state/store";
import Tag from "../components/tag"

const Thumbnail = React.forwardRef((props, ref) => {
    const hasWindow = typeof window !== "undefined";
    let thumbnailContainer = useRef(null);
    let tagsContainer = useRef(null);
    const innerRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);

    const setTitle = useCentreUpdateContext();

    // Add refs to each tag
    const tagRefs = useRef([]);
    tagRefs.current = [];
    const addToRefs = (el) => {
        if (el && !tagRefs.current.includes(el)) {
            tagRefs.current.push(el);
        }
    };

    const [hover, setHover] = useState(false);
    const [offset, setOffset] = useState({
        left: 0,
        top: 0,
    });
    const height = hasWindow ? parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--thumbnail-height"),
        10) : null
    const width = hasWindow ? parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--thumbnail-width"),
        10) : null
    const properties = JSON.parse(window.sessionStorage.getItem(props.id));

    // Animate dots in and out
    useEffect(() => {
        if (props.complete) {
            gsap.set(tagRefs.current, {
                scale: 0,
                x: (index, target) => {
                    let left = randomise(target.offsetWidth, width) - target.offsetWidth;
                    return left;
                },
                y: (index, target) => {
                    let top = randomise(target.offsetWidth, height) - target.offsetHeight;
                    return top;
                },
            });
            gsap.to(tagRefs.current, {
                scale: 1,
                stagger: {
                    each: 0.25,
                    from: "random",
                    grid: "auto",
                    ease: "power2.inOut",
                },
            });
        } else {
            gsap.to(tagRefs.current, {
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

    // Mouseover thumbnails
    useEffect(() => {
        if (props.complete) {
            gsap.to(thumbnailContainer, {
                scale: 1.05,
                x: (index, target) => {
                    let movement = offset.left / 15;
                    return movement;
                },
                y: (index, target) => {
                    let movement = offset.top / 15;
                    return movement;
                },
            });
            gsap.to(tagsContainer, {
                scale: 1.05,
                x: (index, target) => {
                    let movement = offset.left / 30;
                    return movement * -1;
                },
                y: (index, target) => {
                    let movement = offset.top / 30;
                    return movement * -1;
                },
            });
        }
    }, [offset]);

    // Recentre thumbnails
    useEffect(() => {
        if (props.complete) {
            if (!hover) {
                gsap.to(thumbnailContainer, {
                    scale: 1,
                    x: 0,
                    y: 0,
                });
                gsap.to(tagsContainer, {
                    scale: 1,
                    x: 0,
                    y: 0,
                });
            }
        }
    }, [hover]);

    function mouseMove(e) {
        if (props.complete) {
            setOffset({
                left: e.clientX - (properties.left + Math.floor(width / 2)),
                top: e.clientY - (properties.top + Math.floor(height / 2)),
            });
        }
    }

    return (
        <div>
            <Link to={props.slug}>
                <figure
                    ref={combinedRef}
                    className={style.thumbnail}
                    id={props.id}
                    onMouseOver={() => setTitle(props.title)}
                    onFocus={() => setTitle(props.title)}
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
                            return <Tag key={index} ref={addToRefs} tag={tag} complete={props.complete}/>
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
