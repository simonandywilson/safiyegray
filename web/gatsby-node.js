const path = require("path");

// Create project pages dynamically
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        query getProjects {
            projects: allSanityProject {
                nodes {
                    slug {
                        current
                    }
                }
            }
        }
    `);
    result.data.projects.nodes.forEach((project) => {
        createPage({
            path: `${project.slug.current}`,
            component: path.resolve(`src/templates/project.js`),
            context: { slug: project.slug.current },
        });
    });
};
