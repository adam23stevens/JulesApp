import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () =>  (
    <div className={classes.NavigationItems}>
        <NavigationItem link='/'>Outfit</NavigationItem>
        <NavigationItem link='/stats'>Stats</NavigationItem>
        <NavigationItem link='/add'>New outfit part</NavigationItem>
    </div>
)

export default navigationItems;