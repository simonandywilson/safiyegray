export default {
    title: "Contact",
    name: "contact",
    type: "array",
    validation: Rule => Rule.max(4).error('You can have a maximum of 4 links.'),
    of: [
        {
            type: "social",
        },
    ],
};
