import React from "react";
import { Link } from "gatsby";
import style from "../styles/links.module.css";

function Hyperlink(props) {
    const isGatsbyLink = props.props.gatsbyLink;
    if (isGatsbyLink) {
        return (
            <Link to={props.props.to} className={style.link}>
                {props.props.link}
                <span className={style.underline}></span>
            </Link>
        );
    }
    return (
        <a href={props.props.to} target="_blank" rel="noreferrer" className={style.link}>
            {props.props.link}
        </a>
    );
}

const Links = (props) => {
    return <Hyperlink props={props} />;
};

export default Links;
