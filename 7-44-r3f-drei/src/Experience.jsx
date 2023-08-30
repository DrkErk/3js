//installing drei "npm install @react-three/drei@9.70" you shouldnt need the version "@latest" is most recent
//
//- pivotControls is not a group like fro the Transformcontrols (we have to change the postion with the anchor attr)



//import { useThree, extend } from '@react-three/fiber'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//extend({ OrbitControls })

import { Text, Html ,PivotControls, TransformControls, OrbitControls } from "@react-three/drei"
import { useRef } from "react"


export default function Experience()
{
//const { camera, gl } = useThree()

    const cube = useRef()
    const sphere = useRef()

    return <>
        {/* <orbitControls args={ [ camera, gl.domElement ] } /> */}
        <OrbitControls enableDamping={false} makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

    <PivotControls anchor={[0,0,0]} depthTest={false}
    lineWidth={4} axisColors={[ '#9381ff', '#ff4d6d', '#7ae582' ]} scale={100} fixed={true}
    >
    {/* if you set the size to fixed, scale turns into a size in pixels */}

        <mesh position-x={ - 2 } ref={sphere}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />

            <Html position={[1, 2, 0]} wrapperClass="label" center distanceFactor={8} occlude={ [sphere, cube] }
            >testtexttest</Html>

        </mesh>
    </PivotControls>  
    

        <mesh ref={cube} position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
    <TransformControls object={cube} mode="translate" />


        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        
    </>
}