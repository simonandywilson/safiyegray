import { useState, useEffect } from "react";

// Hook
function useWindowResize() {
    const hasWindow = typeof window !== "undefined";

    function resizeStarted() {
        setResize({ resizing: true, state: "Started" });
    }

    function resizing() {
        setResize({ resizing: true, state: "Resizing" });
    }

    function resizeEnded() {
        setResize({ resizing: false, state: "Finished" });
        setTimeout(() => setResize({ resizing: false, state: "None" }), 1000);
    }

    const [resize, setResize] = useState({
        resizing: false,
        state: "Not Resizing",
    });

    useEffect(() => {
        if (hasWindow) {
            let timer;
            function handleResize() {
                resizing();
                if (typeof timer == "undefined") resizeStarted();
                clearTimeout(timer);
                timer = setTimeout(() => {
                    timer = undefined;
                    resizeEnded();
                }, 1000);
            }

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    return resize;
}

export default useWindowResize;
