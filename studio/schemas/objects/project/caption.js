import { BiRevision } from "react-icons/bi";

export default {
    title: "Image",
    name: "caption",
    type: "image",
    fields: [
        {
            title: "Rotate",
            name: "rotate",
            type: "boolean",
            description: "Is the image allowed to rotate?",
            options: {
                isHighlighted: true,
            },
            initialValue: false,
        },
        {
            title: "Image Size",
            name: "size",
            type: "string",
            options: {
                list: [
                    { title: "Small", value: "s" },
                    { title: "Medium", value: "m" },
                    { title: "Large", value: "l" },
                ],
                layout: "radio",
                direction: "horizontal",
                isHighlighted: true,
            },
            initialValue: "s",
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
            title: "alt",
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
