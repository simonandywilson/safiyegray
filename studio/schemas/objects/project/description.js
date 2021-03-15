import React from "react";

const Times = (props) => <span style={{ fontFamily: "Times" }}>{props.children}</span>;

export default {
    title: "Decription",
    name: "description",
    type: "array",
    of: [
        {
            type: "block",
            styles: [
                { title: "Helvetica", value: "normal" },
                {
                    title: "Times",
                    value: "times",
                    blockEditor: {
                        render: Times,
                    },
                },
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
