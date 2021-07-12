import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { TransitionLink } from "gatsby-plugin-transitions";
import style from "../styles/footer.module.css";
import {
    useStatusUpdateContext,
} from "../state/store";

const Footer = () => {
    const { sanityAbout: cv, sanitySketchbook: sketchbook } = useStaticQuery(getData);
    const setStatus = useStatusUpdateContext();
    return (
        <footer className={style.footer}>
            <div className={style.left} data-tag={"link"}>
                <TransitionLink
                    to={"/cv"}
                    leave={{
                        opacity: 0,
                        config: {
                            duration: 750,
                        },
                        onStart: () => {
                            setStatus("leave");
                        },
                        onRest: () => {
                            setStatus("load");
                        },
                    }}
                    enter={{
                        opacity: 0,
                        config: {
                            duration: 500,
                        },
                    }}
                    usual={{
                        transform: 0,
                    }}
                    mode="successive"
                >
                    {cv.title}
                </TransitionLink>
            </div>
            <div className={style.right} data-tag={"link"}>
                <TransitionLink
                    to={"/misc"}
                    leave={{
                        opacity: 0,
                        config: {
                            duration: 750,
                        },
                        onStart: () => {
                            setStatus("leave");
                        },
                        onRest: () => {
                            setStatus("load");
                        },
                    }}
                    enter={{
                        opacity: 0,
                        config: {
                            duration: 500,
                        },
                    }}
                    usual={{
                        transform: 0,
                    }}
                    mode="successive"
                >
                    {sketchbook.title}
                </TransitionLink>
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
