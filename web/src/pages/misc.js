import React, {useEffect} from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { useNameUpdateContext, useTitleUpdateContext, useDateUpdateContext } from "../state/store";
import style from "../styles/cv.module.css";
import Links from "../components/links";

const Misc = () => {
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

    return (
        <main className={style.grid}>
        </main>
    );
};

export default Misc;

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
                    subtitle
                    label
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
