import React, { createContext, useContext, useState } from "react";

const LeftContext = createContext();
const LeftUpdateContext = createContext();
const CentreContext = createContext();
const CentreUpdateContext = createContext();
const RightContext = createContext();
const RightUpdateContext = createContext();
const DescriptionContext = createContext();
const DescriptionUpdateContext = createContext();

export const useLeftContext = () => {
    const context = useContext(LeftContext);
    if (context === undefined) {
        throw new Error("useLeftContext must be called within leftContextProvider");
    }
    return context;
};

export const useLeftUpdateContext = () => {
    const context = useContext(LeftUpdateContext);
    if (context === undefined) {
        throw new Error("useTitleUpdateContext must be called within leftContextProvider");
    }
    return context;
};

export const useCentreContext = () => {
    const context = useContext(CentreContext);
    if (context === undefined) {
        throw new Error("useCentreContext must be called within centreContextProvider");
    }
    return context;
};

export const useCentreUpdateContext = () => {
    const context = useContext(CentreUpdateContext);
    if (context === undefined) {
        throw new Error("useCentreUpdateContext must be called within centreContextProvider");
    }
    return context;
};

export const useRightContext = () => {
    const context = useContext(RightContext);
    if (context === undefined) {
        throw new Error("useRightContext must be called within rightContextProvider");
    }
    return context;
};

export const useRightUpdateContext = () => {
    const context = useContext(RightUpdateContext);
    if (context === undefined) {
        throw new Error("useRightUpdateContext must be called within rightContextProvider");
    }
    return context;
};

export const useDescriptionContext = () => {
    const context = useContext(DescriptionContext);
    if (context === undefined) {
        throw new Error("useDescriptionContext must be called within descriptionContextProvider");
    }
    return context;
};

export const useDescriptionUpdateContext = () => {
    const context = useContext(DescriptionUpdateContext);
    if (context === undefined) {
        throw new Error(
            "useDescriptionUpdateContext must be called within descriptionContextProvider"
        );
    }
    return context;
};

const ContextProvider = ({ children }) => {
    const [context, setContext] = useState(null);
    const [left, setLeft] = useState(null);
    const [centre, setCentre] = useState(null);
    const [right, setRight] = useState(null);
    const [description, setDescription] = useState(null);
    return (
        <LeftContext.Provider value={left}>
            <LeftUpdateContext.Provider value={setLeft}>
                <CentreContext.Provider value={centre}>
                    <CentreUpdateContext.Provider value={setCentre}>
                        <RightContext.Provider value={right}>
                            <RightUpdateContext.Provider value={setRight}>
                                <DescriptionContext.Provider value={description}>
                                    <DescriptionUpdateContext.Provider value={setDescription}>
                                            {children}
                                    </DescriptionUpdateContext.Provider>
                                </DescriptionContext.Provider>
                            </RightUpdateContext.Provider>
                        </RightContext.Provider>
                    </CentreUpdateContext.Provider>
                </CentreContext.Provider>
            </LeftUpdateContext.Provider>
        </LeftContext.Provider>
    );
};

export default ContextProvider;
