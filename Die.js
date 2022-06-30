import React from "react"

export default function Die(props){
    const style = {
        background: props.isHeld? "#59E391": "#FFFFFF"
    }
    return(
        <div className = "die" style = {style} onClick = {()=>props.holdDice(props.id)}>
            {props.value}
        </div>
    )
}
