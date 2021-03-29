import { BiRevision } from "react-icons/bi";

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
            title: "Rotate",
            name: "rotate",
            type: "boolean",
            description: "Is the image allowed to rotate?",
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
                    { title: "Small", value: "s" },
                    { title: "Medium", value: "m" },
                    { title: "Large", value: "l" },
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
    initialValue: {
        rotate: false,
    },
    preview: {
        select: {
            title: "title",
            media: "asset",
            subtitle: "size",
            rotate: "rotate",
        },
        prepare(selection) {
            const { title, media, subtitle, rotate } = selection;
            let size;

            switch (subtitle) {
                case "s":
                    size = "Small";
                    break;
                case "m":
                    size = "Medium";
                    break;
                case "l":
                    size = "Large";
                    break;
            }

            return {
                title: title,
                media: media,
                subtitle: !rotate ? size : size + " ⟳",
            };
        },
    },
};
