import { BiPaintRoll } from "react-icons/bi";

export default {
    title: "Project",
    name: "project",
    type: "document",
    fieldsets: [
        {
            name: "info",
            title: "Project Information",
            options: {
                collapsible: true,
                collapsed: false,
                columns: 2,
            },
        },
    ],
    fields: [
        // Title
        {
            title: "Title",
            name: "title",
            type: "string",
            fieldset: "info",
        },
        // Date
        {
            title: "Date",
            name: "date",
            type: "date",
            options: {
                dateFormat: "yyyy",
            },
            fieldset: "info",
        },
        // Slug
        {
            title: "Slug",
            name: "slug",
            type: "slug",
            description: "www.safiyegray.com/<slug>",
            options: {
                source: "title",
                slugify: (input) => input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
            },
            fieldset: "info",
        },
        // Tags
        {
            title: "Tags",
            name: "tags",
            type: "tags",
            fieldset: "info",
        },
        // Thumbnail
        {
            title: "Thumbnail",
            name: "thumbnail",
            type: "image",
            description: "Displayed on homepage, will be cropped to portrait 3:2 aspect ratio.",
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
            title: "Short Description",
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
    preview: {
        select: {
            title: "title",
            thumbnail: "thumbnail",
            date: "date",
        },
        prepare(selection) {
            const { title, thumbnail, date } = selection;
            return {
                title: title ?? "Project",
                media: thumbnail ?? BiPaintRoll,
                subtitle: date?.split("-")?.[0],
            };
        },
    },
};
