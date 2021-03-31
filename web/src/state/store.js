import React, { createContext, useContext, useState } from "react";

const NameContext = createContext();
const NameUpdateContext = createContext();
const TitleContext = createContext();
const TitleUpdateContext = createContext();
const DateContext = createContext();
const DateUpdateContext = createContext();

export const useNameContext = () => {
    const context = useContext(NameContext);
    if (context === undefined) {
        throw new Error("useNameContext must be called within nameContextProvider");
    }
    return context;
};

export const useNameUpdateContext = () => {
    const context = useContext(NameUpdateContext);
    if (context === undefined) {
        throw new Error("useTitleUpdateContext must be called within nameContextProvider");
    }
    return context;
};

export const useTitleContext = () => {
    const context = useContext(TitleContext);
    if (context === undefined) {
        throw new Error("useTitleContext must be called within titleContextProvider");
    }
    return context;
};

export const useTitleUpdateContext = () => {
    const context = useContext(TitleUpdateContext);
    if (context === undefined) {
        throw new Error("useTitleUpdateContext must be called within titleContextProvider");
    }
    return context;
};

export const useDateContext = () => {
    const context = useContext(DateContext);
    if (context === undefined) {
        throw new Error("useDateContext must be called within dateContextProvider");
    }
    return context;
};

export const useDateUpdateContext = () => {
    const context = useContext(DateUpdateContext);
    if (context === undefined) {
        throw new Error("useDateUpdateContext must be called within dateContextProvider");
    }
    return context;
};

const ContextProvider = ({ children }) => {
    const [name, setName] = useState("Safiye Gray");
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    return (
        <NameContext.Provider value={name}>
            <NameUpdateContext.Provider value={setName}>
                <TitleContext.Provider value={title}>
                    <TitleUpdateContext.Provider value={setTitle}>
                        <DateContext.Provider value={date}>
                            <DateUpdateContext.Provider value={setDate}>
                                            {children}
                            </DateUpdateContext.Provider>
                        </DateContext.Provider>
                    </TitleUpdateContext.Provider>
                </TitleContext.Provider>
            </NameUpdateContext.Provider>
        </NameContext.Provider>
    );
};

export default ContextProvider;
