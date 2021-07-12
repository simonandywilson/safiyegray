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

    useEffect(
        () => {
            if (hasWindow) {
                function handleResize() {
                    setWindowSize(getWindowSize());
                }

                window.addEventListener("resize", handleResize);

                return () => window.removeEventListener("resize", handleResize);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [hasWindow]
    );

    return windowSize;
}

export default useWindowSize;
