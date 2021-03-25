import React from "react";
import ContextProvider from "../state/store";
import SEO from "../components/seo";
import Header from "../components/header";
import Cursor from "../components/cursor";
import { TransitionProvider, TransitionViews } from "gatsby-plugin-transitions";

const Layout = ({ location, children }) => {
    return (
        <ContextProvider>
            <TransitionProvider
                location={location}
                mode="successive"
                enter={{
                    opacity: 0,
                    config: {
                        duration: 500,
                    },
                }}
                usual={{
                    opacity: 1,
                }}
                leave={{
                    opacity: 0,
                    config: {
                        duration: 500,
                    },
                }}
            >
                <SEO />
                <Header />
                <Cursor />
                <TransitionViews>{children}</TransitionViews>
            </TransitionProvider>
        </ContextProvider>
    );
};

export default Layout;
