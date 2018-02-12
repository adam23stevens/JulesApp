import React from 'react';
import classes from './MobileNav.css';

const mobileNav = (props) => (
    <div className={classes.MobileNav} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default mobileNav;