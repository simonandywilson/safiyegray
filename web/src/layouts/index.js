import React from "react";
import ContextProvider from "../state/store";
import Static from "../components/static";
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
                <Static />
                <TransitionViews>{children}</TransitionViews>
            </TransitionProvider>
        </ContextProvider>
    );
};

export default Layout;
