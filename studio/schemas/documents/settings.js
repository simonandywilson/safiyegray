export default {
    title: "Settings",
    name: "settings",
    type: "document",
    fieldsets: [
        {
            name: "colours",
            title: "Colours",
            description: "Colours used throughout site.",
            options: {
                collapsible: true,
                collapsed: false,
                columns: 2,
            },
        },
    ],
    __experimental_actions: [/*'create',*/ "update", /*'delete',*/ "publish"],
    fields: [
        { title: "Cursor", name: "cursor", type: "color", fieldset: "colours" },
        { title: "Highlight", name: "highlight", type: "color", fieldset: "colours" },
        {
            title: "Illustration",
            name: "illustration",
            type: "color",
            fieldset: "colours",
        },
        {
            title: "Print",
            name: "print",
            type: "color",
            fieldset: "colours",
        },
        {
            title: "Exhibition",
            name: "exhibition",
            type: "color",
            fieldset: "colours",
        },
        {
            title: "Publication",
            name: "publication",
            type: "color",
            fieldset: "colours",
        },
    ],
};
