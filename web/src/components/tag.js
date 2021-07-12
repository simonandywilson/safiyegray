import React, { useRef, useEffect, useState } from "react";
import style from "../styles/tags.module.css";
import gsap from "gsap";

const Tag = React.forwardRef((props, ref) => {
    const innerRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (props.status === "complete" || props.status === "load") {
            if (hover) {
                gsap.to(combinedRef.current, {
                    scale: 0,
                    ease: "power4.inOut",
                });
            } else {
                gsap.to(combinedRef.current, {
                    scale: 1,
                    delay: 0.75,
                    ease: "elastic.out(1, 0.3)",
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hover]);

    return (
        <span
            data-tag={"link"}
            className={style[props.tag]}
            ref={combinedRef}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            role="presentation"
        />
    );
});

export default Tag;

function useCombinedRefs(...refs) {
    const targetRef = React.useRef();

    useEffect(() => {
        refs.forEach((ref) => {
            if (!ref) return;

            if (typeof ref === "function") {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
}
