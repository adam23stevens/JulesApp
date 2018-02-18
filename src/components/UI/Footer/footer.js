import React from 'react';
import classes from './footer.css';

const footer = (props) => (
    <div className={classes.footer}>
        {props.children}
    </div>
)

export default footer;