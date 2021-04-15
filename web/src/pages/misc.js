import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { useNameUpdateContext, useTitleUpdateContext, useDateUpdateContext } from "../state/store";
import style from "../styles/project.module.css";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";

import SEO from "../components/seo";
import Slide from "../components/slide";
import Slider from "../components/slider";
import Underline from "../components/links";

const Misc = ({ data }) => {
    const sketchbook = data.sanitySketchbook;

    // Set header info
    const setName = useNameUpdateContext();
    const setTitle = useTitleUpdateContext();
    const setDate = useDateUpdateContext();
    useEffect(() => {
        setName(<Underline to={"/"} link={"←"} gatsbyLink={true} />);
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
            </main>
        </>
    );
};

export const query = graphql`
    {
        sanitySketchbook {
            title
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
