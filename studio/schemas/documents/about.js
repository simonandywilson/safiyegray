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
            // Occupation
            title: "Bio",
            name: "bio",
            type: "description",
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
        {
            // Contact
            title: "Contact",
            name: "contact",
            type: "contact",
        },
    ],
};
