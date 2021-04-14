import React, {useEffect} from "react";
import { useStaticQuery, graphql } from "gatsby";
import Cursor from "./cursor";
import Header from "./header";

const Static = () => {
    // Get data
    const {
        sanitySettings: settings,
    } = useStaticQuery(getData);

    // Set colours & padding
    useEffect(() => {
            const cursor = settings.cursor.rgb;
            const highlight = settings.highlight.rgb;
            const illustration = settings.illustration.rgb;
            const print = settings.print.rgb;
            const exhibition = settings.exhibition.rgb;
            const publication = settings.publication.rgb;

            document.documentElement.style.setProperty(
                "--cursor-colour",
                `rgba(${cursor.r}, ${cursor.g}, ${cursor.b}, ${cursor.a})`
            );
            document.documentElement.style.setProperty(
                "--highlight-colour",
                `rgba(${highlight.r}, ${highlight.g}, ${highlight.b}, ${highlight.a})`
            );
            document.documentElement.style.setProperty(
                "--illustration-colour",
                `rgba(${illustration.r}, ${illustration.g}, ${illustration.b}, ${illustration.a})`
            );
            document.documentElement.style.setProperty(
                "--print-colour",
                `rgba(${print.r}, ${print.g}, ${print.b}, ${print.a})`
            );
            document.documentElement.style.setProperty(
                "--exhibition-colour",
                `rgba(${exhibition.r}, ${exhibition.g}, ${exhibition.b}, ${exhibition.a})`
            );
            document.documentElement.style.setProperty(
                "--publication-colour",
                `rgba(${publication.r}, ${publication.g}, ${publication.b}, ${publication.a})`
            );
    }, []);

    return (
        <>
            <Cursor />
            <Header />
        </>
    );
};

export default Static;

const getData = graphql`
    {
        sanitySettings {
            cursor {
                rgb {
                    r
                    g
                    b
                    a
                }
            }
            highlight {
                rgb {
                    r
                    g
                    b
                    a
                }
            }
            illustration {
                rgb {
                    r
                    g
                    b
                    a
                }
            }
            publication {
                rgb {
                    r
                    g
                    b
                    a
                }
            }
            print {
                rgb {
                    r
                    g
                    b
                    a
                }
            }
            exhibition {
                rgb {
                    r
                    g
                    b
                    a
                }
            }
        }
    }
`;
