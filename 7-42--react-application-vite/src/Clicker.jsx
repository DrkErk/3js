//- you can do the ()=>{} in the onclick directly
//- can either do setCount(value + 1) or if you need async: setCount(value => value + 1) ||| or ((value) => {return value + 1})
//- useState returns an array (0: number, 1: function)
//
//- useEffect stuff is only called on the first time in the code brackets, called everytime in the array (like when a dependacy changes)
//- the return null function is 
//
//- (??) is a nullish coalescing operator, so if undefined or null, return something

import { useEffect, useState } from 'react'

export default function Clicker()
{
    const [count, setCount] = useState(parseInt(localStorage.getItem('count') ?? 0)) //usestate

    useEffect(() => //useEffect first load
    {

        return () =>
        {
            localStorage.removeItem('count')
        }
    },
    []
    )

    useEffect(() => //useEffect update
    {
        localStorage.setItem('count', count)
    },
    [count]
    )


    const buttonClick = () =>
    {
        setCount(count + 1)
    }


    return <div>
        <div>Counts :{count}</div>
        <button onClick={buttonClick}>Click here</button>
    </div>
} 