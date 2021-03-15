export default {
    title: "About",
    name: "about",
    type: "document",
    __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    fieldsets: [
        {
            name: "bio",
            title: "Bio",
            options: {
                columns: 2,
            },
        },
        {
            name: "contact",
            title: "Contact & Social",
            options: {
                collapsible: true,
                collapsed: false,
            },
        },
    ],
    fields: [
        {
            // Title
            title: "Name",
            name: "name",
            type: "string",
            description: "Column 1.",
            fieldset: "bio",
        },
        {
            // Occupation
            title: "Occupation",
            name: "occupation",
            type: "string",
            description: "Column 2.",
            fieldset: "bio",
        },
        {
            // Location
            title: "Location",
            name: "location",
            type: "string",
            description: "Column 3.",
            fieldset: "bio",
        },
        {
            // DOB
            title: "Date of Birth",
            name: "dob",
            type: "string",
            description: "Column 4.",
            fieldset: "bio",
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