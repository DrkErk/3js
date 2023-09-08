//
//- If you have accumluate shadows you have to not have receiveShadow activated on the floor


import { useFrame } from '@react-three/fiber'
import { RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    return <>

        {/* <BakeShadows/> */}
        {/*<SoftShadows frustum={3.75} size={50} near={9.5} samples={17} rings={11} /> */}

        <color args={['red']}  attach="background"/>
        <Perf position="top-left" />
        <OrbitControls makeDefault />

        <AccumulativeShadows position={[0, - 0.99, 0]} scale={10} > 
        <RandomizedLight position={ [1,2,3] } amount={8} radius={1} ambient={0.5} intensity={1} bias={0.001} />
        </AccumulativeShadows>

        <directionalLight 
            ref={directionalLight} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
           //shadow-camera-top={2} shadow-camera-right={2} shadow-camera-bottom={-2} shadow-camera-left={-2}
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
        />
        <ambientLight intensity={ 0.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}