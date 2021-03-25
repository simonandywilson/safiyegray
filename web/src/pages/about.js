import React, {useEffect} from 'react'
import {Link} from 'gatsby'
import {useLeftUpdateContext, useCentreUpdateContext, useRightUpdateContext} from "../state/store"

const About = () => {
    // Set header info
    const setHome = useLeftUpdateContext();
    const setTitle = useCentreUpdateContext();
    const setAbout = useRightUpdateContext();
    useEffect(() => {
        setHome(<Link to="/">Home</Link>);
        setTitle(null);
        setAbout(null);
    }, [
        setHome,
        setTitle,
        setAbout,
    ]);

    return <main></main>;
}

export default About
