import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

import seo from "./documents/seo"

import about from "./documents/about"
import cv from "./objects/about/cv"
import categories from "./objects/about/categories"
import category from "./objects/about/category";
import contact from "./objects/about/contact"
import social from "./objects/about/social";

import project from "./documents/project"
import slider from "./objects/project/slider"
import description from "./objects/project/description";
import images from "./objects/project/images"
import gallery from "./objects/project/gallery";

import basic from "./objects/project/basic"
import extra from "./objects/project/extra";
import full from "./objects/project/full"

export default createSchema({
    name: "mySchema",
    types: schemaTypes.concat([
        seo,

        about,
        cv,
        categories,
        category,
        contact,
        social,

        project,
        slider,
        description,
        images,
        gallery,

        basic,
        extra,
        full,
    ]),
});
