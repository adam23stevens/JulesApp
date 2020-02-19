import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () =>  (
    <div className={classes.NavigationItems}>
        <NavigationItem link='/'>Home</NavigationItem>
        <NavigationItem link='/clues'>HUNTS</NavigationItem>
        <NavigationItem link='/riddles'>RIDDLES</NavigationItem>        
        <NavigationItem link='/actions'>Actions</NavigationItem>
    </div>
)

export default navigationItems;