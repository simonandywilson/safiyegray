import React, { useEffect, useRef } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import {
    useLeftUpdateContext,
    useCentreUpdateContext,
    useRightUpdateContext,
} from "../state/store";
import gsap from "gsap";
import style from "../styles/about.module.css";
import PortableText from "@sanity/block-content-to-react";
import Underline from "../components/underline";

const About = () => {
    // Get data
    const { sanityAbout: about } = useStaticQuery(getData);
    // Set header info
    const setHome = useLeftUpdateContext();
    const setTitle = useCentreUpdateContext();
    const setAbout = useRightUpdateContext();
    useEffect(() => {
        setHome(<Underline to={"/"} link={"Home"} gatsbyLink={true} />);
        setTitle("Safiye Gray");
        setAbout(null);
    }, [setHome, setTitle, setAbout]);

    let portraitRef = useRef(null)

    useEffect(() => {
        gsap.to(portraitRef, {
            rotation: "random(-5, 5)",
            duration: 3,
        });
    }, []);

    return (
        <main className={style.grid}>
            <div className={style.portrait} ref={(el) => (portraitRef = el)}>
                <Image
                    fluid={{
                        ...about.portrait.asset.fluid,
                        aspectRatio: 0.7,
                    }}
                    durationFadeIn={1000}
                />
            </div>
            <div className={style.bio}>
                <PortableText className={style.text} blocks={about._rawBio} />
            </div>
            <div className={style.contact}>
                {about.contact.map((contact) => {
                    return (
                        <Underline
                            key={contact._key}
                            to={contact.link}
                            link={contact.title}
                            gatsbyLink={false}
                        />
                    );
                })}
            </div>
            <div className={style.about}>
                {about.cv.map((category) => {
                    return (
                        <section className={style.section} key={category._key}>
                            <div className={style.title}>{category.title}</div>
                            {category.content.map((item) => {
                                return (
                                    <div key={item._key} className={style.item}>
                                        <div>{item.title}</div>
                                        <div>{item.date}</div>
                                    </div>
                                );
                            })}
                        </section>
                    );
                })}
            </div>
        </main>
    );
};

export default About;

const getData = graphql`
    {
        sanityAbout {
            _rawBio
            portrait {
                asset {
                    fluid {
                        src
                    }
                }
            }
            cv {
                _key
                title
                content {
                    _key
                    title
                    date
                }
            }
            contact {
                _key
                title
                link
            }
        }
    }
`;
