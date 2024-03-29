import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap'
import fireworkVertexShader from './shaders/firework/vertex.glsl'
import fireworkFragmentShader from './shaders/firework/fragment.glsl'
import {Sky} from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const textureLoader = new THREE.TextureLoader()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
}
sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)
    sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1.5, 0, 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

// /**
//  * Test
//  */
// const test = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(test)

/**
 * Fireworks
 */
const textures = [
    textureLoader.load('./particles/1.png'),
    textureLoader.load('./particles/2.png'),
    textureLoader.load('./particles/3.png'),
    textureLoader.load('./particles/4.png'),
    textureLoader.load('./particles/5.png'),
    textureLoader.load('./particles/6.png'),
    textureLoader.load('./particles/7.png'),
    textureLoader.load('./particles/8.png'),
]


const createFirework = (count, position, size, texture, radius, color) =>
{
    //geom
    const positionsArray = new Float32Array(count * 3)
    const sizesArray = new Float32Array(count)
    const timeMultipliersArray = new Float32Array(count)

    for(let i = 0; i < count; i++)
    {
        // Upgraded counter for the position array so it moves by 3
        const i3 = i * 3;

        //spherical
        const spherical = new THREE.Spherical(
            radius * (0.75 + Math.random() * 0.25),
            Math.random() * Math.PI,
            Math.random() * Math.PI * 2
        )
        const position = new THREE.Vector3()
        position.setFromSpherical(spherical) // sets spherical coords from `spherical` to vector 3 coords 
        // Feed above into position of the particle array

        //Position of the particles
        positionsArray[i3    ] = position.x
        positionsArray[i3 + 1] = position.y
        positionsArray[i3 + 2] = position.z

        //random size of the particles
        sizesArray[i] = Math.random()

        timeMultipliersArray[i] = 1 + Math.random()
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1)) // allows for randomness of size to be added to vertex
    geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1))
    
    // shader as an attribute

    //material
    texture.flipY = false
    const material = new THREE.ShaderMaterial({
        vertexShader: fireworkVertexShader,
        fragmentShader: fireworkFragmentShader,
        uniforms:
        {
            uSize: new THREE.Uniform(size),
            uResolution: new THREE.Uniform(sizes.resolution),
            uTexture: new THREE.Uniform(texture),
            uColor: new THREE.Uniform(color),
            uProgress: new THREE.Uniform(0),
        },
        transparent:true,
        depthWrite: false, // gets rid of the weird depth issue where particles block each other
        blending: THREE.AdditiveBlending,
    })

    //points
    const firework = new THREE.Points(geometry, material)
    firework.position.copy(position)
    scene.add(firework)

    //destroy
    const destroy = () =>
    {
        scene.remove(firework)
        geometry.dispose()
        material.dispose()
    }

    //GSAP animate
    gsap.to(
        material.uniforms.uProgress,
        {value: 1, duration: 3, ease: 'linear', onComplete: destroy},
    )

}


// createFirework(
//     100,                        //count 
//     new THREE.Vector3(),        //Position
//     0.5,                        //Size
//     textures[7],                //Texture
//     1,                          //Radius
//     new THREE.Color('#8affff'), // color
    
//     )

const createRandomFirework = () =>
{
    const count = Math.round(400 + Math.random() * 1000)
    const position = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random(),
        (Math.random() - 0.5) * 2
    )
    const size = 0.1 + Math.random() * 0.1
    const texture = textures[Math.floor(Math.random() * textures.length)]
    const radius = 0.5 + Math.random()
    const color = new THREE.Color()
    color.setHSL(Math.random(), 1, 0.7)
    createFirework(count, position, size, texture, radius, color)
}
createRandomFirework()

window.addEventListener('click', createRandomFirework)

/**
 * SKY
 */
const sky = new Sky()
const sun = new THREE.Vector3()


sky.scale.setScalar(450000)
scene.add(sky)      


/// GUI

const skyParameters = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.95,
    elevation: -2.2,
    azimuth: 180,
    exposure: renderer.toneMappingExposure
}

const updateSky = () => 
{
    const uniforms = sky.material.uniforms
    uniforms[ 'turbidity' ].value = skyParameters.turbidity
    uniforms[ 'rayleigh' ].value = skyParameters.rayleigh
    uniforms[ 'mieCoefficient' ].value = skyParameters.mieCoefficient
    uniforms[ 'mieDirectionalG' ].value = skyParameters.mieDirectionalG

    const phi = THREE.MathUtils.degToRad(90 - skyParameters.elevation)
    const theta = THREE.MathUtils.degToRad(skyParameters.azimuth)

    sun.setFromSphericalCoords(1, phi, theta)

    uniforms[ 'sunPosition' ].value.copy( sun )

    renderer.toneMappingExposure = skyParameters.exposure
    renderer.render( scene, camera )
}


gui.add( skyParameters, 'turbidity', 0.0, 20.0, 0.1 ).onChange( updateSky )
gui.add( skyParameters, 'rayleigh', 0.0, 4, 0.001 ).onChange( updateSky )
gui.add( skyParameters, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( updateSky )
gui.add( skyParameters, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( updateSky )
gui.add( skyParameters, 'elevation', -3, 90, 0.01 ).onChange( updateSky )
gui.add( skyParameters, 'azimuth', - 180, 180, 0.1 ).onChange( updateSky )
gui.add( skyParameters, 'exposure', 0, 1, 0.0001 ).onChange( updateSky )

updateSky()

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()