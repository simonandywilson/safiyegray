import React from "react";

export default {
    title: "Decription",
    name: "description",
    type: "array",
    of: [
        {
            type: "block",
            styles: [
                { title: "Normal", value: "normal" },
            ],
            lists: [],
            marks: {
                decorators: [
                    { title: "Strong", value: "strong" },
                    { title: "Emphasis", value: "em" },
                    { title: "Underline", value: "underline" },
                ],
            },
        },
    ],
};
