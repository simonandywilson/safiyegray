import React, { useRef } from "react";
import { graphql } from "gatsby";
// import gsap from "gsap";
import Image from "../components/image";
import style from "../styles/project.module.css";
import { Link } from "gatsby";
import Nav from "../components/nav";
import PortableText from "@sanity/block-content-to-react";
// import Cursor from "../components/cursor";

const Project = ({ data }) => {
    const project = data.sanityProject;
    const sliderRef = useRef(null);

    // useEffect(() => {
    //     setTimeout(
    //         () =>
    //             gsap.set(sliderRef.current, {
    //                 scrollSnapType: "x mandatory"
    //             }),
    //         3000
    //     );
    // }, []);

    return (
        <>
            {/* <Cursor /> */}
            <Nav
                link={
                    <Link to="/">
                        Home
                    </Link>
                }
                title={project.title}
                date={project.date}
                description={
                    <PortableText
                        className={style.text}
                        blocks={project.description}
                        renderContainerOnSingleChild={true}
                    />
                }
            />
            <main className={style.container}>
                <div className={style.slider} ref={sliderRef}>
                    {project.images.map((image) => {
                        return (
                            <Image
                                key={image._key}
                                title={image.title}
                                size={image.size}
                                rotate={image.rotate}
                                alt={image.alt}
                                image={image.asset.fluid}
                                aspectRatio={image.asset.fluid.aspectRatio}
                            />
                        );
                    })}
                    <div className={style.spacer}>&nbsp;</div>
                </div>
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
