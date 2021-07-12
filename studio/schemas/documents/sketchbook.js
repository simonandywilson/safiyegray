export default {
    title: "Sketchbook",
    name: "sketchbook",
    type: "document",
    fields: [
        // Title
        {
            title: "Title",
            name: "title",
            type: "string",
        },
        // Description
        {
            title: "Description",
            name: "description",
            type: "description",
            description:
                "Use Shift+Return to add a line break without adding paragraph formatting and spacing.",
        },
        // SEO Description
        {
            title: "SEO Description",
            name: "meta",
            type: "string",
            description:
                "Short description used when this page is shared or displayed in search engine results.",
            validation: (Rule) => [
                Rule.required().warning(`Your page needs a description.`),
                Rule.min(50).warning(`Your page description should be a minimum of 50 characters.`),
                Rule.max(155).warning(
                    `Your page description should be a maximum of 155 characters.`
                ),
            ],
        },
        // Images
        {
            title: "Images",
            name: "images",
            type: "images",
        },
    ],
};
