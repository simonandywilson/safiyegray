import { BiArchive } from "react-icons/bi";

export default {
    title: "Categories",
    name: "categories",
    type: "object",
    icon: BiArchive,
    fields: [
        {
            title: "Title",
            name: "title",
            type: "string",
        },
        {
            title: "Content",
            name: "content",
            type: "array",
            of: [
                {
                    type: "category",
                },
            ],
        },
    ],
};