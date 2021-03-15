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
            description: "Displayed on homepage.",
        },
        // { title: "Cursor Colour", name: "cursor", type: "color", fieldset: "colours" },
        // {
        //     title: "Illustration Tag Colour",
        //     name: "illustrationColour",
        //     type: "color",
        //     fieldset: "colours",
        // },
        // {
        //     title: "Print Tag Colour",
        //     name: "printColour",
        //     type: "color",
        //     fieldset: "colours",
        // },
        // {
        //     title: "Exhibition Tag Colour",
        //     name: "exhibitionColour",
        //     type: "color",
        //     fieldset: "colours",
        // },
        // {
        //     title: "Publication Tag Colour",
        //     name: "publicationColour",
        //     type: "color",
        //     fieldset: "colours",
        // },
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
