export default {
    title: "SEO",
    name: "seo",
    type: "document",
    __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    fields: [
        {
            // Site Title
            title: "Site Title",
            name: "title",
            type: "string",
            description: "Appears in browser window & search engine results.",
            validation: (Rule) => [Rule.required().warning(`Your page needs a Title.`)],
        },
        {
            // Site Decription
            title: "Site Description",
            name: "description",
            type: "text",
            description: "Appears in search engine results.",
            validation: (Rule) => [
                Rule.required().warning(`Your page needs a description.`),
                Rule.min(50).warning(`Your site description should be a minimum of 50 characters.`),
                Rule.max(155).warning(
                    `Your site description should be a maximum of 155 characters.`
                ),
            ],
        },
        {
            title: "Social Banner",
            name: "banner",
            type: "image",
            description:
                "Appears when website is shared on social media (Facebook, Twitter, LinkedIn, Slack etc.). Image will be cropped to 1200×630px",
        },
    ],
};
