export default {
    widgets: [
        {
            name: "document-list",
            options: {
                title: "Recent projects",
                order: "_createdAt desc",
                types: ["project"],
                createButtonText: "New Project",
            },
            layout: {
                width: "large",
            },
        },
        {
            name: "project-users",
            layout: {
                width: "small",
            },
        },
        {
            name: "netlify",
            options: {
                title: "Netlify Deployment",
                sites: [
                    {
                        title: "Sanity Studio",
                        apiId: "a4508f25-a1ee-4bf5-a1b9-69cdb8db0075",
                        buildHookId: "6050ef3c346eb30c3f76f5f2",
                        name: "safiyegray-studio",
                    },
                    {
                        title: "Website",
                        apiId: "1e9a2140-330f-4589-a15b-6e0f1851d13f",
                        buildHookId: "6050df69ee00f31b246fff0f",
                        name: "safiyegray-web",
                    },
                ],
            },
        },
    ],
};
