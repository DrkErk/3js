//- You can either do <meshBasicMaterial args={ [ {color: 'red' } ] }/> or below
//
//- can do something like <mesh position-x={num} or position={[nums]}
//
//- Has the hard way orbit controls
//
//- Extend converts things into its declaritive version

import { useThree, extend, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

extend({ OrbitControls: OrbitControls})

export default function Experience()
{
    const {camera, gl} = useThree() // allows for getting the same info as the state, from the useframe
                                    // you can either destruct it like above or apply all to a var like "three"
    const cubeRef = useRef()
    const groupRef = useRef()

    useFrame((state, delta)=>
    {
        cubeRef.current.rotation.y += delta
        groupRef.current.rotation.y += (1/2) * delta
    })
    

    return <>

        <orbitControls args={ [camera, gl.domElement] } />
        <directionalLight />
        
        <group ref={ groupRef } >
            <mesh position-x={ - 2 }>
                <sphereGeometry/>
                <meshStandardMaterial color="orange"/>
            </mesh>
            <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={ 2 }>
                <boxGeometry/>
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </group>

        <mesh position-y={ -1 } rotation-x={- Math.PI * 0.5} scale = { 10 }>
            <planeGeometry/>
            <meshStandardMaterial color="green" />
        </mesh>

    </>


}