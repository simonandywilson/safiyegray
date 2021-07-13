import React, { useEffect, useRef } from "react";
import { graphql } from "gatsby";
import PortableText from "@sanity/block-content-to-react";
import { TransitionLink } from "gatsby-plugin-transitions";
import { useNameUpdateContext, useTitleUpdateContext, useDateUpdateContext } from "../state/store";
import style from "../styles/project.module.css";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import gsap from "gsap";
import useWindowSize from "../hooks/useWindowSize";

import SEO from "../components/seo";
import Slide from "../components/slide";
import Slider from "../components/slider";
import Tag from "../components/tag";

const Project = ({ data }) => {
    const project = data.sanityProject;

    // Get window size
    const windowSize = useWindowSize();
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;

    // Set header info
    const setName = useNameUpdateContext();
    const setTitle = useTitleUpdateContext();
    const setDate = useDateUpdateContext();
    useEffect(() => {
        setName(
            <TransitionLink
                to={"/"}
                leave={{
                    opacity: 0,
                    config: {
                        duration: 500,
                    },
                }}
                enter={{
                    opacity: 0,
                    config: {
                        duration: 500,
                    },
                }}
                usual={{
                    opacity: 1,
                }}
                mode="immediate"
            >
                <span className={style.svg} data-tag={"link"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46.65"
                        height="26.68"
                        viewBox="0 0 46.65 26.68"
                    >
                        <polyline
                            points="14.75 25.26 2.83 13.34 14.75 1.41"
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="4"
                        />
                        <line
                            x1="2.83"
                            y1="13.34"
                            x2="46.65"
                            y2="13.34"
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="4"
                        />
                    </svg>
                </span>
            </TransitionLink>
        );
        setTitle(project.title);
        setDate(project.date);
    }, [setName, setTitle, setDate, project.title, project.date]);

    // Add refs to each tag
    const tagRefs = useRef([]);
    tagRefs.current = [];
    const addToRefs = (el) => {
        if (el && !tagRefs.current.includes(el)) {
            tagRefs.current.push(el);
        }
    };

    // Animate dots in and out
    useEffect(() => {
        if (tagRefs.current.length > 0) {
            gsap.set(tagRefs.current, {
                scale: 0,
                x: (index, target) => {
                    let left = randomise(target.offsetWidth, windowWidth) - target.offsetWidth;
                    return left;
                },
                y: (index, target) => {
                    let top = randomise(target.offsetWidth, windowHeight) - target.offsetHeight;
                    return top;
                },
            });
            gsap.to(tagRefs.current, {
                scale: 0.75,
                stagger: {
                    each: 0.25,
                    from: "random",
                    grid: "auto",
                    ease: "power2.inOut",
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <SEO
                title={project.title}
                description={project.meta}
                banner={project.thumbnail.asset.fixed.src}
            />
            <div className={style.tagsContainer}>
                {project.tags.map((tag, index) => {
                    return <Tag key={index} ref={addToRefs} tag={tag} complete={true} />;
                })}
            </div>
            <main className={style.main}>
                <Slider>
                    {project.images.map((image) => {
                        return (
                            <SwiperSlide key={image._key}>
                                <Slide
                                    size={image.size}
                                    rotate={image.rotate}
                                    alt={image.alt}
                                    image={image.asset.fluid}
                                    aspectRatio={image.asset.fluid.aspectRatio}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Slider>
                <footer className={style.footer}>
                    {project.description && (
                        <PortableText
                            className={style.text}
                            blocks={project.description}
                            renderContainerOnSingleChild={true}
                        />
                    )}
                </footer>
            </main>
        </>
    );
};

export const query = graphql`
    query getSingleProject($slug: String) {
        sanityProject(slug: { current: { eq: $slug } }) {
            title
            date(formatString: "YYYY")
            tags
            description: _rawDescription
            thumbnail {
                asset {
                    fixed(height: 630, width: 1200) {
                        ...GatsbySanityImageFixed
                    }
                }
            }
            meta
            images {
                _key
                rotate
                size
                alt
                asset {
                    fluid(maxWidth: 2000) {
                        ...GatsbySanityImageFluid
                        aspectRatio
                    }
                }
            }
        }
    }
`;

export default Project;

function randomise(min, max) {
    return Math.random() * (max - min) + min;
}
