import React, { useEffect } from "react";
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

import SEO from "../components/seo"
import Slide from "../components/slide";
import Slider from "../components/slider";
import Underline from "../components/underline"

const Project = ({ data }) => {
    const project = data.sanityProject;

    // Set header info
    const setHome = useLeftUpdateContext();
    const setTitle = useCentreUpdateContext();
    const setDate = useRightUpdateContext();
    const setDescription = useDescriptionUpdateContext();
    useEffect(() => {
        setHome(<Underline to={"/"} link={"Home"} gatsbyLink={true} />);
        setTitle(project.title);
        setDate(project.date);
        setDescription(
            null
        );
    }, [setHome, setTitle, setDate, setDescription, project.title, project.date, project.description]);

    return (
        <>
        <SEO
                metatitle={project.title}
                metadescription={project.meta}
                metabanner={project.thumbnail.asset.fixed}
            />
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
