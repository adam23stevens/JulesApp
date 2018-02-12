import React from 'react';
import classes from './Tophat.css';

const Tophat = (props) => (
        <div className={[classes.topHatWrap, props.display].join(' ')}>
             <div className={[classes.topHatRim, props.colour].join(' ')}/>
             <div className={[classes.topHat, props.colour].join(' ')}/>
        </div> 
    )

export default Tophat;