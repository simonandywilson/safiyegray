import React, { useState, useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import style from "../styles/index.module.css";
import gsap from "gsap";

import Header from "../components/header";
import SEO from "../components/seo";
import Thumbnail from "../components/thumbnail";

import useWindowSize from "../hooks/useWindowSize";

const Home = () => {

    // Get thumbnails
    const {
        allSanityProject: { nodes: projects },
    } = useStaticQuery(getData);

    const { height, width } = useWindowSize();
    const viewWidth = width;
    const viewHeight = height;
    
    let counter = 0;
    let t;

    const [state, setState] = useState({
        initial: true,
    });

    // Add useRef to each <Thumbnail>
    const projectRefs = useRef([]);
    projectRefs.current = [];

    const thumbnails = [];


    const addToRefs = (el) => {
        if (el && !projectRefs.current.includes(el)) {
            projectRefs.current.push(el);
        }
    };

    // Initial fade in
    useEffect(() => {
        if (state.initial === true) {
            const timeline = gsap.timeline({
                onComplete: function () {
                    setState({ ...state, initial: false });
                },
            });
            timeline.set(projectRefs.current, {
                scale: 1,
                x: (index, target) => {
                    let left = viewWidth / 2 - target.offsetWidth / 2;
                    return left;
                },
                y: (index, target) => {
                    let top = viewHeight / 2 - target.offsetHeight / 2;
                    return top;
                },
                rotation: "random(-10, 10)",
                repeatRefresh: true,
            });

            // Stack animation
            timeline.to(projectRefs.current, {
                duration: 1,
                opacity: 1,
                scale: 0.75,
                x: (index, target) => {
                    let left = viewWidth / 2 - target.offsetWidth / 2;
                    let randomX = left + random(-30, 30);
                    return randomX;
                },
                y: (index, target) => {
                    let top = viewHeight / 2 - target.offsetHeight / 2;
                    let randomY = top + random(-30, 30);
                    return randomY;
                },
                rotation: "random(-10, 10)",
                repeatRefresh: true,
                stagger: 0.2,
            });
        }
    }, [state.initial]);

    useEffect(() => {
        const padding = 15;
        if (state.initial === false) {
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
                image.left = randomInt(padding, viewWidth - (image.width + padding));
                image.top = randomInt(padding, viewHeight - (image.height + padding));
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
                            ease: "Power4.easeOut",
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
    }, [state.initial]);

    return (
        <>
            <SEO />
            <Header />
            <main className={style.main}>
                {projects.map((project) => {
                    return (
                        <Thumbnail
                            className={style.test}
                            ref={addToRefs}
                            key={project._id}
                            thumb={project.thumbnail.asset.fluid}
                            title={project.title}
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
        allSanityProject {
            nodes {
                _id
                title
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

const padding = 15;

// Maths
function intersects(image, thumb) {
    return !(thumb.left > image.right + padding ||
        thumb.right < image.left - padding ||
        thumb.top > image.bottom + padding ||
        thumb.bottom < image.top - padding);
};

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

// function sizer(x, y, n) {
//     // Compute number of rows and columns, and cell size
//     const ratio = x / y;
//     const ncols_float = Math.sqrt(n * ratio);
//     const nrows_float = n / ncols_float;

//     // Find best option filling the whole height
//     let nrows1 = Math.ceil(nrows_float);
//     let ncols1 = Math.ceil(n / nrows1);
//     while (nrows1 * ratio < ncols1) {
//         nrows1++;
//         ncols1 = Math.ceil(n / nrows1);
//     }
//     const cell_size1 = y / nrows1;

//     // Find best option filling the whole width
//     let ncols2 = Math.ceil(ncols_float);
//     let nrows2 = Math.ceil(n / ncols2);
//     while (ncols2 < nrows2 * ratio) {
//         ncols2++;
//         nrows2 = Math.ceil(n / ncols2);
//     }
//     const cell_size2 = x / ncols2;

//     // Find the best values
//     let nrows, ncols, cell_size;
//     if (cell_size1 < cell_size2) {
//         nrows = nrows2;
//         ncols = ncols2;
//         cell_size = cell_size2;
//     } else {
//         nrows = nrows1;
//         ncols = ncols1;
//         cell_size = cell_size1;
//     }
//     return cell_size;
// }
