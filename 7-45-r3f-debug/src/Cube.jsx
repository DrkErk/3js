
export default function Cube({scale = 1})
{
    return <mesh position-x={ 2 } scale={ scale } visible='True'>
    <boxGeometry />
    <meshStandardMaterial color="mediumpurple" />
</mesh>

}



