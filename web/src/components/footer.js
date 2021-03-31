import React from 'react'
import style from "../styles/footer.module.css"
import Links from "../components/links"

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.left}>
                <Links to={"/cv"} link={"CV"} gatsbyLink={true} />
            </div>
            <div className={style.centre}></div>
            <div className={style.right}>
                <Links to={"/misc"} link={"Misc"} gatsbyLink={true} />
            </div>
        </footer>
    );
}

export default Footer
