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
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js'
import GUI from 'lil-gui'
import particlesVertexShader from './shaders/particles/vertex.glsl'
import particlesFragmentShader from './shaders/particles/fragment.glsl'
import gpgpuParticlesShader from './shaders/gpgpu/particles.glsl'
import { float } from 'three/examples/jsm/nodes/Nodes.js'


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
 * Load Model
 */
const gltf = await gltfLoader.loadAsync('./model.glb') // this wouldn't work with vite because vite wants to make it compatiable w/most browsers
// We did stuff in the vite config to get it to work. check there.
// DRAWBACK: if the model takes time to load, the code will be stuck for a while.


/**
 * Base geometry
 */
const baseGeometry = {} //gpgpu needs to be insatiated away from all
baseGeometry.instance = gltf.scene.children[0].geometry
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

        baseParticlesTexture.image.data[i4 + 0] = baseGeometry.instance.attributes.position.array[i3 + 0]
        baseParticlesTexture.image.data[i4 + 1] = baseGeometry.instance.attributes.position.array[i3 + 1]
        baseParticlesTexture.image.data[i4 + 2] = baseGeometry.instance.attributes.position.array[i3 + 2]
        baseParticlesTexture.image.data[i4 + 3] = 0

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

// Geometery
const particlesUvArray = new Float32Array(baseGeometry.count * 2)
const sizesArray = new Float32Array(baseGeometry.count)

for(let y = 0; y < gpgpu.size; y++)
    {
        for(let x = 0; x < gpgpu.size; x++)
            {
                const i = (y * gpgpu.size) + x //gets the total size of the material
                const i2 = i * 2
                
                //particles uv
                const uvX = (x + 0.5) / gpgpu.size //resize to normalize 0 to 1. +0.5 to get center of pixel
                const uvY = (y + 0.5) / gpgpu.size //resize to normalize 0 to 1. +0.5 to get center of pixel

                particlesUvArray[i2 + 0] = uvX
                particlesUvArray[i2 + 1] = uvY
                
                // sizes
                sizesArray[i] = Math.random()
            }
    }

particles.geometery =  new THREE.BufferGeometry()
particles.geometery.setDrawRange(0, baseGeometry.count)
particles.geometery.setAttribute('aParticlesUv', new THREE.BufferAttribute(particlesUvArray, 2))
particles.geometery.setAttribute('aColor', baseGeometry.instance.attributes.color)
particles.geometery.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1))

// Material
particles.material = new THREE.ShaderMaterial({
    vertexShader: particlesVertexShader,
    fragmentShader: particlesFragmentShader,
    uniforms:
    {
        uSize: new THREE.Uniform(0.04),
        uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
        uParticlesTexture: new THREE.Uniform()
    }
})

// Points
particles.points = new THREE.Points(particles.geometery, particles.material)
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
    particles.material.uniforms.uParticlesTexture.value = gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture

    // Render normal scene
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()