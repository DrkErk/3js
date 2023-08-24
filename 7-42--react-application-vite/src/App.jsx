//- Ternary Condition, funct (?)<-TC somthing : else
//- && will be 2 args (starting on the left, if left is false not even go to the right) then return the right part
//
//- Usememo is used to handle complex calculations and prevent that calculation from happening on each draw unless its really 
//^- ness

import { useMemo, useState } from 'react';
import Clicker from './Clicker.jsx';
import People from './People.jsx';

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
    

    // const colors = []
    // for(let i = 0; i < clickerCount; i++)
    // {
    //     `hsl(${Math.random() * 360 }deg, 100%, 70%)`
    // }

    const colors = useMemo(() =>
    {
        const colors = []
        for(let i = 0; i < clickerCount; i++)
        
           colors.push(`hsl(${Math.random() * 360 }deg, 100%, 70%)`)
        
        return colors
    }, [clickerCount])

    return <>
        {children}
        <div>Total Count: {count} </div>
    <button onClick={ toggleClicker }> {hasClicker ? 'Hide' : 'Show' } clickApp</button>

        {hasClicker && <> 
            { [...Array(clickerCount)].map((value,index) => {
            return <Clicker 
                key={index}
                increment={ increment } 
                keyName={`count${index}`} 
                color={ colors[index]} 
                />
            })}
    
        </>}
        <People />
    </>
     
}
// <Clicker increment={ increment } keyName="countA" color={ `hsl(${Math.random() * 360 }deg, 100%, 70%)`} />