import React, { useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { useNameUpdateContext, useTitleUpdateContext } from "../state/store";
import gsap from "gsap";
import style from "../styles/cv.module.css";
import PortableText from "@sanity/block-content-to-react";
import SEO from "../components/seo";
import { TransitionLink } from "gatsby-plugin-transitions";

const CV = () => {
    // Get data
    const { sanityAbout: about } = useStaticQuery(getData);
    // Set header info
    const setName = useNameUpdateContext();
    const setTitle = useTitleUpdateContext();
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
        setTitle("")
    }, [setName, setTitle]);

    let portraitRef = useRef(null);

    useEffect(() => {
        gsap.to(portraitRef, {
            rotation: "random(-5, 5)",
            duration: 3,
        });
    }, []);

    return (
        <>
            <SEO
                metatitle={about.title}
                metadescription={about.meta}
                metabanner={about.portrait.asset.fluid.src}
            />
            <main className={style.main}>
                <div className={style.left}>
                    <div className={style.portrait} ref={(el) => (portraitRef = el)}>
                        <Image
                            fluid={{
                                ...about.portrait.asset.fluid,
                                aspectRatio: 0.7,
                            }}
                            durationFadeIn={1000}
                        />
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.bio}>
                        <PortableText className={style.text} blocks={about._rawBio} />
                    </div>
                    {about.cv.map((category) => {
                        return (
                            <section className={style.section} key={category._key}>
                                {category.content.map((item) => {
                                    return (
                                        <div key={item._key} className={style.item}>
                                            <div>
                                                <div>{item.title}</div>
                                                <div>{item.subtitle}</div>
                                                <div className={style.label}>{item.label}</div>
                                                <div className={style.date}>{item.date}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </section>
                        );
                    })}
                </div>
            </main>
        </>
    );
};

export default CV;

const getData = graphql`
    {
        sanityAbout {
            title
            _rawBio
            meta
            portrait {
                asset {
                    fluid(maxWidth: 1000) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
            cv {
                _key
                title
                content {
                    _key
                    title
                    subtitle
                    label
                    date
                }
            }
        }
    }
`;