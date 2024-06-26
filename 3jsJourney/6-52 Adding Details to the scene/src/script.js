import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import fireflyVertexShader from './shaders/firefly/vertex.glsl'
import fireflyFragmentShader from './shaders/firefly/fragment.glsl'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'



/**
 * Base
 */
// Debug
const debugObject = {}
const gui = new dat.GUI({
    width: 400
})


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const bakedTexture = textureLoader.load('baked.jpg')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

// Portal light material
debugObject.portalColorStart = '#000000'
debugObject.portalColorEnd =  '#ffffff'

gui
.addColor(debugObject, 'portalColorStart')
.onChange(()=>
{
    portalLightMaterial.uniforms.uColorStart.value.set(debugObject.portalColorStart)
})
gui
.addColor(debugObject, 'portalColorEnd')
.onChange(()=>
{
    portalLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd)
})

const portalLightMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: {value: 0},
        uColorStart: {value: new THREE.Color(debugObject.portalColorStart)} ,
        uColorEnd: {value: new THREE.Color(debugObject.portalColorEnd)}
    },
vertexShader: portalVertexShader,
fragmentShader: portalFragmentShader

})




/**
 * Model
 */
gltfLoader.load(
    'portal.glb',
    (gltf) =>
    {
        scene.add(gltf.scene)

        // Get each object
        const bakedMesh = gltf.scene.children.find((child) => child.name === 'baked')
        const portalLightMesh = gltf.scene.children.find((child) => child.name === 'portalLight')
        const poleLightAMesh = gltf.scene.children.find((child) => child.name === 'poleLightA')
        const poleLightBMesh = gltf.scene.children.find((child) => child.name === 'poleLightB')

        // Apply materials
        bakedMesh.material = bakedMaterial
        portalLightMesh.material = portalLightMaterial
        poleLightAMesh.material = poleLightMaterial
        poleLightBMesh.material = poleLightMaterial
    }
)

/**
 * Fireflies
 */
const fireflyGeometery = new THREE.BufferGeometry()
const fireflyCount = 30
const positionArray = new Float32Array(fireflyCount * 3)
const scaleArray = new Float32Array(fireflyCount)


for(let i = 0; i < fireflyCount; i++)
{
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
    positionArray[i * 3 + 1] = Math.random() * 1.5
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

    scaleArray[i] = Math.random()
}

fireflyGeometery.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
fireflyGeometery.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))


// material
const fireflyMaterial = new THREE.ShaderMaterial({
    uniforms:
    {
        uTime: {value: 0},
        uPixelRatio: {value: Math.min(window.devicePixelRatio, 2)},
        uSize: {value: 100}
    },
    vertexShader: fireflyVertexShader,
    fragmentShader: fireflyFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,

})

gui.add(fireflyMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('FFM uSize')

//Points
const firefly = new THREE.Points(fireflyGeometery, fireflyMaterial)
scene.add(firefly)


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

    //update firefly
    fireflyMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

debugObject.clearColor = '#000000'
renderer.setClearColor(debugObject.clearColor)
gui.addColor(debugObject, 'clearColor')
   .onChange(() =>{
    renderer.setClearColor(debugObject.clearColor)
   })

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update materials
    fireflyMaterial.uniforms.uTime.value = elapsedTime
    portalLightMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()