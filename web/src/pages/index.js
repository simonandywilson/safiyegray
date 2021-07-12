import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import style from "../styles/index.module.css";
import gsap from "gsap";

import Thumbnail from "../components/thumbnail";
import SEO from "../components/seo";
import Footer from "../components/footer";
import useWindowSize from "../hooks/useWindowSize";
import { TransitionLink } from "gatsby-plugin-transitions";
import {
    useStatusContext,
    useStatusUpdateContext,
    usePropertiesContext,
    usePropertiesUpdateContext,
    useSizeContext,
    useSizeUpdateContext,
    useNameUpdateContext,
    useTitleUpdateContext,
    useDateUpdateContext,
} from "../state/store";

let padding = 20;

const Home = () => {
    // Get data
    const {
        allSanityProject: { nodes: projects },
        sanitySeo: seo,
    } = useStaticQuery(getData);

    // Context
    const status = useStatusContext();
    const setStatus = useStatusUpdateContext();
    const properties = usePropertiesContext();
    const setProperties = usePropertiesUpdateContext();
    const size = useSizeContext();
    const setSize = useSizeUpdateContext();
    const setName = useNameUpdateContext();
    const setTitle = useTitleUpdateContext();
    const setDate = useDateUpdateContext();

    const [clicked, setClicked] = useState(null);

    // Window size
    const hasWindow = typeof window !== "undefined";
    const windowSize = useWindowSize();
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;

    // Set header info
    useEffect(() => {
        setName("Safiye Gray");
        setTitle(null);
        setDate(null);
    }, [setName, setTitle, setDate]);

    // Add useRef to each <Thumbnail>
    const projectRefs = useRef([]);
    projectRefs.current = [];
    const thumbnails = [];
    const addToRefs = (el) => {
        if (el && !projectRefs.current.includes(el)) {
            projectRefs.current.push(el);
        }
    };

    // Animation controller
    useEffect(() => {
        if (status === "initial") {
            initial();
        }

        if (status === "spread") {
            spread();
        }

        if (status === "load") {
            load();
        }

        if (status === "leave") {
            leave();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    useEffect(() => {
        if (status === "resizing") {
            const interval = setInterval(() => centre(), 100);
            return () => {
                clearInterval(interval);
            };
        }
    }, [status]);

    useEffect(() => {
        if (hasWindow) {
            let timer;
            const resizeStarted = () => {};
            const resizing = () => {
                setStatus("resizing");
            };
            const resizeEnded = () => {
                setStatus("spread");
            };
            const handleResize = () => {
                resizing();
                if (typeof timer == "undefined") resizeStarted();
                clearTimeout(timer);
                timer = setTimeout(() => {
                    timer = undefined;
                    resizeEnded();
                }, 1000);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const centre = () => {
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
    };

    const initial = () => {
        const timeline = gsap.timeline({
            onComplete: function () {
                setStatus("spread");
            },
        });

        timeline.set(projectRefs.current, {
            scale: 2,
            x: (index, target) => {
                let left = windowWidth / 2 - target.offsetWidth / 2;
                return left;
            },
            y: (index, target) => {
                let top = 0 - target.offsetHeight * 2;
                return top;
            },
            // rotation: "random(-10, 10)",
            repeatRefresh: true,
        });

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
            stagger: 0.25,
            delay: 0.5,
        });
    };

    const spread = () => {
        let counter = 0;
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
                if (counter === projectRefs.current.length && counter === thumbnails.length) {
                    position();
                }
            } else {
                requestAnimationFrame(function () {
                    placeImage(image);
                });
            }
        }
    };

    const position = () => {
        setProperties([]);
        for (const thumb of thumbnails) {
            const timeline = gsap.timeline({
                onComplete: function () {
                    setProperties((oldProperties) => [
                        ...oldProperties,
                        { id: thumb.id, left: thumb.left, top: thumb.top },
                    ]);
                },
            });
            timeline.to(thumb.element, {
                duration: 2.5,
                ease: "Power3.easeOut",
                x: thumb.left,
                y: thumb.top,
            });
        }
        setStatus("complete");
        setSize({ width: windowWidth, height: windowHeight });
    };

    const load = () => {
        if (windowWidth === size.width && windowHeight === size.height) {
            projectRefs.current.forEach((thumb) => {
                const result = properties.find(({ id }) => id === thumb.id);
                gsap.set(thumb, {
                    autoAlpha: 0,
                    x: result.left,
                    y: result.top,
                    rotation: "random(-10, 10)",
                    scale: 0.2,
                });
            });
            gsap.to(projectRefs.current, {
                duration: 1,
                scale: 0.75,
                autoAlpha: 1,
                rotation: "random(-10, 10)",
                stagger: 0.1,
            });
        } else {
            gsap.set(projectRefs.current, {
                autoAlpha: 1,
                scale: 0.75,
                rotation: "random(-10, 10)",
                repeatRefresh: true,
                x: (index, target) => {
                    let left = window.innerWidth / 2 - target.offsetWidth / 2;
                    return left;
                },
                y: (index, target) => {
                    let top = window.innerHeight / 2 - target.offsetHeight / 2;
                    return top;
                },
            });
            spread();
        }
    };

    const leave = () => {
        if (clicked) {
            const selected = projectRefs.current.find(({ id }) => id === clicked);
            const notSelected = projectRefs.current.filter(({ id }) => id !== clicked);
            const timeline = gsap.timeline();
            timeline.to(notSelected, {
                duration: 0.5,
                scale: 0,
                rotation: "random(-10, 10)",
                stagger: 0.05,
            });
            timeline.to(selected, {
                duration: 0.3,
                scale: 0,
            });
        } else {
            gsap.to(projectRefs.current, {
                duration: 0.5,
                scale: 0,
                rotation: "random(-10, 10)",
                stagger: 0.05,
            });
        }
    };

    return (
        <>
            <SEO
                metatitle={seo.title}
                metadescription={seo.description}
                metabanner={seo.banner.asset.fixed}
            />
            <main className={style.main}>
                {projects.map((project, index) => {
                    return (
                        <TransitionLink
                            key={project._id + index}
                            to={project.slug.current}
                            leave={{
                                opacity: 0,
                                config: {
                                    duration: 750,
                                },
                                onStart: () => {
                                    setStatus("leave");
                                    setClicked(project._id);
                                },
                                onRest: () => {
                                    setStatus("load");
                                },
                            }}
                            enter={{
                                opacity: 0,
                                config: {
                                    duration: 500,
                                },
                            }}
                            usual={{
                                transform: 0,
                            }}
                            mode="successive"
                        >
                            <Thumbnail
                                ref={addToRefs}
                                id={project._id}
                                title={project.title}
                                date={project.date}
                                status={status}
                                tags={project.tags}
                                thumb={project.thumbnail.asset.fluid}
                            ></Thumbnail>
                        </TransitionLink>
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
