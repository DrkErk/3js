// https://github.com/pmndrs/react-three-rapier#readme
//https://docs.pmnd.rs/react-three-fiber/getting-started/examples
//
// https://rapier.rs/demos2d/index.html
// https://rapier.rs/demos3d/index.html
//
// rapier without react3f or 3js
// https://rapier.rs/javascript3d/index.html
// https://rapier.rs/docs/user_guides/javascript/getting_started_js
//
// npm install @react-three/rapier@1.0

//can use cannon-es but better version is rapier (written in rust and works with JS due to WASM)
// ^- Rapier is determinism (running the same simulation with the same conditions will result in the same animation even on
//    other devices)
// ^- Rapier isn't bound to three.js


import { useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import { useMemo, useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience()
{

    const [hitSound] = useState(() => new Audio('./hit.mp3'))
    const twister = useRef()
    const cube = useRef()

    const cubeJump = () =>
    {
        const mass = cube.current.mass()
        cube.current.applyImpulse({ x:0, y:5 * mass, z:0 })
        cube.current.applyTorqueImpulse({ x:Math.random() - 0.5 , y: Math.random() - 0.5 , z: Math.random() - 0.5 })
    }

    useFrame((state) =>
    {
        const time = state.clock.getElapsedTime()

        const eulerRotation = new THREE.Euler(0, time * 3, 0)
        const quaternionRotation = new THREE.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)

        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        twister.current.setNextKinematicTranslation({ x: x, y: - 0.8, z: z})
    })

    const collisionEnter = () =>
    {
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    const hamburger = useGLTF('./hamburger.glb')

    const cubeCount = 100
    const instances = useMemo(() =>
    {
        const instances = []
        for(let i = 0; i < cubeCount; i++)
         {
            //instances need 3 things, key, position, rotation
            instances.push({
                key: 'instance_' + i,
                position: [(Math.random() - 0.5) * 8, 6 + i * 0.2 , (Math.random() - 0.5) * 8],
                rotation: [0,0,0]

            })
         }

        return instances
    },[])

   // const cubes = useRef()
   //
   //
   //
    // InstancedRigidBodies does most of this
    //
    // useEffect(()=> {
    //     for(let i = 0; i < cubeCount; i++)
    //     {
    //         const matrix = new THREE.Matrix4()
    //         matrix.compose( 
    //             new THREE.Vector3(i * 2, 0, 0),
    //             new THREE.Quaternion(),
    //             new THREE.Vector3(1,1,1)
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }
    // }, [])

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics debug={false} gravity={[0, - 9.08, 0]} >

            <RigidBody colliders='ball'>
            <mesh castShadow position={ [-1.5, 2, 0 ] }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
            </RigidBody>

            {/* for bounciness, restitution, to get trampoline effect, you need rest of 2. custom manual colliders would need coefficentCombineRule and choice one of the provided rules*/}
            {/* https://rapier.rs/javascript3d/classes/RigidBody.html (more methods for the rigid body) (add force is long lasting, add impulse is short force) */}
            {/* mass doesnt increase fall speed. */}
            <RigidBody 
            ref={ cube } 
            position={ [ 1.5, 2, 0 ] } 
            gravityScale={ 1 } restitution={ 0 } 
            friction={0.7} colliders={false} 
            // onCollisionEnter={ collisionEnter } 
            // onCollisionExit={ () => {console.log('exit')}} 
            // onSleep = {()=> {console.log('sleep')}}
            // onWake = {()=> {console.log('wake')}}
            >
            <mesh castShadow onClick={ cubeJump } >
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <CuboidCollider mass={ 2 } args={[ 0.5, 0.5, 0.5 ]}/>
            </RigidBody>
            
            {/* <RigidBody>
            <mesh castShadow position={ [ 2, 2, 0 ] }>
                <boxGeometry args={[3,2,1]} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            <mesh castShadow position={ [ 2, 2, 3 ] }>
                <boxGeometry args={[1,1,1]} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
            </RigidBody> */}

                {/* hull is like an elastic membrane around an object. the hull should be a convex hull for the torus */}
                {/* avoid trimesh with dynamic rigid bodies, trimesh colliders are hollow o nthe inside and makes collision detection more difficult and buggy */}
                {/* Scale not supported on the rigid body */}
                {/* colliders stack and you cant subdivide ballColliders*/}
                {/* HeightfieldColliders are mainly for landscapes you need an array of height values and providing a num of cols and rows*/}
            {/* <RigidBody colliders={false} position={ [ 0,1,0] } rotation={[ Math.PI * 0.5, 0, 0]}>
            <BallCollider args={[1.5]} />
            <CuboidCollider args={[1.5,1.5,0.5]} />
            <CuboidCollider args={[0.25, 1, 0.25]} position={[0,0,1]} rotation={[ - Math.PI * 0.35, 0, 0]} />
            <mesh castShadow >
                <torusGeometry args={[ 1, 0.5, 16, 32]} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh> 
            </RigidBody> */}

            <RigidBody type="fixed" restitution={0} friction={0.7}>
            <mesh receiveShadow position-y={ - 1.25 }>
                <boxGeometry args={ [ 10, 0.5, 10 ] } />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
            </RigidBody>
 
            <RigidBody ref={twister} position={[ 0, - 0.8, 0]} friction={ 0 } type="kinematicPosition">
            <mesh castShadow scale={[ 0.4, 0.4, 3]}>
                <boxGeometry />
                <meshStandardMaterial color='red' />
            </mesh>
            </RigidBody>
            
            <RigidBody colliders="trimesh" position={ [0, 4, 0] } >
                <primitive object={ hamburger.scene } scale={0.25} />
                {/* <CylinderCollider args={ [0.5, 1.25] } /> */}
            </RigidBody>

            <RigidBody>
                <CuboidCollider args={[5,2,0.5]} position={[0,1,5.25]} />
                <CuboidCollider args={[5,2,0.5]} position={[0,1,-5.25]} />
                <CuboidCollider args={[0.5,2,5]} position={[5.25,1,0]} />
                <CuboidCollider args={[0.5,2,5]} position={[-5.25,1,0]} />
            </RigidBody>

            <InstancedRigidBodies instances={instances} >
            <instancedMesh castShadow  args={[null, null, cubeCount]}>
            <boxGeometry />
            <meshStandardMaterial color='tomato' />
            </instancedMesh>
            </InstancedRigidBodies>

        </Physics>



    </>
}