import { BiDetail } from "react-icons/bi";
export default {
    title: "Item",
    name: "category",
    type: "object",
    icon: BiDetail,
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string",
        },
        {
            title: "Date",
            name: "date",
            type: "string",
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "date",
        },
    },
};