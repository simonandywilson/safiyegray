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
import { Link } from "gatsby";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import Slide from "../components/slide";
import Slider from "../components/slider";

const Project = ({ data }) => {
    const project = data.sanityProject;

    // Set header info
    const setHome = useLeftUpdateContext();
    const setTitle = useCentreUpdateContext();
    const setDate = useRightUpdateContext();
    const setDescription = useDescriptionUpdateContext();
    useEffect(() => {
        setHome(<Link to="/">Home</Link>);
        setTitle(project.title);
        setDate(project.date);
        setDescription(
            <PortableText
                className={style.text}
                blocks={project.description}
                renderContainerOnSingleChild={true}
            />
        );
    }, [setHome, setTitle, setDate, setDescription, project.title, project.date, project.description]);

    return (
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
                                aspectRatio={image.asset.fluid.aspectRatio}Î
                            />
                        </SwiperSlide>
                    );
                })}
            </Slider>
            <footer className={style.footer}>
                Scroll Down
            </footer>
        </main>
    );
};

export const query = graphql`
    query getSingleProject($slug: String) {
        sanityProject(slug: { current: { eq: $slug } }) {
            title
            date(formatString: "YYYY")
            tags
            description: _rawDescription
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
