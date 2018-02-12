import React from 'react';
import classes from './Chinos.css';

const Chinos = (props) => (           
    <div className={[classes.Chinos, props.colour, props.display].join(' ')}>
        <div className={classes.ChinosZip}/>
        <div className={classes.ChinosLeg}/>
        <div className={[classes.ChinosLeg, classes.ChinosLegRight].join(' ')}>
        </div>
    </div>
    )

export default Chinos;