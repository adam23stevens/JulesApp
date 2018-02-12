import React from 'react';
import classes from './Shirt.css';

const Shirt = (props) => (
    <div className={[classes.Shirt, props.colour, props.display].join(' ')}>                                    
        <div className={classes.ShirtCollar}/> 
        <div className={classes.ShirtCollarLeft}/>
        <div className={classes.ShirtNeck}/>        
        <div className={classes.ShirtButtons}/>               
        <div className={classes.ShirtSleeve}/>                     
        <div className={[classes.ShirtSleeve, classes.ShirtSleeveRight].join(' ')}/>                     
    </div>
    )

export default Shirt;