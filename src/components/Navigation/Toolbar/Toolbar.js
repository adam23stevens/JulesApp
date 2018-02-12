import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import MobileNav from '../SideDrawer/MobileNav/MobileNav';

const toolbar = (props) => (
    <header className={classes.Toolbar}>        
        <div className={classes.MobileOnly}>
            <MobileNav clicked={props.mobileNavClicked}/>
        </div>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar;