module.exports = {
    siteMetadata: {
        title: "Safiye Gray",
        siteUrl: "https://safiyegray-web.netlify.app",
    },
    plugins: [
        {
            resolve: "gatsby-source-sanity",
            options: {
                projectId: "mre6jo4q",
                dataset: "production",
            },
        },
        "gatsby-plugin-styled-components",
        "gatsby-plugin-layout",
        "gatsby-plugin-sharp",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        "gatsby-transformer-sharp",
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Safiye Gray`,
                short_name: `Safiye Gray`,
                icon: `src/images/favicon.svg`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#ffffff`,
                display: `standalone`,
            },
        },
        "gatsby-plugin-offline",
        "gatsby-plugin-sass",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
    ],
};
