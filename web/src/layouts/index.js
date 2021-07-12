import React from "react";
import ContextProvider from "../state/store";
import Static from "../components/static";
import { TransitionProvider, TransitionViews } from "gatsby-plugin-transitions";

const Layout = ({ location, children }) => {
    return (
        <ContextProvider>
            <TransitionProvider
                location={location}
            >
                <Static />
                <TransitionViews>{children}</TransitionViews>
            </TransitionProvider>
        </ContextProvider>
    );
};

export default Layout;
