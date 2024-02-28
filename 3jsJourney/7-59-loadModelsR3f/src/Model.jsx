import { Clone, useGLTF} from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


//can put this in the experience in the return fragment


export default function Model()
{

    const model = useGLTF('./hamburger-draco.glb')

    // const model = useLoader(GLTFLoader, './hamburger.glb', (loader) =>
    // {
    //     const dracoLoader = new DRACOLoader()
    //     dracoLoader.setDecoderPath('./draco/')
    //     loader.setDRACOLoader(dracoLoader)
    // }
    // )


    return <>
    <Clone object={model.scene} scale={ .35 } position-x={-4}  />
    <Clone object={model.scene} scale={ .35 } position-x={0} />
    <Clone object={model.scene} scale={ .35 } position-x={4} />
    </>
}

useGLTF.preload('./hamburger-draco.glb')