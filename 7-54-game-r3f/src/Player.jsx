import { RigidBody } from "@react-three/rapier"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { useEffect, useRef } from "react"
import * as RAPIER from '@dimforge/rapier3d-compat'

export default function Player()
{
    const body = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()

    const jump = () =>
    {
        const origin = body.current.translation()
        origin.y -= 0.31
        body.current.applyImpulse({ x:0, y: 0.5, z:0})
    }

    useEffect(()=>
    {
        subscribeKeys(
            (state) => state.jump,
            (valueOfJump) =>
            {
                if(valueOfJump)
                {
                    jump()
                }
            }
        )
    }, [])

    useFrame((state, delta)=>
    {
        const {forward, backward, leftward, rightward} = getKeys()

        const impulse = {x:0, y:0, z:0}
        const torque = {x:0, y:0, z:0}

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if(forward)
        {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }

        if(backward)
        {
            impulse.x -= impulseStrength
            torque.z += torqueStrength 
        }

        if(leftward)
        {
            
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }

        if(rightward)
        {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }

        body.current.applyImpulse(impulse)
        body.current.applyTorqueImpulse(torque)
        
    })

    return <RigidBody 
            ref={body} 
            canSleep={false} 
            colliders='ball' 
            restitution={0.2} 
            friction={1} 
            linearDamping={0.5}
            angularDamping={0.5}
            position={[0,1,0]}
            >
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial flatShading color='mediumpurple' />
            </mesh>
        </RigidBody>

}