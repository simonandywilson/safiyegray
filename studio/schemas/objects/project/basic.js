export default {
    title: "Image",
    name: "basic",
    type: "image",
    fields: [
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
    preview: {
        select: {
            media: "asset",
            subtitle: "alt",
        },
        prepare(selection) {
            const { media, subtitle } = selection;
            return {
                title: "Installation View",
                media: media,
                subtitle: subtitle,
            };
        },
    },
};