//npm install @react-three/rapier@1.0
//npm install zustand@4.3
//
//
//

import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Lights from './Lights.jsx'
import {Level, BlockSpinner} from './Level.jsx'
import Player from './Player.jsx'
import useGame from './store/useGame.jsx'

export default function Experience()
{

    const blocksCount = useGame((state) =>  state.blocksCount)
    const blocksSeed = useGame((state) =>  state.blocksSeed)


    return <>

        {/* <OrbitControls makeDefault /> */}
        <color args={ ['#bdedfc'] } attach="background" />

        <Physics debug={false}>
            <Lights />
            <Level count={blocksCount}/>
            <Player />
        </Physics>


    </>
}