import React from "react";

export default function WinCard({close, reset}){
    return(
        <div className="winCard popout">
            <button className="close" onClick={close}>X</button>
            <h2>You Won!</h2>
            <button className="reset-card" onClick={reset}>Reset</button>
        </div>
    )
}