export default {
    title: "Image",
    name: "caption",
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
            title: "Image Size",
            name: "size",
            type: "string",
            description: "Select whether the image spans over one or two columns.",
            options: {
                list: [
                    { title: "Extra Small", value: "xs" },
                    { title: "Small", value: "s" },
                    { title: "Medium", value: "m" },
                    { title: "Large", value: "l" },
                    { title: "Extra Large", value: "xl" },
                ],
                isHighlighted: true,
            },
            validation: (Rule) => Rule.required().warning(`Image size is required.`),
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
