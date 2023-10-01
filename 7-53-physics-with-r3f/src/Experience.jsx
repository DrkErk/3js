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


import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import {BallCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import { useRef } from 'react'

export default function Experience()
{

    const cube = useRef()

    const cubeJump = () =>
    {
        cube.current.applyImpulse({ x:0, y:5, z:0 })
        cube.current.applyTorqueImpulse({ x:Math.random() - 0.5 , y: Math.random() - 0.5 , z: Math.random() - 0.5 })
    }

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics gravity={[0, - 9.08, 0]} />

        <Physics debug>

            <RigidBody colliders='ball'>
            <mesh castShadow position={ [-1.5, 2, 0 ] }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
            </RigidBody>

            {/* for bounciness, restitution, to get trampoline effect, you need rest of 2. custom manual colliders would need coefficentCombineRule and choice one of the provided rules*/}
            {/* https://rapier.rs/javascript3d/classes/RigidBody.html (more methods for the rigid body) (add force is long lasting, add impulse is short force) */}
            {/* mass doesnt increase fall speed. */}
            <RigidBody ref={ cube } position={ [ 1.5, 2, 0 ] } gravityScale={ 1 } restitution={ 0 } friction={0.7} >
            <mesh castShadow onClick={ cubeJump } >
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
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
 
        </Physics>

    </>
}