import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App() {
    const [nums, setNums] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    const [time, setTime] = React.useState(Math.floor(Date.now()/1000))
    const [init, setInit] = React.useState(Math.floor(Date.now()/1000))
    React.useEffect(()=>{
        
        const allHeld = nums.every(die => die.isHeld)
        const firstValue = nums[0].value
        const allSameValue = nums.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            
        }
        
    },nums)
    
    
    React.useEffect(() => {
        const interval = setInterval(() => setTime(Math.floor(Date.now()/1000)), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    function allNewDice(){
        var arr = new Array();
        
        for(var i = 0; i < 10; i ++){
            
            var val = Math.floor(Math.random() * 6) + 1
            const obj = {
                value: val,
                isHeld: false,
                id: nanoid()
            }
            arr.push(obj)
            
        }
        return arr;
    }

    function holdDice(id){
        setNums(oldState =>{
            return oldState.map((obj)=>{
                return obj.id === id ? {...obj, isHeld: !obj.isHeld} : obj
            })
        })
    }
    const diceElement = nums.map((obj) =>{
            return (
                <Die id = {obj.id} key = {obj.id} value = {obj.value} isHeld = {obj.isHeld} holdDice = {holdDice}/>
            )
    })
    function rollDice(){
        if(tenzies){
            setTenzies(false)
            setNums(allNewDice())
            setInit(Math.floor(Date.now()/1000))
        }
        setNums(oldState =>{
            return (
                oldState.map(obj=>{
                  return obj.isHeld? obj : {...obj, value:  Math.floor(Math.random() * 6) + 1, id: nanoid()}  
                })
            )
        })
    }
    return (
        <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <p>{`Time: ${time-init} seconds`}</p>
            <div className = "die-container" > 
                {diceElement}
            </div>

            <button className = "roll" onClick = {rollDice} >{tenzies? "New Game" : "Roll"}</button>
            
        </main>
    )
}
