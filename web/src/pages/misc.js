import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { useNameUpdateContext, useTitleUpdateContext, useDateUpdateContext } from "../state/store";
import style from "../styles/project.module.css";
import { SwiperSlide } from "swiper/react";
import PortableText from "@sanity/block-content-to-react";
import "swiper/swiper.scss";

import SEO from "../components/seo";
import Slide from "../components/slide";
import Slider from "../components/slider";
import { TransitionLink } from "gatsby-plugin-transitions";

const Misc = ({ data }) => {
    const sketchbook = data.sanitySketchbook;

    // Set header info
    const setName = useNameUpdateContext();
    const setTitle = useTitleUpdateContext();
    const setDate = useDateUpdateContext();
    useEffect(() => {
        setName(
            <TransitionLink
                data-tag={"link"}
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46.65"
                    height="26.68"
                    viewBox="0 0 46.65 26.68"
                    stroke="var(--title-colour)"
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
            </TransitionLink>
        );
        setTitle("");
        setDate("");
    }, [setName, setTitle, setDate]);

    return (
        <>
            <SEO
                metatitle={sketchbook.title}
                metadescription={sketchbook.meta}
                metabanner={sketchbook.images[0].asset.fluid}
            />
            <main className={style.main}>
                <Slider>
                    {sketchbook.images.map((image) => {
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
                    {sketchbook.description && (
                        <PortableText
                            className={style.text}
                            blocks={sketchbook.description}
                            renderContainerOnSingleChild={true}
                        />
                    )}
                </footer>
            </main>
        </>
    );
};

export const query = graphql`
    {
        sanitySketchbook {
            title
            description: _rawDescription
            meta
            images {
                _key
                size
                rotate
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

export default Misc;
