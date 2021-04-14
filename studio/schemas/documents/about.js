export default {
    title: "About",
    name: "about",
    type: "document",
    fieldsets: [
        {
            name: "colours",
            title: "Colours",
            options: {
                collapsible: true,
                collapsed: false,
                columns: 2,
            },
        },
    ],
    __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    fields: [
        {
            // Title
            title: "Title",
            name: "title",
            type: "string",
        },
        {
            // Bio
            title: "Bio",
            name: "bio",
            type: "description",
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
        {
            // Image
            title: "Portrait",
            name: "portrait",
            type: "image",
        },
        {
            // CV
            title: "CV",
            name: "cv",
            type: "cv",
        },
    ],
};