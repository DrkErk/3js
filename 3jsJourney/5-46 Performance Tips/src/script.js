//npm install --save stats.js
//https://gist.github.com/brunosimon/c15e7451a802fa8e34c0678620022f7d
//https://chrome.google.com/webstore/detail/spectorjs/denbgaamihkadbghdceggmchnflmhpmk
//https://tinypng.com/ to make smaller pngs
//https://github.com/BinomialLLC/basis_universal to make .basis files and get super compressed files for gpu

// THE IN DEPTH TIPS AND TRICKS
//https://discoverthreejs.com/tips-and-tricks/

/**
 * Tips are as such
 * 1- monitor FPS: (stats.js and add to tick)
 * 2- Disable FPS limit (gist github command above)
 * 3- Monitoring Draw Calls (with the spector js above)
 * 4- Renderer Informations (With console log)
 * 5- Good javascript code (keep performant native JScode esp in the TICK function)
 * 6- Dispose of things (scene.remove(cube) and cube.geometery.dispose(), etc)
 * 7- Avoid using Lights (three.js lights) (cheapest to use is Ambient and Directional)
 * 8- Avoid adding or removing Lights
 * 9- Avoid using Shadows
 * 10- Optimize shadow map. (if you need to use shadows) Use the camera helper to get the smallest shadow map as possible
 *     also try and use the smallest possible resolution
 * 11- Use Cast Shadow and Receive Shadow (as little as possible)
 * 12- Deactivate Shadow Auto Update (shadow maps should be paused alert when need update)
 * 13- resize textures (take up lots of gpu space, esp mip maps)(try and reduce resolution and keep it to a min with decent result)
 * 14- keep a power of 2 resolutions (when resizing)
 * 15- use the right file format (format only changes) (use jpg/png on compression and alpha channel)
 * 16- user buffer geometries (if before three.js version 125) else its all buffergeometeries
 * 17- Do not update vertices (terrible for performances) (do it when you create geometries and if you need to, do it in the vertex 
 *     shader)
 * 18- with the code on (tip 17) if you have multiple meshes using the same geometery shape, create only one shape and use it on all the
 *     meshes
 * 19- merge geometeries. ex {import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'} (and we don't need
 *     to instantiate it, we can directly use the methods.)
 *     --If the geometries aren't supposed to move, merge them into a single mesh (makes it only one draw call)
 * 20- Mutualize materials which is same type of material for multiple meshes, try to create only one and use it multiple times
 * 21- Use Cheap Materials (MeshStandardMaterial and MeshPhysicalMaterial) are more resource intensive (MeshBasicMaterial, 
 *     MeshLambertMaterial or MeshPhongMaterial) are less
 * 22- Use InstancedMesh for when you cant merge geometries because you need CONTROL OVER THE MESHES INDEPENDENTLY, but they are same 
 *     Geometry and Materials
 *     --First create an instanced mesh, then provide a transformation matrix for each instance of that mesh
 *     --MUST BE A MATRIX4 and can still move meshes by changing the matrices
 * 23- low poly (lower the poly the better), use normal maps where possible
 * 24- draco compression (use to reduce weight if model has tons of detail and comples geometries)
 * 25- Gzip (server side compression) (most servers dont gzip files such as .glb, .gltf, .obj)
 * 26- Field of view (Frustum Culling: when objects are not in field of view, they wont be rendered)
 * 27- near and far (Just like the FoV, you can reduce the near and far of the camera)
 * 28-
 * 29- Pixel Ratio- for devices for a very high pixel ratio. (more pixels to render worse frame rate) keep it to 2
 * 30- lower preferences (in WebGLRenderer by specifying powerPreference, we can hint at power needed with it)
 * 31- ANTIALIAS - Default is performant but less performant then none.
 * 32- Limit Passes (each Post processing pass will take as many pixels as renderers resolution by the passes)
 * 33- Specify Precision (you can force precision of shaders in the material by changing their Precision property - lowp )
 * 34- Keep Code simple (avoid if statements and use swizzles and built in functions)
 * 35- Use Textures (employing perlin noise function are cool. But it can affect performance considerably) (a texture2D() function is
 *     way cheaper and can produce the textures quite efficiently with tools like photoshop)
 * 36- Use defines (uniforms are nice but have a performance cost, if the value isnt supposed to change, use defines)
 * 37- Do the calculations in the vertex shader
 * 
 */

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/**
 * stats
 */
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const displacementTexture = textureLoader.load('/textures/displacementMap.png')

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
camera.position.set(2, 2, 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance', /////////////////////////////////////////////
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

/**
 * Test meshes
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial()
)
cube.castShadow = true
cube.receiveShadow = true
cube.position.set(- 5, 0, 0)
scene.add(cube)

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 128, 32),
    new THREE.MeshStandardMaterial()
)
torusKnot.castShadow = true
torusKnot.receiveShadow = true
scene.add(torusKnot)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
)
sphere.position.set(5, 0, 0)
sphere.castShadow = true
sphere.receiveShadow = true
scene.add(sphere)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial()
)
floor.position.set(0, - 2, 0)
floor.rotation.x = - Math.PI * 0.5
floor.castShadow = true
floor.receiveShadow = true
scene.add(floor)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, 2.25)
scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    stats.begin()

    const elapsedTime = clock.getElapsedTime()

    // Update test mesh
    torusKnot.rotation.y = elapsedTime * 0.1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    stats.end()
}

tick()

/**
 * Tips
 */

// // Tip 4 
// console.log(renderer.info)

// // Tip 6
// scene.remove(cube)
// cube.geometry.dispose()
// cube.material.dispose()

// // Tip 10
// directionalLight.shadow.camera.top = 3
// directionalLight.shadow.camera.right = 6
// directionalLight.shadow.camera.left = - 6
// directionalLight.shadow.camera.bottom = - 3
// directionalLight.shadow.camera.far = 10
// directionalLight.shadow.mapSize.set(1024, 1024)

// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(cameraHelper)

// // Tip 11
// cube.castShadow = true
// cube.receiveShadow = false

// torusKnot.castShadow = true
// torusKnot.receiveShadow = false

// sphere.castShadow = true
// sphere.receiveShadow = false

// floor.castShadow = false
// floor.receiveShadow = true

// // Tip 12
// renderer.shadowMap.autoUpdate = false
// renderer.shadowMap.needsUpdate = true

// // Tip 18
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// for(let i = 0; i < 50; i++)
// {
//     

//     const material = new THREE.MeshNormalMaterial()
    
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 19
// const geometries = []
// 
// for(let i = 0; i < 50; i++)
// {
//  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

//geometry.rotateX((Math.random() - 0.5) * Math.PI * 2)
//geometry.rotateY((Math.random() - 0.5) * Math.PI * 2)

    // geometry.translate(
    //     (Math.random() - 0.5) * 10,
    //     (Math.random() - 0.5) * 10,
    //     (Math.random() - 0.5) * 10
    // )
    // geometries.push(geometry)
// }
//const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries)
//
//
// const material = new THREE.MeshNormalMaterial()
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = (Math.random() - 0.5) * 10
// mesh.position.y = (Math.random() - 0.5) * 10
// mesh.position.z = (Math.random() - 0.5) * 10
// mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
// mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

// scene.add(mesh)

// // Tip 20
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// const material = new THREE.MeshNormalMaterial()

// for(let i = 0; i < 50; i++)
// {
// 

//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 22
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// const material = new THREE.MeshNormalMaterial()

// const mesh = new THREE.InstancedMesh(geometry, material, 50)
// scene.add(mesh)

// for(let i = 0; i < 50; i++)
// {

// const position = new THREE.Vector3(
//          (Math.random() - 0.5) * 10,
//          (Math.random() - 0.5) * 10,
//          (Math.random() - 0.5) * 10
//          )

// const quaternion = new THREE.Quaternion()
// quaternion.setFromEuler(new THREE.Euler(
//     (Math.random() - 0.5) * Math.PI * 2,
//     (Math.random() - 0.5) * Math.PI * 2,
//     0
//     )
// )
// const matrix = new THREE.Matrix4()
// matrix.makeRotationFromQuaternion(quaternion)
// matrix.setPosition(position)
// mesh.setMatrixAt(i, matrix)

    // mesh.position.x = (Math.random() - 0.5) * 10
    // mesh.position.y = (Math.random() - 0.5) * 10
    // mesh.position.z = (Math.random() - 0.5) * 10
    // mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
    // mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

    //scene.add(mesh)
//  }

// // Tip 29
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// // Tip 31, 32, 34 and 35
const shaderGeometry = new THREE.PlaneGeometry(10, 10, 256, 256)

const shaderMaterial = new THREE.ShaderMaterial({
    precision: 'lowp',
    uniforms:
    {
        uDisplacementTexture: { value: displacementTexture }
        //,uDisplacementStrength: { value: 1.5 } UNNEEDED BECAUSE OF THE DEFINE
    },
    vertexShader: `
        #define uDisplacementStrength 1.5

        uniform sampler2D uDisplacementTexture;


        varying vec2 vUv;
        varying vec3 vColor;

        void main()
        {

            //position
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            float elevation = texture2D(uDisplacementTexture, uv).r;
            modelPosition.y += max(elevation, 0.5); * uDisplacementStrength;
            gl_Position = projectionMatrix * viewMatrix * modelPosition;

            //color
            float colorElevation =  max(elevation, 0.25);
                        
            //vec3 depthColor = vec3(1.0, 0.1, 0.1);
            //vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
            vec3 finalColor = mix(vec3(1.0, 0.1, 0.1), vec3(0.1, 0.0, 0.5), colorElevation);

            //varying
            vColor = finalColor;
            vUv = uv;
        }
    `,
    fragmentShader: `
        varying vec3 vColor;

        void main()
        {

            //
            //
            // MOST CALCULATIONS SHOULD GO TO VERTEX SHADER, PASS IT HERE
            //
            //
            //float elevation = texture2D(uDisplacementTexture, vUv).r;
            //elevation = max(elevation, 0.25);

            //slow
            // if(elevation < 0.25)
            // {
            //     elevation = 0.25;
            // }

            // vec3 finalColor = vec3(0.0);
            // finalColor.r += depthColor.r + (surfaceColor.r - depthColor.r) * elevation;
            // finalColor.g += depthColor.g + (surfaceColor.g - depthColor.g) * elevation;
            // finalColor.b += depthColor.b + (surfaceColor.b - depthColor.b) * elevation;


            gl_FragColor = vec4(vColor, 1.0);
        }
    `
})

const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
shaderMesh.rotation.x = - Math.PI * 0.5
scene.add(shaderMesh)