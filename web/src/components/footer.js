import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import style from "../styles/footer.module.css";
import Links from "../components/links";

const Footer = () => {
    const { sanityAbout: cv, sanitySketchbook: sketchbook } = useStaticQuery(getData);
    return (
        <footer className={style.footer}>
            <div className={style.left}>
                <Links to={"/cv"} link={cv.title} gatsbyLink={true} />
            </div>
            <div className={style.right}>
                <Links to={"/misc"} link={sketchbook.title} gatsbyLink={true} />
            </div>
        </footer>
    );
};

export default Footer;

const getData = graphql`
    {
        sanityAbout {
            title
        },
        sanitySketchbook {
            title
        }
    }
`;
