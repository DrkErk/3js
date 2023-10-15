//npm install @react-three/rapier@1.0
//
//
//
//

import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Lights from './Lights.jsx'
import {Level, BlockSpinner} from './Level.jsx'
import Player from './Player.jsx'

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />

        <Physics debug={false}>
        <Lights />
        <Level />
        <Player />
        </Physics>


    </>
}