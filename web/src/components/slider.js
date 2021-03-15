import React, { useState, useEffect, useRef } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import PortableText from "@sanity/block-content-to-react";
import { Swiper } from "swiper/react";
import "../styles/swiper.scss";
import "../styles/navigation.scss";
import "../styles/pagination.scss";
import "swiper/components/effect-fade/effect-fade.scss";
import style from "./slider.module.css";
import gsap from "gsap";
SwiperCore.use([Navigation, Pagination]);

const overrides = {
    times: (props) => <p className="times" {...props} />,
};

const serializers = {
    types: {
        block: (props) =>
            // Check if we have an override for the “style”
            overrides[props.node.style]
                ? // if so, call the function and pass in the children, ignoring
                  // the other unnecessary props
                  overrides[props.node.style]({ children: props.children })
                : // otherwise, fallback to the provided default with all props
                  PortableText.defaultSerializers.types.block(props),
    },
};

const Slider = React.forwardRef((props, ref) => {
    let expand = useRef(null);
    let textContainer = useRef(null);
    let cross = useRef(null);

    const [state, setState] = useState({
        initial: true,
        landscape: null,
        portrait: null,
        collapsed: null,
    });

    // Initial setup/on resize
    useEffect(() => {
        if (state.initial === true) {
            if (window.innerWidth <= 799) {
                const timeline = gsap.timeline({
                    onComplete: setState({
                        initial: false,
                        landscape: false,
                        portrait: true,
                        collapsed: true,
                    }),
                });
                // Portait
                timeline.set(expand, {
                    display: "block",
                });
                timeline.set(textContainer, {
                    height: 0,
                });
            } else if (window.innerWidth >= 800) {
                // Landscape
                const timeline = gsap.timeline({
                    onComplete: setState({
                        initial: false,
                        landscape: true,
                        portrait: false,
                        collapsed: false,
                    }),
                });
                timeline.set(expand, {
                    display: "none",
                });
                timeline.set(textContainer, {
                    height: "auto",
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.initial]);

    // Resize/init event listener
    // useEffect(() => {
    //     function windowWidth() {
    //         setState({ ...state, initial: true });
    //     }
    //     window.addEventListener("resize", windowWidth);
    //     return () => window.removeEventListener("resize", windowWidth);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // On click
    function expandDescription() {
        // Check if portrait
        if (state.landscape === false && state.portrait === true) {
            // If collapsed
            if (state.collapsed === true) {
                setState({ ...state, collapsed: false });
                // If expanded
            } else if (state.collapsed === false) {
                setState({ ...state, collapsed: true });
            }
        }
    }

    // Set position on state change
    useEffect(() => {
        // if (state.landscape === true) {
        //     gsap.set(expand, {
        //         display: "none",
        //     });
        //     gsap.set(textContainer, {
        //         height: "auto",
        //     });
        // } else if (state.portrait === true) {
        //     gsap.set(expand, {
        //         display: "block",
        //     });
        //     gsap.set(textContainer, {
        //         height: 0,
        //     });
        // }

        if (state.initial === false) {
            if (state.collapsed === true && state.portrait === true) {
                // gsap.set(textContainer, {
                //     height: "auto",
                // });
                gsap.to(textContainer, {
                    height: 0,
                    duration: 1,
                    ease: "Power3.easeOut",
                });
                gsap.to(cross, {
                    rotation: 45,
                    duration: 0.5,
                });
            } else if (state.collapsed === false && state.portrait === true) {
                gsap.set(textContainer, {
                    height: "auto",
                });
                gsap.from(textContainer, {
                    height: 0,
                    duration: 1,
                    ease: "Power3.easeOut",
                });
                gsap.to(cross, {
                    rotation: 180,
                    duration: 0.5,
                });
            }
        }
    });

    return (
        <section className={style.section} ref={ref}>
            <div className={style.slider}>
                <div className={style.sliderContainer}>
                    <Swiper
                        navigation
                        pagination={{ type: "progressbar" }}
                        observer={"true"}
                        observeParents={"true"}
                    >
                        {props.children}
                    </Swiper>
                </div>
            </div>
            <div className={style.description}>
                <div
                    className={style.expand}
                    onClick={expandDescription}
                    role="presentation"
                    ref={(el) => (expand = el)}
                >
                    <span className={style.padding}>Description</span>
                    <span className={style.cross} ref={(el) => (cross = el)}>
                        &#10005;
                    </span>
                </div>
                <div className={style.textContainer} ref={(el) => (textContainer = el)}>
                    <PortableText
                        className={style.text}
                        blocks={props.description}
                        renderContainerOnSingleChild={true}
                        serializers={serializers}
                    />
                </div>
            </div>
        </section>
    );
});

export default Slider;
