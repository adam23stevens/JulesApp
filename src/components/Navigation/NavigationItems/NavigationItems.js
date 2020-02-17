import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () =>  (
    <div className={classes.NavigationItems}>
        <NavigationItem link='/'>Home</NavigationItem>
        <NavigationItem link='/clues'>Clues</NavigationItem>
        <NavigationItem link='/vouchers'>Vouchers</NavigationItem>
        <NavigationItem link='/presents'>Presents</NavigationItem>
        <NavigationItem link='/actions'>Actions</NavigationItem>
    </div>
)

export default navigationItems;