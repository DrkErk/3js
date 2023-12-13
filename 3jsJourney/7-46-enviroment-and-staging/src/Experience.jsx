//
//- If you have accumluate shadows you have to not have receiveShadow activated on the floor


import { useFrame } from '@react-three/fiber'
import { Stage, Lightformer, Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import {useControls} from 'leva'

export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()
    
    useFrame((state, delta) =>
    {
         const time = state.clock.elapsedTime
         cube.current.rotation.y += (delta * 0.2) * Math.tan(cube.current.position.y) * 5
        // cube.current.position.x = 2 + Math.sin(time)
        //cube.current.position.y = 1 + Math.cos(time)
    })
    
    const {color, opacity, blur} = useControls('contact shadows', {
        color: '#1d8f75',
        opacity: { value: 0.4, min: 0, max:1},
        blur: { value: 2.8, min: 0, max:10}

    })
    const { sunPosition } = useControls('sky', {
        sunPosition: {value: [1,2,3]}
    })
    const {envMapIntensity, envMapHeight, envMapRadius, envMapScale} = useControls('environment map', {
        envMapIntensity: {value: 1, min: 0, max: 12},
        envMapHeight: {value: 7, min: 0, max: 100},
        envMapRadius: {value: 28, min: 10, max: 1000},
        envMapScale: {value: 100, min: 10, max: 1000}
    })

    

    return <>

       {/* The environment code would be here */}

        {/* <BakeShadows/> */}
        {/*<SoftShadows frustum={3.75} size={50} near={9.5} samples={17} rings={11} /> */}

                            {/*<color args={['red']}  attach="background"/> */}
        <Perf position="top-left" />
        <OrbitControls makeDefault />

        {/* accumlative shadows can artifact if "temporal" is on  */}

        {/*
        <AccumulativeShadows position={[0, - 0.99, 0]} scale={10} color='#316d39' opacity={0.8} frames={Infinity} temporal blend={100} > 
        <RandomizedLight position={ [1,2,3] } amount={8} radius={1} ambient={0.5} intensity={1} bias={0.001} />
        </AccumulativeShadows>  */}

        {/* <ContactShadows 
        position={ [0, 0, 0] } 
        scale={10} 
        resolution={512} 
        far={5} 
        color={color} 
        opacity={ opacity } 
        blur={ blur } 
        frames={1}// if scene is baked. do 1 frame
        /> */}

        {/* environment in drei adds envmap lighting and ambient lighting/ and skybox

        <directionalLight   
            ref={directionalLight} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
           //shadow-camera-top={2} shadow-camera-right={2} shadow-camera-bottom={-2} shadow-camera-left={-2}
            position={ sunPosition } 
            intensity={ 1.5 } 
        />
        */
        }

        {/*
        <ambientLight intensity={ 0.5 } />
        */}

        {/* usually will use spherical coordinates then set to vec3 instead of the current use. end with setFromSpherical method (spherical is a mathmatical class in 3js)*/}
        
        {/*
        <Sky sunPosition={sunPosition}/>
        */}

        {/* <mesh castShadow position-y={1} position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh> */}

        {/* <mesh castShadow position-y={1} ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="purple" envMapIntensity={envMapIntensity} />
        </mesh> */}

        {/* <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
        </mesh> */}
    <Stage
    shadows={ {
        type: 'contact',
        opacity: 0.2,
        blur: 3
    }}
    environment="sunset"
    preset="portrait"
    intensity={2}
    >
        <mesh castShadow position-y={1} position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh castShadow position-y={1} ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="purple" envMapIntensity={envMapIntensity} />
        </mesh>
    </Stage>
    </>
}