import React from "react";
import classNames from "classnames";

export default function TenziesDice({num, isHeld, ...rest}){
    const diceClasses = {1:'one', 2:'two', 3:'three', 4:'four', 5:'five', 6:'six'}
    const classes = classNames(diceClasses[num], 'dice', isHeld ? 'Held': '')
    return(
        <div className={classes} {...rest}>
            
        </div>
    )
}