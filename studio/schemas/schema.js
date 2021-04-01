import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import project from "./documents/project";
import tags from "./objects/project/tags";
import description from "./objects/project/description";
import images from "./objects/project/images";
import caption from "./objects/project/caption";

import sketchbook from "./documents/sketchbook";
import sketch from "./objects/sketchbook/sketch";
import alt from "./objects/sketchbook/alt";

import about from "./documents/about";
import cv from "./objects/about/cv";
import categories from "./objects/about/categories";
import category from "./objects/about/category";

import settings from "./documents/settings";
import seo from "./documents/seo";

export default createSchema({
    name: "default",
    types: schemaTypes.concat([
        project,
        tags,
        description,
        images,
        caption,
        about,

        sketchbook,
        sketch,
        alt,

        cv,
        categories,
        category,

        settings,

        seo,
    ]),
});
