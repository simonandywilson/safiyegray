import { BiDetail } from "react-icons/bi";
export default {
    title: "Item",
    name: "category",
    type: "object",
    icon: BiDetail,
    fields: [
        {
            title: "Title",
            name: "name",
            type: "string",
        },
        {
            title: "Date",
            name: "date",
            type: "string",
        },
    ],
};