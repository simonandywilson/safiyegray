import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const SEO = (props) => {
    const {
        site: {
            siteMetadata: { siteUrl },
        },
        sanitySeo: { defaultTitle, defaultDescription, defaultImage },
    } = useStaticQuery(getData);
    const { pathname } = useLocation();

    const seo = {
        title: props.title || defaultTitle,
        description: props.description || defaultDescription,
        image: props.image || defaultImage.asset.url,
        url: `${siteUrl}${pathname}`,
    };

    return (
        <Helmet
            title={props.title}
            titleTemplate={`%s · ${defaultTitle}`}
            defaultTitle={defaultTitle}
        >
            <html lang="en" />
            {seo.title && <meta name="title" content={seo.title} />}
            {seo.description && <meta name="description" content={seo.description} />}

            <meta property="og:type" content="website" />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && <meta property="og:description" content={seo.description} />}
            {seo.image && <meta property="og:image" content={seo.image} />}

            <meta property="twitter:card" content="summary_large_image" />
            {seo.url && <meta property="twitter:url" content={seo.url} />}
            {seo.title && <meta property="twitter:title" content={seo.title} />}
            {seo.description && <meta property="twitter:description" content={seo.description} />}
            {seo.image && <meta property="twitter:image" content={seo.image} />}
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
        sanitySeo {
            defaultTitle: title
            defaultDescription: description
            defaultImage: banner {
                asset {
                    url
                }
            }
        }
    }
`;
