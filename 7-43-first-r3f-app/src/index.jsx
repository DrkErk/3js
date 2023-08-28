import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

/*
or you can put the setting out of the render like this:

const cameraSettings = {
    fov:45,
    zoom: 100,
    near: 0.1,
    far: 200,
    position: [3, 2, 6]
}

and in the canvas would look like
<Canvas 
    orthographic
            camera= {cameraSettings}
>
    <Experience/>
</Canvas>

*/

root.render(


        <Canvas
           // dpr={ [1, 2] } DEFAULT R3F SETTINGS
            gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping, //THREE.CineonToneMapping
                outputColorSpace: THREE.SRGBColorSpace   
            }}
            camera={ {
                fov:45,
                near: 0.1,
                far: 200,
                position: [3, 2, 6]
            }}
        >
            <Experience/>
        </Canvas>
    
)