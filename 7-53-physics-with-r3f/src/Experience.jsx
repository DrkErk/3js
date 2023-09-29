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
import { CuboidCollider, debug, RigidBody, Physics } from '@react-three/rapier'

export default function Experience()
{
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Physics debug>

            <RigidBody colliders='ball'>
            <mesh castShadow position={ [ 0, 4, 0 ] }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
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
            <RigidBody colliders={false} >
            <CuboidCollider arg={[1,1,1]} />
            <mesh castShadow position={ [ 0,1,0] } rotation={[ Math.PI * 0.5, 0, 0]}>
                <torusGeometry args={[ 1, 0.5, 16, 32]} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh> 
            </RigidBody>

            <RigidBody type="fixed">
            <mesh receiveShadow position-y={ - 1.25 }>
                <boxGeometry args={ [ 10, 0.5, 10 ] } />
                <meshStandardMaterial color="greenyellow" />
            </mesh>
            </RigidBody>
 
        </Physics>

    </>
}