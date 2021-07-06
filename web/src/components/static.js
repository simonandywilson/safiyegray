import React, { useEffect, useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Cursor from "./cursor";
import Header from "./header";

const Static = () => {
    // Get data
    const { sanitySettings: settings, allSanityProject: totalCount } = useStaticQuery(getData);
    const hasWindow = typeof window !== "undefined";

    // Set colours
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

    // Set size of thumbnails
    // useEffect(() => {
    //     if (hasWindow) {
    //         const resizer = () => {
    //             console.log("resized");
    //             const [height, width] = sizer(
    //                 window.innerWidth,
    //                 window.innerHeight,
    //                 totalCount.totalCount
    //             );
    //             document.documentElement.style.setProperty(
    //                 "--thumbnail-height",
    //                 `${Math.round(height)}px`
    //             );
    //             document.documentElement.style.setProperty(
    //                 "--thumbnail-width",
    //                 `${Math.round(width)}px`
    //             );
    //         };
    //         window.addEventListener("resize", resizer());
    //         return () => window.removeEventListener("resize", resizer());
    //     }
    // }, []);

    const setThumbSize = useCallback(() => {
        if (hasWindow) {
            const [height, width] = sizer(
                window.innerWidth,
                window.innerHeight,
                totalCount.totalCount
            );
            document.documentElement.style.setProperty(
                "--thumbnail-height",
                `${Math.round(height)}px`
            );
            document.documentElement.style.setProperty(
                "--thumbnail-width",
                `${Math.round(width)}px`
            );
        }
        
    }, []);

    setThumbSize()

    useEffect(() => {
        if (hasWindow) {
            window.addEventListener("resize", setThumbSize);

            return () => {
                window.removeEventListener("resize", setThumbSize);
            };
        }
    }, [setThumbSize]);

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
        allSanityProject {
            totalCount
        }
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

function sizer(x, y, n) {
    // Compute number of rows and columns, and cell size
    const ratio = x / y;
    const ncols_float = Math.sqrt(n * ratio);
    const nrows_float = n / ncols_float;

    // Find best option filling the whole height
    let nrows1 = Math.ceil(nrows_float);
    let ncols1 = Math.ceil(n / nrows1);
    while (nrows1 * ratio < ncols1) {
        nrows1++;
        ncols1 = Math.ceil(n / nrows1);
    }
    const cell_size1 = y / nrows1;

    // Find best option filling the whole width
    let ncols2 = Math.ceil(ncols_float);
    let nrows2 = Math.ceil(n / ncols2);
    while (ncols2 < nrows2 * ratio) {
        ncols2++;
        nrows2 = Math.ceil(n / ncols2);
    }
    const cell_size2 = x / ncols2;

    // Find the best values
    // eslint-disable-next-line no-unused-vars
    let nrows, ncols, cell_size;
    if (cell_size1 < cell_size2) {
        nrows = nrows2;
        ncols = ncols2;
        cell_size = cell_size2;
    } else {
        nrows = nrows1;
        ncols = ncols1;
        cell_size = cell_size1;
    }

    let height = cell_size;
    let width = cell_size * 0.6;
    return [height, width];
}
