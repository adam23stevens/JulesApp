import React from 'react';
import classes from './Trainers.css';

const Trainers = (props) => (
    <div className={[classes.Trainers, props.display].join(' ')}>
        <div className={[classes.TrainersTop, props.colour].join(' ')}>
            <div className={classes.TrainersTopHole}/>
            <div className={classes.TrainersTopDetail}/>
            <div className={[classes.TrainersTopDetail, classes.TrainersTopDetailBottom].join(' ')}/>
            <div className={[classes.TrainersTopDetail, classes.TrainersTopDetailMiddle].join(' ')}/>
        </div>                                    
        <div className={[classes.TrainersTop, classes.TrainersTopRight, props.colour].join(' ')}>
            <div className={classes.TrainersTopHole}/>
            <div className={classes.TrainersTopDetail}/>
            <div className={[classes.TrainersTopDetail, classes.TrainersTopDetailBottom].join(' ')}/>
            <div className={[classes.TrainersTopDetail, classes.TrainersTopDetailMiddle].join(' ')}/>
        </div>                
    </div>
)

export default Trainers;