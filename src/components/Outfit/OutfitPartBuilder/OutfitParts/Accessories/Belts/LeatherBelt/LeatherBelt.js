import React from 'react';
import classes from './LeatherBelt.css';

const LeatherBelt = (props) => (
    <div className={[classes.Belt, props.colour, props.display].join(' ')}>
        <div className={classes.BeltBuckle}>
            <div className={classes.BeltBuckleDetail}/>
        </div>
        <div className={classes.BeltHole}/>                        
    </div>
)

export default LeatherBelt;