/**
 * gpgpu ex:
 * https://threejs.org/examples/?q=gpgpu#webgl_gpgpu_birds
 * 
 * gpucomprenderer.js file, line below:
 * https://github.com/mrdoob/three.js/blob/8286a475fd8ee00ef07d1049db9bb1965960057b/examples/jsm/misc/GPUComputationRenderer.js
 * 
 * Your gpgpu screen should be set to the size of the particles you have, if you have 9, sqrt9 = 3x3 needed 10 particles would need a 
 * 4x4 with left overs (automated with sqrting the count)
 * 
 * 
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import GUI from 'lil-gui'
import particlesVertexShader from './shaders/particles/vertex.glsl'
import particlesFragmentShader from './shaders/particles/fragment.glsl'
import gpgpuParticlesShader from './shaders/gpgpu/particles.glsl'
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js'


/**
 * Base
 */
// Debug
const gui = new GUI({ width: 340 })
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Materials
    particles.material.uniforms.uResolution.value.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

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
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4.5, 4, 11)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

debugObject.clearColor = '#29191f'
renderer.setClearColor(debugObject.clearColor)

/**
 * Base geometry
 */
const baseGeometry = {} //gpgpu needs to be insatiated away from all
baseGeometry.instance = new THREE.SphereGeometry(3)
baseGeometry.count = baseGeometry.instance.attributes.position.count //counts the total points in obj 

/**
 * Gpu Compute
 */
//setup
const gpgpu = {}
gpgpu.size = Math.ceil(Math.sqrt(baseGeometry.count))
gpgpu.computation = new GPUComputationRenderer(gpgpu.size, gpgpu.size, renderer)

// base particles
//(below) creates an datatexture that works like other texture, but pixel data is set up as an array (found in baseparticletexture.image.data)
const baseParticlesTexture = gpgpu.computation.createTexture()

for(let i = 0; i < baseGeometry.count; i++)
    {
        const i3 = i*3 //for baseGeometry.instance.attributes.position.array go 3x3, xyz
        const i4 = i*4 //for baseParticlesTexture.image.data go 4x4, rgba

        
    }

// particles variable
gpgpu.particlesVariable = gpgpu.computation.addVariable('uParticles', gpgpuParticlesShader, baseParticlesTexture)
//^^^ uParticles is the name of the `baseParticlesTexture` in the gpgpuParticleShader
gpgpu.computation.setVariableDependencies(gpgpu.particlesVariable, [gpgpu.particlesVariable])

// init
gpgpu.computation.init()

//debug 
gpgpu.debug = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 3),
    new THREE.MeshBasicMaterial({
        map: gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture
    })
)
gpgpu.debug.position.x = 3
scene.add(gpgpu.debug)



/**
 * Particles
 */
const particles = {}

// Material
particles.material = new THREE.ShaderMaterial({
    vertexShader: particlesVertexShader,
    fragmentShader: particlesFragmentShader,
    uniforms:
    {
        uSize: new THREE.Uniform(0.4),
        uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio))
    }
})

// Points
particles.points = new THREE.Points(baseGeometry.instance, particles.material)
scene.add(particles.points)

/**
 * Tweaks
 */
gui.addColor(debugObject, 'clearColor').onChange(() => { renderer.setClearColor(debugObject.clearColor) })
gui.add(particles.material.uniforms.uSize, 'value').min(0).max(1).step(0.001).name('uSize')

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    
    // Update controls
    controls.update()

    gpgpu.computation.compute()

    // Render normal scene
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()