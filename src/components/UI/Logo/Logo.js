import React from 'react';
import classes from './Logo.css';
import birthdayCakeLogo from '../../../assets/images/birthday-cake.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={birthdayCakeLogo} alt='birthday-cake'/>
    </div>
)

export default logo;