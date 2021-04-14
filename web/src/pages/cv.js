import React, { useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { useNameUpdateContext, useTitleUpdateContext, useDateUpdateContext } from "../state/store";
import gsap from "gsap";
import style from "../styles/cv.module.css";
import PortableText from "@sanity/block-content-to-react";
import SEO from "../components/seo";
import Links from "../components/links";

const CV = () => {
    // Get data
    const { sanityAbout: about } = useStaticQuery(getData);
    // Set header info
    const setName = useNameUpdateContext();
    const setTitle = useTitleUpdateContext();
    const setDate = useDateUpdateContext();
    useEffect(() => {
        setName(<Links to={"/"} link={"Home"} gatsbyLink={true} />);
        setTitle(null);
        setDate(null);
    }, [setName, setTitle, setDate]);

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
                metabanner={about.portrait.asset.fluid}
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
                                <div className={style.titleContainer}>
                                    <div className={style.title}>{category.title}</div>
                                </div>

                                {category.content.map((item) => {
                                    return (
                                        <div key={item._key} className={style.item}>
                                            <div className={style.date}>{item.date}</div>
                                            <div>
                                                <div>{item.title}</div>
                                                <div>{item.subtitle}</div>
                                                <div className={style.label}>{item.label}</div>
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