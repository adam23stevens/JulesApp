import React from 'react';
import classes from './Logo.css';
import wrapmeapplogo from '../../../assets/images/wrapmeapplogo.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={wrapmeapplogo} alt='wrapmeapp'/>
    </div>
)

export default logo;