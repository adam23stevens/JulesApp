import React from 'react';
import classes from './Jeans.css';

const Jeans = (props) => (           
    <div className={[classes.Jeans, props.colour, props.display].join(' ')}>
        <div className={classes.JeansZip}/>
        <div className={classes.JeansLeg}/>
        <div className={[classes.JeansLeg, classes.JeansLegRight].join(' ')}>
            <div className={classes.JeansStitch}/>
        </div>
    </div>
)

export default Jeans;