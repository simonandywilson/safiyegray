import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import style from "../styles/index.module.css";
import gsap from "gsap";
import PortableText from "@sanity/block-content-to-react";

import SEO from "../components/seo";
import Nav from "../components/nav";
// import Cursor from "../components/cursor";
import Thumbnail from "../components/thumbnail";
import useWindowSize from "../hooks/useWindowSize";

const padding = getComputedStyle(document.documentElement).getPropertyValue("--thumbnail-padding");

const Home = () => {
    // Get data
    const {
        allSanityProject: { nodes: projects },
        allSanityAbout: { nodes: about },
    } = useStaticQuery(getData);

    // Get window size
    const hasWindow = typeof window !== "undefined";
    const windowSize = useWindowSize();
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;

    // Set initial state to true and store state in sessionStorage
    const initialState = () => window.sessionStorage.getItem("initial") || true;
    const [initial, setInitial] = useState(initialState);
    useEffect(() => window.sessionStorage.setItem("initial", initial), [initial]);

    const [complete, setComplete] = useState(false);
    const [spread, setSpread] = useState(false);
    const [projectTitle, setProjectTitle] = useState(null);

    // Set size of thumbnails
    useEffect(() => {
        if (hasWindow) {
            function resizer() {
                const thumbWidth = sizer(
                    window.innerWidth,
                    window.innerHeight,
                    projectRefs.current.length
                );
                document.documentElement.style.setProperty("--thumbnail-width", `${thumbWidth}px`);
            }
            // Set size on init
            resizer();
            window.addEventListener("resize", resizer);
            return () => window.removeEventListener("resize", resizer);
        }
    }, []);

    // Add useRef to each <Thumbnail>
    const projectRefs = useRef([]);
    projectRefs.current = [];
    const thumbnails = [];
    const addToRefs = (el) => {
        if (el && !projectRefs.current.includes(el)) {
            projectRefs.current.push(el);
        }
    };

    // Initial animation
    useEffect(() => {
        if (initial === true) {
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
            if (complete === false) {
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
        if (spread === true) {
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
                    // Continue if thum is this thumbnail or isn't placed
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
                    if (counter === projectRefs.current.length && counter === thumbnails.length) {
                        animatePosition();
                    }
                    const attributes = { left: image.left, top: image.top };
                    window.sessionStorage.setItem(image.id, JSON.stringify(attributes));
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
                        const timeline = gsap.timeline({
                            onComplete: function () {
                                setComplete(true);
                                setInitial(false);
                                setSpread(false);
                                // Set window size in storage
                                window.sessionStorage.setItem("window", JSON.stringify(windowSize));
                            },
                        });
                        timeline.to(thumb.element, {
                            duration: 2.5,
                            ease: "Power3.easeOut",
                            x: thumb.left,
                            y: thumb.top,
                        });
                    }
                } else {
                    requestAnimationFrame(function () {
                        animatePosition();
                    });
                    console.warn("Not Ready!");
                }
            }
        }
    }, [spread]);

    // Handle resize event
    useEffect(() => {
        if (hasWindow) {
            let timer;
            function resizeStarted() {
                setComplete(false);
            }
            function resizing() {
                gsap.to(projectRefs.current, {
                    duration: 1,
                    ease: "Power4.easeOut",
                    x: (index, target) => {
                        let left = window.innerWidth / 2 - target.offsetWidth / 2;
                        return left;
                    },
                    y: (index, target) => {
                        let top = window.innerHeight / 2 - target.offsetHeight / 2;
                        return top;
                    },
                });
            }

            function resizeEnded() {
                setSpread(true);
            }
            function handleResize() {
                resizing();
                if (typeof timer == "undefined") resizeStarted();
                clearTimeout(timer);
                timer = setTimeout(() => {
                    timer = undefined;
                    resizeEnded();
                }, 1000);
            }

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    // Set colours
    useEffect(() => {
        const cursor = about[0].cursor.rgb;
        const illustration = about[0].illustration.rgb;
        const print = about[0].print.rgb;
        const exhibition = about[0].exhibition.rgb;
        const publication = about[0].publication.rgb;

        document.documentElement.style.setProperty(
            "--cursor-colour",
            `rgba(${cursor.r}, ${cursor.g}, ${cursor.b}, ${cursor.a})`
        );
        document.documentElement.style.setProperty(
            "--illustration-colour",
            `rgba(${illustration.r}, ${illustration.g}, ${illustration.b}, ${illustration.a})`
        );
        document.documentElement.style.setProperty(
            "--print-colour",
            `rgba(${print.r}, ${print.g}, ${print.b}, ${print.a})`
        );
        document.documentElement.style.setProperty(
            "--exhibition-colour",
            `rgba(${exhibition.r}, ${exhibition.g}, ${exhibition.b}, ${exhibition.a})`
        );
        document.documentElement.style.setProperty(
            "--publication-colour",
            `rgba(${publication.r}, ${publication.g}, ${publication.b}, ${publication.a})`
        );
    }, []);

    return (
        <>
            <SEO />
            {/* <Cursor /> */}
            <Nav
                link={
                    <PortableText blocks={about[0]._rawBio} renderContainerOnSingleChild={true} />
                }
                title={projectTitle}
                date={<Link to="/about">About</Link>}
            />
            <main className={style.main}>
                {projects.map((project) => {
                    return (
                        <Thumbnail
                            ref={addToRefs}
                            key={project._id}
                            id={project._id}
                            title={project.title}
                            projectTitle={projectTitle}
                            setProjectTitle={setProjectTitle}
                            complete={complete}
                            slug={project.slug.current}
                            tags={project.tags}
                            thumb={project.thumbnail.asset.fluid}
                        ></Thumbnail>
                    );
                })}
            </main>
        </>
    );
};

export default Home;

const getData = graphql`
    {
        allSanityAbout {
            nodes {
                _rawBio
                cursor {
                    rgb {
                        r
                        g
                        b
                        a
                    }
                }
                exhibition: exhibitionColour {
                    rgb {
                        r
                        g
                        b
                        a
                    }
                }
                illustration: illustrationColour {
                    rgb {
                        r
                        g
                        b
                        a
                    }
                }
                print: printColour {
                    rgb {
                        r
                        g
                        b
                        a
                    }
                }
                publication: publicationColour {
                    rgb {
                        r
                        g
                        b
                        a
                    }
                }
            }
        }
        allSanityProject {
            nodes {
                _id
                title
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
    return cell_size * 0.7;
}
