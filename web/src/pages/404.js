import React, { useEffect } from "react";
import { useNameUpdateContext, useTitleUpdateContext } from "../state/store";
import { TransitionLink } from "gatsby-plugin-transitions";
import style from "../styles/cv.module.css";

const NotFoundPage = () => {
    const setName = useNameUpdateContext();
    const setTitle = useTitleUpdateContext();
    useEffect(() => {
        setName(
            <TransitionLink
                data-tag={"link"}
                to={"/"}
                leave={{
                    opacity: 0,
                    config: {
                        duration: 500,
                    },
                }}
                enter={{
                    opacity: 0,
                    config: {
                        duration: 500,
                    },
                }}
                usual={{
                    opacity: 1,
                }}
                mode="immediate"
            >
                <span className={style.svg} data-tag={"link"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46.65"
                        height="26.68"
                        viewBox="0 0 46.65 26.68"
                    >
                        <polyline
                            points="14.75 25.26 2.83 13.34 14.75 1.41"
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="4"
                        />
                        <line
                            x1="2.83"
                            y1="13.34"
                            x2="46.65"
                            y2="13.34"
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="4"
                        />
                    </svg>
                </span>
            </TransitionLink>
        );
        setTitle("Page not found");
    }, [setName, setTitle]);
    return (
        <main>
        </main>
    );
};

export default NotFoundPage;
