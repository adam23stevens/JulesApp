import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () =>  (
    <div className={classes.NavigationItems}>
        <NavigationItem link='/'>HOME</NavigationItem>
        <NavigationItem link='/clues'>HUNTS</NavigationItem>
        <NavigationItem link='/riddles'>RIDDLES</NavigationItem>        
        <NavigationItem link='/actions'>ACTIONS</NavigationItem>
    </div>
)

export default navigationItems;