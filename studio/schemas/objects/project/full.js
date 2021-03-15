export default {
    title: "Image",
    name: "full",
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
            title: "Materials",
            name: "materials",
            type: "string",
            options: {
                isHighlighted: true,
            },
        },
        {
            title: "Dimensions",
            name: "dimensions",
            type: "string",
            description: "Seperate dimensions with × rather than the letter x.",
            options: {
                isHighlighted: true,
            },
        },
        {
            title: "Date",
            name: "date",
            type: "date",
            options: {
                isHighlighted: true,
                dateFormat: "yyyy",
            },
        },
        {
            title: "Image Size",
            name: "size",
            type: "string",
            description: "Select whether the image spans over one or two columns.",
            options: {
                list: ["Small", "Large"],
                layout: "radio",
                direction: "horizontal",
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
    preview: {
        select: {
            title: "title",
            media: "asset",
            subtitle: "size",
        },
        prepare(selection) {
            const { title, media, subtitle } = selection;
            return {
                title: title,
                media: media,
                subtitle: subtitle,
            };
        },
    },
};
