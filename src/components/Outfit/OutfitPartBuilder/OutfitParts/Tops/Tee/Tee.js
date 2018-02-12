import React from 'react';
import classes from './Tee.css';

const Tee = (props) => (
    <div className={[classes.Tee, props.colour, props.display].join(' ')}>                                    
        <div className={classes.TeeNeck}/>                        
        <div className={classes.TeeSleeve}/>                     
        <div className={[classes.TeeSleeve, classes.TeeSleeveRight].join(' ')}/>                     
    </div>
)


export default Tee;