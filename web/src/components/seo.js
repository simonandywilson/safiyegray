import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const SEO = (props) => {
    const {
        site: {
            siteMetadata: { siteUrl },
        },
    } = useStaticQuery(getData);

    const { pathname } = useLocation();
    let url = `${siteUrl}${pathname}`;

    return (
        <Helmet>
            <html lang="en" />
            {/* Primary Meta Tags */}
            <title>{props.metatitle}</title>
            <meta name="title" content={props.metatitle} />
            <meta name="description" content={props.metadescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={props.metatitle} />
            <meta property="og:description" content={props.metadescription} />
            <meta property="og:image" content={props.metaimage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={props.metatitle} />
            <meta property="twitter:description" content={props.metadescription} />
            <meta property="twitter:image" content={props.metaimage}></meta>
        </Helmet>
    );
};

export default SEO;

const getData = graphql`
    {
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`;
