import * as THREE from 'three'
import React from 'react'



export default function ExperienceHandler() {

    return (
    <>
            <color args={['#bdedfc']} attach="background" />

            <mesh geometry={new THREE.BoxGeometry(1, 2, 1)} material={new THREE.MeshStandardMaterial({ color: 'limegreen' })} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />

        </>
    )
    

}
