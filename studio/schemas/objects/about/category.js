import { BiDetail } from "react-icons/bi";
export default {
    title: "Item",
    name: "category",
    type: "object",
    icon: BiDetail,
    fieldsets: [
        {
            title: "Name",
            name: "name",
            description: "Column 1.",
            options: {
                columns: 2,
            },
        },
        {
            title: "Type",
            name: "type",
            description: "Column 2 (Hidden on mobile).",
            options: {
                columns: 2,
            },
        },
        {
            title: "Location",
            name: "location",
            description: "Column 3 (Hidden on mobile).",
            options: {
                columns: 2,
            },
        },
        {
            title: "Date",
            name: "date",
            description: "Column 4.",
        },
    ],
    fields: [
        {
            title: "Title",
            name: "name",
            type: "string",
            fieldset: "name",
        },
        {
            title: "Subtitle",
            name: "name_sub",
            type: "string",
            fieldset: "name",
        },
        {
            title: "Link",
            name: "name_link",
            type: "string",
            fieldset: "name",
        },

        {
            title: "Title",
            name: "type",
            type: "string",
            fieldset: "type",
        },
        {
            title: "Subtitle",
            name: "type_sub",
            type: "string",
            fieldset: "type",
        },
        {
            title: "Link",
            name: "type_link",
            type: "string",
            fieldset: "type",
        },

        {
            title: "Title",
            name: "location",
            type: "string",
            fieldset: "location",
        },
        {
            title: "Subtitle",
            name: "location_sub",
            type: "string",
            fieldset: "location",
        },
        {
            title: "Link",
            name: "location_link",
            type: "string",
            fieldset: "location",
        },

        {
            title: "Title",
            name: "date",
            type: "string",
            fieldset: "date",
        },
    ],
};