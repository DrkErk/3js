//- strict mode allows for console debug (chrome/firefox)
//
//- Leva is react only (most likely)
//- npm install leva@0.9
//- npm install r3f-perf@7.1


import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { StrictMode } from 'react'
import { Leva } from 'leva'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
    <Leva collapsed />
    <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
    >
        <Experience />
    </Canvas>
    </StrictMode>
)