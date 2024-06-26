// CC0 license  means its all good to go.
// DONT USE PRESENTATION CONTROLS AND ORBIT CONTROLS. ORBIT WILL OVERRIDE
//
// check the canvas tag on style.css to see the issues with the touch for mobile. (so that you can rotate the obj)
//
// polar is constraints on vertical and azimuth is constrants on horizontal
//
// config keeps drag


import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF } from '@react-three/drei'

export default function Experience()
{
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')

    return <>

        <Environment preset='city' />

        <color args={['#695b5b']} attach='background' />

        {/* <OrbitControls makeDefault /> */}

        <PresentationControls 
        global 
        rotation={[0.13, 0.1, 0]} 
        polar={[-0.4, 0.2]} 
        azimuth={[-1, 0.75]} 
        config={{ mass:2, tension: 400}}
        snap={{mass: 4, tension: 400}}
        
        >
        
            <Float rotationIntensity={0.4}>
            <rectAreaLight
            width={ 2.5 }
            height={ 1.65 }
            intensity={ 65 }
            color={ '#6666ff' }
            rotation={ [ - 0.1, Math.PI, 0 ] }
            position={ [ 0, 0.55, - 1.15 ] }
            />
                <primitive object={ computer.scene } position-y={-1.2}>
                    <Html 
                    transform 
                    wrapperClass='htmlscreen'
                    distanceFactor={1.17}
                    position={[0, 1.56, - 1.4]}
                    rotation-x={-0.256}>    
                        <iframe src="https://joedark.codes/" />
                    </Html>
                </primitive>
                <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={ 1 }
                position={ [ 2, 0.75, 0.75 ] }
                rotation-y={ - 1.25 }
                // can do children={'Web-\rCeption'} for a new line here.
                maxWidth={2}
                textAlign='center'
                > 
                    Web- Ception 
                </Text>
            </Float>
        </PresentationControls>

        <ContactShadows 
        position-y={-1.4} 
        opacity={0.4}
        scale={5}
        blur={2.4}
        />
        

    </>
}