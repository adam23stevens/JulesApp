import React from 'react';
import classes from './Boots.css';

const Boots = (props) => (
        <div className={[classes.Boots, props.display].join(' ')}>
        <div className={[classes.BootsTop, props.colour].join(' ')}>
            <div className={classes.BootsTopHole}/>
            <div className={classes.BootsTopDetail}/>
            <div className={[classes.BootsTopDetail, classes.BootsTopDetailBottom].join(' ')}/>
        </div>                                    
        <div className={[classes.BootsTop, classes.BootsTopRight, props.colour].join(' ')}>
            <div className={classes.BootsTopHole}/>
            <div className={classes.BootsTopDetail}/>
            <div className={[classes.BootsTopDetail, classes.BootsTopDetailBottom].join(' ')}/>
        </div>                
    </div>
    )

export default Boots;