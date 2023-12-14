import * as THREE from 'three'
export default function Experience()
{
    return<>
    <color args={ ['#bdedfc'] } attach="background" />
    
    <mesh geometry={new THREE.BoxGeometry(1,1,1)} material={new THREE.MeshStandardMaterial({color: 'limegreen'})} position={[0,-0.1,0]} scale={[4, 0.2, 4]} receiveShadow />
    
    </>
}