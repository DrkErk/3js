//- Ternary Condition, funct (?)<-TC somthing : else
//- && will be 2 args (starting on the left, if left is false not even go to the right) then return the right part

import { useState } from 'react';
import Clicker from './Clicker.jsx';

export default function App({children})
{
    const [hasClicker, setHasClicker] = useState(true)

    const toggleClicker = () =>
    {
        setHasClicker(!hasClicker)
    }

    return <>
        {children}
    <button onClick={ toggleClicker }> {hasClicker? 'Hide' : 'Show' } clickApp</button>
    {hasClicker && <> 
    <Clicker keyName="countA" color={ `hsl(${Math.random() * 360 }deg, 100%, 70%)`} />
    <Clicker keyName="countB" color={ `hsl(${Math.random() * 360 }deg, 100%, 70%)`} />
    <Clicker keyName="countC" color={ `hsl(${Math.random() * 360 }deg, 100%, 70%)`} />
     </> }
    
    </>
}