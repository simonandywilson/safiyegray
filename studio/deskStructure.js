import S from "@sanity/desk-tool/structure-builder";
import { BiCube } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiPalette } from "react-icons/bi";
import { BiColorFill } from "react-icons/bi";
import { BiGlobe } from "react-icons/bi";

export default () =>
    S.list()
        .title("Content")
        .items([
            S.listItem()
                .title("Project")
                .icon(BiCube)
                .child(S.documentList().title("Projects").filter('_type == "project"')),
            S.listItem()
                .title("About")
                .icon(BiUser)
                .child(S.document().title("About").schemaType("about").documentId("about")),
            S.listItem()
                .title("Sketchbook")
                .icon(BiPalette)
                .child(
                    S.document()
                        .title("Sketchbook")
                        .schemaType("sketchbook")
                        .documentId("sketchbook")
                ),
            S.divider(),
            S.listItem()
                .title("Settings")
                .icon(BiColorFill)
                .child(
                    S.document().title("Settings").schemaType("settings").documentId("settings")
                ),
            S.listItem()
                .title("SEO")
                .icon(BiGlobe)
                .child(S.document().title("SEO").schemaType("seo").documentId("seo")),
            S.divider(),
        ]);
