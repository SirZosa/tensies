import React, { useEffect } from "react";
import TenziesDice from "./tenziezDice";
import confetti from "canvas-confetti";
import WinCard from "./winCard";

export default function TenziesBoard(){
const [diceValue, setDiceValue] = React.useState([{num: randomNum(), isHeld:false}, {num: randomNum(), isHeld:false}])
const [win, setWin]= React.useState(false)

    useEffect(()=>{
       if(diceValue.every(val => val.num === diceValue[0].num && val.isHeld === true)){
            setWin(true)
           confetti()
       }
    },[diceValue])

    function randomNum(){
        const num = Math.ceil(Math.random(0.1)*6)
        return num
    }

    useEffect(()=>{
        window.addEventListener('keypress',(e)=>{
            if(e.keyCode === 32){
                changeDices()
            }
        })

    },[])

    function Dice(){
        const arr = []
        const arr2 = []
        for(let i=0; i<diceValue.length;i++){
            arr.push(<TenziesDice num={diceValue[i].num} isHeld={diceValue[i].isHeld} onClick={()=>handleClick(i)}/>)
        }
        for(let i = 0; i<diceValue.length; i = i+3){
            arr2.push(<div key={i}className="column">
            {arr[i]}
            {arr[i+1]}
            {arr[i+2]}
            </div>)
        }
        return arr2
    }

    function handleClick(i){
        if(diceValue.every(val => val.num === diceValue[0].num && val.isHeld === true)){
            return
        }
        else{
            if(diceValue[i].isHeld===false){
                setDiceValue(prev => {
                    const arr = [...prev]
                    arr[i].isHeld = true
                    return arr
                })
            }
            else{
                setDiceValue(prev => {
                    const arr = [...prev]
                    arr[i].isHeld = false
                    return arr
                })
            }

        }
    }

    function changeDices(){
        if(diceValue.every(val => val.num === diceValue[0].num && val.isHeld === true)){
            return
        }
        else{
            setDiceValue(prevState => {
                const arr = [...prevState]
                for(let i=0; i< arr.length; i++){
                    if(arr[i].isHeld === false){
                        arr[i].num = randomNum()
                    }
                }
                return arr
            })

        }
    }

    function addDice(){
        if(diceValue.some(val => val.isHeld===true)){
            return
        }
        else{
            const dices = diceValue.length
            if(dices === 12)return
            else{
                setDiceValue(prev => {
                    let number = randomNum()
                    while(number === diceValue[0].num){
                        number = randomNum()
                    }
                    const arr = [...prev]
                    arr.push({num:number, isHeld:false})
                    return arr
                })
            }
        }
    }

    function removeDice(){
        if(diceValue.some(val => val.isHeld===true)){
            return
        }
        else{
            const dices = diceValue.length
            if(dices === 2)return
            else{
                setDiceValue(prev => {
                    const arr = [...prev]
                    arr.pop()
                    return arr
                })
            }
        }
    }

    function reset(){
        setWin(false)
        setDiceValue(prevState => {
            const arr = [...prevState]
            for(let i=0; i< arr.length; i++){
                
                    arr[i].num = randomNum()
                    arr[i].isHeld= false
                
            }
            return arr
    })
}

    return(
        <div className="board">
            <div className="dices">
                {Dice()}
            </div>
            <div className="buttons">
                <button onClick={() => changeDices()}>change</button>
                <button onClick={()=> addDice()}>add</button>
                <button onClick={()=> removeDice()}>remove</button>
            </div>
            <button className="reset" onClick={()=> reset()}>Reset</button>
            {win ? <WinCard close={()=> setWin(false)} reset={()=>reset()}/> : ""}
        </div>
    )
}