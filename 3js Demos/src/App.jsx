import { Canvas } from '@react-three/fiber'
import ExperienceHandler from './ExperienceHandler'
import React from 'react'

export default function App(){
    
    return(
        <Canvas
    shadows
    camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [ 2.5, 4, 6 ]
    } }
    >
    <ExperienceHandler/>
    </Canvas>
    )
}