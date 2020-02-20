import React from 'react';
import classes from './Logo.css';
import birthdayCakeLogo from '../../../assets/images/birthday-cake.png';
import birthdayLogo from '../../../assets/images/happy-birthday-image.jpg';

const logo = () => (
    <div className={classes.Logo}>
        <img src={birthdayLogo} alt='birthday-cake'/>
    </div>
)

export default logo;