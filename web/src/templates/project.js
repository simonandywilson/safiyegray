import React, { useEffect, useRef } from "react";
import { graphql } from "gatsby";
import PortableText from "@sanity/block-content-to-react";
import {
    useLeftUpdateContext,
    useCentreUpdateContext,
    useRightUpdateContext,
    useDescriptionUpdateContext,
} from "../state/store";
import style from "../styles/project.module.css";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import gsap from "gsap"
import useWindowSize from "../hooks/useWindowSize";

import SEO from "../components/seo";
import Slide from "../components/slide";
import Slider from "../components/slider";
import Underline from "../components/underline";
import Tag from "../components/tag";

const Project = ({ data }) => {
    const project = data.sanityProject;

    // Get window size
    const hasWindow = typeof window !== "undefined";
    const windowSize = useWindowSize();
    const windowWidth = windowSize.width;
    const windowHeight = windowSize.height;

    // Set header info
    const setHome = useLeftUpdateContext();
    const setTitle = useCentreUpdateContext();
    const setDate = useRightUpdateContext();
    const setDescription = useDescriptionUpdateContext();
    useEffect(() => {
        setHome(<Underline to={"/"} link={"Home"} gatsbyLink={true} />);
        setTitle(project.title);
        setDate(project.date);
        setDescription(null);
    }, [
        setHome,
        setTitle,
        setDate,
        setDescription,
        project.title,
        project.date,
        project.description,
    ]);

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
    }, []);

    return (
        <>
            <SEO
                metatitle={project.title}
                metadescription={project.meta}
                metabanner={project.thumbnail.asset.fixed}
            />
            <div className={style.tagsContainer}>
                {project.tags.map((tag, index) => {
                    console.log(tag);
                    return (
                        <Tag key={index} ref={addToRefs} tag={tag} complete={true}/>
                    );
                })}
            </div>
            <main className={style.main}>
                <Slider>
                    {project.images.map((image) => {
                        return (
                            <SwiperSlide key={image._key}>
                                <Slide
                                    title={image.title}
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
                    <PortableText
                        className={style.text}
                        blocks={project.description}
                        renderContainerOnSingleChild={true}
                    />
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
                title
                rotate
                size
                alt
                asset {
                    fluid {
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
