//- Ternary Condition, funct (?)<-TC somthing : else
//- && will be 2 args (starting on the left, if left is false not even go to the right) then return the right part

import { useState } from 'react';
import Clicker from './Clicker.jsx';

export default function App({clickerCount, children})
{
    const [hasClicker, setHasClicker] = useState(true)
    const [count, setCount] = useState(0)


    const toggleClicker = () =>
    {
        setHasClicker(!hasClicker)
    }

    const increment = () => 
    {
        setCount(count + 1)
    }
    
    // const tempArray = [...Array(clickerCount)]
    // tempArray.map((value, index) => {
    // //do something
    //})
    

    return <>
        {children}
        <div>Total Count: {count} </div>
    <button onClick={ toggleClicker }> {hasClicker? 'Hide' : 'Show' } clickApp</button>

        {hasClicker && <> 
            { [...Array(clickerCount)].map(() => {
            return <Clicker increment={ increment } keyName="countA" color={ `hsl(${Math.random() * 360 }deg, 100%, 70%)`} />
            })}
    
        </>}
    </>
     
}
// <Clicker increment={ increment } keyName="countA" color={ `hsl(${Math.random() * 360 }deg, 100%, 70%)`} />