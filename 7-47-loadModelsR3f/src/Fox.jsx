import { useGLTF } from "@react-three/drei"

export default function Fox()
{
    const fox = useGLTF('./Fox/glTF/Fox.gltf')


    return <primative object={ fox.scene } scale={0.02} position={[-2.5, 0, 2.5]} />
}