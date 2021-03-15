export default {
    title: "Tags",
    name: "tags",
    type: "array",
    of: [
        {
            type: "string",
        },
    ],
    options: {
        list: [
            { title: "Illustration", value: "illustration" },
            { title: "Print", value: "print" },
            { title: "Exhibition", value: "exhibition" },
            { title: "Publication", value: "publication" },
        ],
    },
};
