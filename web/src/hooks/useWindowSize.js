import { useState, useEffect } from "react";

// Hook
function useWindowSize() {
    const hasWindow = typeof window !== "undefined";

    function getWindowSize() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowSize(getWindowSize());
            }

            // window.addEventListener(
            //     "resize",
            //     debounce(() => {
            //         handleResize();
            //     }, 250)
            // );

            window.addEventListener("resize", handleResize);

            return () => window.removeEventListener("resize", handleResize);
        }
    }, [hasWindow]);

    return windowSize;
}

function debounce(callback, wait) {
    let timeout;
    return (...args) => {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(context, args), wait);
    };
}

export default useWindowSize;
