export default {
    title: "Image",
    name: "extra",
    type: "image",
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string",
            options: {
                isHighlighted: true,
            },
        },
        {
            title: "Alternative Text",
            name: "alt",
            type: "string",
            description: "Important for SEO and accessibility.",
            options: {
                isHighlighted: true,
            },
            validation: (Rule) => Rule.required().warning(`Image alt is required.`),
        },
    ],
};
