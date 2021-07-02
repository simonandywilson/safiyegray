import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import style from "../styles/index.module.css";
import gsap from "gsap";

import Thumbnail from "../components/thumbnail";
import SEO from "../components/seo";
import Footer from "../components/footer";
import useWindowSize from "../hooks/useWindowSize";
import { useNameUpdateContext, useTitleUpdateContext, useDateUpdateContext } from "../state/store";

let padding = 20;

const Home = () => {
    // Get data
    const {
        allSanityProject: { nodes: projects },
        sanitySeo: seo,
    } = useStaticQuery(getData);

    // Get window size
    const hasWindow = typeof window !== "undefined";
    const windowSize = useWindowSize();
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;

    // Set header info
    const setName = useNameUpdateContext();
    const setTitle = useTitleUpdateContext();
    const setDate = useDateUpdateContext();
    useEffect(() => {
        setName("Safiye Gray");
        setTitle(null);
        setDate(null);
    }, [setName, setTitle, setDate]);

    // Set initial state to true and store state in sessionStorage
    const initialState = () =>
        hasWindow ? window.sessionStorage.getItem("initial") || true : null;
    const [initial, setInitial] = useState(initialState);
    useEffect(() => {
        if (hasWindow) {
            window.sessionStorage.setItem("initial", initial);
        }
    }, [initial]);

    const [complete, setComplete] = useState(false);
    const [spread, setSpread] = useState(false);

    // Add useRef to each <Thumbnail>
    const projectRefs = useRef([]);
    projectRefs.current = [];
    const thumbnails = [];
    const addToRefs = (el) => {
        if (el && !projectRefs.current.includes(el)) {
            projectRefs.current.push(el);
        }
    };

    function testtest() {
        gsap.set(projectRefs.current, {
            autoAlpha: 0,
            repeatRefresh: true,
            stagger: 0.3,
        });
    }

    // Handle resize event
    useEffect(() => {
        if (hasWindow) {
            // let timer;
            // function resizeStarted() {
            //     setComplete(false);
            // }
            function resizing() {
                console.log(projectRefs.current);
                // gsap.to(projectRefs.current, {
                //     duration: 1,
                //     ease: "Power4.easeOut",
                //     x: (index, target) => {
                //         let left = window.innerWidth / 2 - target.offsetWidth / 2;
                //         return left;
                //     },
                //     y: (index, target) => {
                //         let top = window.innerHeight / 2 - target.offsetHeight / 2;
                //         return top;
                //     },
                // });

                const timeline = gsap.timeline();

                timeline.set(projectRefs.current, {
                    scale: 1,
                    autoAlpha: 0,
                    rotation: "random(-10, 10)",
                    repeatRefresh: true,
                });

                console.log("resizing");
            }

            // function resizeEnded() {
            //     setSpread(true);
            // }
            // function handleResize() {
            //     resizing();
            //     if (typeof timer == "undefined") resizeStarted();
            //     clearTimeout(timer);
            //     timer = setTimeout(() => {
            //         timer = undefined;
            //         resizeEnded();
            //     }, 1000);
            // }

            function test() {
                const timeline = gsap.timeline();

                timeline.set(projectRefs.current, {
                    scale: 1,
                    autoAlpha: 0,
                    rotation: "random(-10, 10)",
                    repeatRefresh: true,
                });
            }

            window.addEventListener("resize", testtest);
            return () => window.removeEventListener("resize", testtest);
        }
    }, []);

    // Set size of thumbnails
    useEffect(() => {
        if (hasWindow) {
            const resizer = () => {
                const [height, width] = sizer(
                    window.innerWidth,
                    window.innerHeight,
                    projectRefs.current.length
                );
                document.documentElement.style.setProperty(
                    "--thumbnail-height",
                    `${Math.round(height)}px`
                );
                document.documentElement.style.setProperty(
                    "--thumbnail-width",
                    `${Math.round(width)}px`
                );
            };
            // Set size on init
            window.addEventListener("resize", resizer());
            return () => window.removeEventListener("resize", resizer());
        }
    }, []);

    // Initial animation
    useEffect(() => {
        if (initial) {
            const timeline = gsap.timeline({
                onComplete: function () {
                    setSpread(true);
                },
            });

            timeline.set(projectRefs.current, {
                scale: 1,
                autoAlpha: 0,
                x: (index, target) => {
                    let left = windowWidth / 2 - target.offsetWidth / 2;
                    return left;
                },
                y: (index, target) => {
                    let top = windowHeight / 2 - target.offsetHeight / 2;
                    return top;
                },
                rotation: "random(-10, 10)",
                repeatRefresh: true,
            });

            timeline.to(projectRefs.current, {
                autoAlpha: 1,
                repeatRefresh: true,
                stagger: 0.3,
            });

            // Stack animation
            timeline.to(projectRefs.current, {
                duration: 1,
                scale: 0.75,
                x: (index, target) => {
                    let left = windowWidth / 2 - target.offsetWidth / 2;
                    let randomX = left + random(-30, 30);
                    return randomX;
                },
                y: (index, target) => {
                    let top = windowHeight / 2 - target.offsetHeight / 2;
                    let randomY = top + random(-30, 30);
                    return randomY;
                },
                rotation: "random(-10, 10)",
                repeatRefresh: true,
                stagger: 0.3,
                delay: 0.5,
            });
        } else {
            if (!complete) {
                const previousSize = JSON.parse(window.sessionStorage.getItem("window"));
                if (previousSize.width === windowWidth && previousSize.height === windowHeight) {
                    // Get state from sessionStorage and animate to
                    projectRefs.current.forEach((thumb) => {
                        const properties = JSON.parse(window.sessionStorage.getItem(thumb.id));
                        gsap.set(thumb, {
                            x: properties.left,
                            y: properties.top,
                            rotation: "random(-10, 10)",
                            scale: 0.2,
                        });
                    });
                    const timeline = gsap.timeline({
                        onComplete: function () {
                            setComplete(true);
                            // Set window size in storage
                            window.sessionStorage.setItem("window", JSON.stringify(windowSize));
                        },
                    });
                    timeline.to(projectRefs.current, {
                        duration: 1,
                        scale: 0.75,
                        autoAlpha: 1,
                        rotation: "random(-10, 10)",
                        stagger: 0.25,
                    });
                } else {
                    setInitial(true);
                }
            }
        }
    }, [initial]);

    // Spread effect
    useEffect(() => {
        let counter = 0;
        if (spread) {
            projectRefs.current.forEach((thumb) => {
                const image = initProperties(thumb);
                thumbnails.push(image);
                placeImage(image);
            });

            // Add properties
            function initProperties(thumb) {
                let properties = thumb.getBoundingClientRect();
                return {
                    element: thumb,
                    id: thumb.id,
                    placed: false,
                    width: properties.width,
                    height: properties.height,
                    left: 0,
                    top: 0,
                    right: properties.width,
                    bottom: properties.height,
                };
            }
            // Place thumbnails
            function placeImage(image) {
                image.placed = true;
                image.left = randomInt(padding, windowWidth - (image.width + padding));
                image.top = randomInt(padding, windowHeight - (image.height + padding));
                image.right = image.left + image.width;
                image.bottom = image.top + image.height;

                // Loop through all thumbnails
                for (const thumb of thumbnails) {
                    // Continue if thumb is this thumbnail or isn't placed
                    if (thumb === image || !thumb.placed) {
                        continue;
                    }

                    // Collision detected, restart
                    if (intersects(image, thumb)) {
                        image.placed = false;
                        break;
                    }
                }

                // Position OK or else restart
                if (image.placed) {
                    counter++;
                    const attributes = { left: image.left, top: image.top };
                    window.sessionStorage.setItem(image.id, JSON.stringify(attributes));
                    if (counter === projectRefs.current.length && counter === thumbnails.length) {
                        animatePosition();
                    }
                } else {
                    requestAnimationFrame(function () {
                        placeImage(image);
                    });
                }
            }

            // Animate to position
            function animatePosition() {
                if (counter === projectRefs.current.length && counter === thumbnails.length) {
                    console.log("Images are placed!");
                    for (const thumb of thumbnails) {
                        gsap.to(thumb.element, {
                            duration: 2.5,
                            ease: "Power3.easeOut",
                            x: thumb.left,
                            y: thumb.top,
                        });
                    }
                    setComplete(true);
                    setInitial(false);
                    setSpread(false);
                    // Set window size in storage
                    window.sessionStorage.setItem("window", JSON.stringify(windowSize));
                } else {
                    requestAnimationFrame(function () {
                        animatePosition();
                    });
                    console.warn("Not Ready!");
                }
            }
        }
    }, [spread]);

    return (
        <>
            <SEO
                metatitle={seo.title}
                metadescription={seo.description}
                metabanner={seo.banner.asset.fixed}
            />
            <main className={style.main}>
                {projects.map((project) => {
                    return (
                        <Thumbnail
                            ref={addToRefs}
                            key={project._id}
                            id={project._id}
                            title={project.title}
                            date={project.date}
                            complete={complete}
                            slug={project.slug.current}
                            tags={project.tags}
                            thumb={project.thumbnail.asset.fluid}
                        ></Thumbnail>
                    );
                })}
                <Footer />
            </main>
        </>
    );
};

export default Home;

const getData = graphql`
    {
        allSanityProject {
            nodes {
                _id
                title
                date(formatString: "YYYY")
                slug {
                    current
                }
                tags
                thumbnail {
                    asset {
                        fluid(maxWidth: 1000) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
        sanitySeo {
            title
            description
            banner {
                asset {
                    fixed(height: 630, width: 1200) {
                        ...GatsbySanityImageFixed
                    }
                }
            }
        }
    }
`;

// Maths
function intersects(image, thumb) {
    return !(
        thumb.left > image.right + padding ||
        thumb.right < image.left - padding ||
        thumb.top > image.bottom + padding ||
        thumb.bottom < image.top - padding
    );
}

function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
    }
    return min + (max - min) * Math.random();
}

function randomInt(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
    }
    return Math.floor(min + (max - min + 1) * Math.random());
}

function sizer(x, y, n) {
    // Compute number of rows and columns, and cell size
    const ratio = x / y;
    const ncols_float = Math.sqrt(n * ratio);
    const nrows_float = n / ncols_float;

    // Find best option filling the whole height
    let nrows1 = Math.ceil(nrows_float);
    let ncols1 = Math.ceil(n / nrows1);
    while (nrows1 * ratio < ncols1) {
        nrows1++;
        ncols1 = Math.ceil(n / nrows1);
    }
    const cell_size1 = y / nrows1;

    // Find best option filling the whole width
    let ncols2 = Math.ceil(ncols_float);
    let nrows2 = Math.ceil(n / ncols2);
    while (ncols2 < nrows2 * ratio) {
        ncols2++;
        nrows2 = Math.ceil(n / ncols2);
    }
    const cell_size2 = x / ncols2;

    // Find the best values
    // eslint-disable-next-line no-unused-vars
    let nrows, ncols, cell_size;
    if (cell_size1 < cell_size2) {
        nrows = nrows2;
        ncols = ncols2;
        cell_size = cell_size2;
    } else {
        nrows = nrows1;
        ncols = ncols1;
        cell_size = cell_size1;
    }

    let height = cell_size;
    let width = cell_size * 0.7;
    return [height, width];
}
