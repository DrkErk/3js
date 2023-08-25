//- You can either do <meshBasicMaterial args={ [ {color: 'red' } ] }/> or below
//
//- can do something like <mesh position-x={num} or position={[nums]}

import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Experience()
{
    
   const cubeRef = useRef()

    useFrame(()=>
    {
        cubeRef.current.rotation.y += 0.01
    })
    

    return <>
        
        <mesh position-x={ - 2 }>
            <sphereGeometry/>
            <meshBasicMaterial color="orange"/>
        </mesh>
        <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={ 2 }>
            <boxGeometry/>
            <meshBasicMaterial color="mediumpurple" />
        </mesh>
        <mesh position-y={ -1 } rotation-x={- Math.PI * 0.5} scale = { 10 }>
            <planeGeometry/>
            <meshBasicMaterial color="green" />
        </mesh>

    </>


}