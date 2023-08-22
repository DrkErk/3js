//- you can do the ()=>{} in the onclick directly
//- can either do setCount(value + 1) or if you need async: setCount(value => value + 1) ||| or ((value) => {return value + 1})
//- useState returns an array (0: number, 1: function)
//
//- useEffect stuff is only called on the first time in the code brackets, called everytime in the array (like when a dependacy changes)
//- the return null function is 
//
//- (??) is a nullish coalescing operator, so if undefined or null, return something
//
//- Prop is in the js of the parans of the Clicker. thats where we can pull specific info
//- we can put a default css in the prop ie color='red' would make red the default
//
// hsl colors (hue sat light) `hsl(${Math.random() * 360 }deg, 100%, 70%)`

import { useEffect, useState } from 'react'

export default function Clicker({increment, keyName, color})
{
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0)) //usestate

    useEffect(() => //useEffect first load
    {

        return () =>
        {
            localStorage.removeItem(keyName)
        }
    },
    []
    )

    useEffect(() => //useEffect update
    {
        localStorage.setItem(keyName, count)
    },
    [count]
    )


    const buttonClick = () =>
    {
        setCount(count + 1)
        increment()
    }


    return <div>
        <div style={{color: color}}>Counts : {count}</div>
        <button onClick={buttonClick}>Click here</button>
    </div>
} 