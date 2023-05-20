import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('textures/particles/2.png')

/**
 * particles
 */
const particlesGeometery = new THREE.BufferGeometry()
const count = 5000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i < count* 3; i++ )
{
    positions[i] = (Math.random() - .5) * 1
    colors[i] = Math.random()
}

particlesGeometery.setAttribute(
    'position', 
    new THREE.BufferAttribute(positions, 3)
    )



particlesGeometery.setAttribute(
    'color', 
    new THREE.BufferAttribute(colors, 3)
    )

// Material
const particleMaterial = new THREE.PointsMaterial({
    //size: .1,
    //sizeAttenuation: true
})
particleMaterial.size = .02
particleMaterial.sizeAttenuation = true
//particleMaterial.color = new THREE.Color('#ff88cc') // will add to the vertex color
particleMaterial.transparent = true
particleMaterial.alphaMap = particleTexture
//particleMaterial.alphaTest = .001 // good but some dont get rendered still
//particleMaterial.depthTest = false // good but goes through all objects
particleMaterial.depthWrite = false // can have certain bugs
particleMaterial.blending = THREE.AdditiveBlending

particleMaterial.vertexColors = true


// points
const particles = new THREE.Points(particlesGeometery, particleMaterial)
scene.add(particles)


/**
 * Test cube
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)
scene.add(cube)
cube.visible = false
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update particles
    //particles.rotation.y = elapsedTime * .2

    for (let i = 0; i < count; i++)
    {
        const i3 = i * 3

        //x
        const x = particlesGeometery.attributes.position.array[i3]
        
        //y
        particlesGeometery.attributes.position.array[i3 + 1] = -Math.abs(Math.sin(elapsedTime + x))

    }
    particlesGeometery.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()