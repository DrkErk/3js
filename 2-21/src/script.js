/**
 * 
Ammo.js
Website: http://schteppe.github.io/ammo.js-demos/
Git repository: https://github.com/kripken/ammo.js/
Documentation: No documentation
Direct JavaScript port of Bullet (a physics engine written in C++)
A little heavy
Still updated by a community

Cannon.js
Website: https://schteppe.github.io/cannon.js/
Git repository: https://github.com/schteppe/cannon.js
Documentation: http://schteppe.github.io/cannon.js/docs/
Lighter than Ammo.js
More comfortable to implement than Ammo.js
Mostly maintained by one developer
Hasn't been updated for many years
There is a maintained fork

Oimo.js
Website: https://lo-th.github.io/Oimo.js/
Git repository: https://github.com/lo-th/Oimo.js
Documentation: http://lo-th.github.io/Oimo.js/docs.html
Lighter than Ammo.js
Easier to implement than Ammo.js
Mostly maintained by one developer
Hasn't been updated for 2 years
2D Physics
For 2D physics, there are many libraries, but here's the most popular:

Matter.js
Website: https://brm.io/matter-js/
Git repository: https://github.com/liabru/matter-js
Documentation: https://brm.io/matter-js/docs/
Mostly maintained by one developer
Still kind of updated

P2.js
Website: https://schteppe.github.io/p2.js/
Git repository: https://github.com/schteppe/p2.js
Documentation: http://schteppe.github.io/p2.js/docs/
Mostly maintained by one developer (Same as Cannon.js)
Hasn't been update for 2 years

Planck.js
Website: https://piqnt.com/planck.js/
Git repository: https://github.com/shakiba/planck.js
Documentation: https://github.com/shakiba/planck.js/tree/master/docs
Mostly maintained by one developer
Still updated nowadays

Box2D.js
Website: http://kripken.github.io/box2d.js/demo/webgl/box2d.html
Git repository: https://github.com/kripken/box2d.js/
Documentation: No documentation
Mostly maintained by one developer (same as Ammo.js)
Still updated nowadays
 */


import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import CANNON, { Material, Vec3 } from 'cannon'


/**
 * Debug
 */
const gui = new dat.GUI()
const debugObj = {}

debugObj.createSphere = () =>
{
        createSphere(
            Math.random() * .5, 
            {
                x:(Math.random() - .5) *3, 
                y:3 ,
                z:(Math.random() - .5 )*3
            })

}
debugObj.createBox = () =>
{
        createBox(
            Math.random(), 
            Math.random(), 
            Math.random(), 
            {
                x:(Math.random() - .5) *3, 
                y:3 ,
                z:(Math.random() - .5 )*3
            })

}
debugObj.reset = () =>
{
    
    for(const object of objectsToUpdate)
    {
        // Remove body
        object.body.removeEventListener('collide', playHitSound)
        world.removeBody(object.body)

        // Remove mesh
        scene.remove(object.mesh)
    }
    /** 
    for(const object of objectsToUpdate)
    {
        object.body.removeEventListner('collide', playHitSound)
        world.removeBody(object.body)
        
    }

    scene.remove(object.mesh)

    */
    objectsToUpdate.splice(0, objectsToUpdate.length)
}

gui.add(debugObj, 'reset')
gui.add(debugObj, 'createSphere')
gui.add(debugObj, 'createBox')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * sounds
 */
const hitSound = new Audio('/sounds/hit.mp3')

const playHitSound = (collision) =>
{
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()

    if (impactStrength > 1.5)
    {
    hitSound.volume = Math.random() 
    hitSound.currentTime = 0
    hitSound.play()
    }
}

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**
 * Physics
 */
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, -9.82, 0)

//materials
const defaultMaterial = new CANNON.Material('default')

const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: .1,
        restitution: .7
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial

/*

setting up seperate materials

const concreteMaterial = new CANNON.Material('concrete')
const plasticMaterial = new CANNON.Material('plastic')

const concretePlasticContactMaterial = new CANNON.ContactMaterial(
    concreteMaterial,
    plasticMaterial,
    {
        friction: .1,
        restitution: .7
    }
)
world.addContactMaterial(concretePlasticContactMaterial)
*/

/**
 * sphere
 */
const sphereShape = new CANNON.Sphere(.5)
const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: sphereShape
 //   material: defaultMaterial     YOU CAN PUT IT INLINE
})
sphereBody.applyLocalForce(
    new CANNON.Vec3(150, 0, 0),
    new CANNON.Vec3(0,0,0)
    )

world.addBody(sphereBody)

//floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
//floorBody.material = defaultMaterial   CAN PUT IT INLINE
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    - Math.PI * .5
)
world.addBody(floorBody)


/**
 * Test sphere
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
sphere.castShadow = true
sphere.position.y = 0.5
scene.add(sphere)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Utils
 */

const objectsToUpdate = []

const sphereGeometry =  new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: .3,
    roughness: .4,
    envMap: environmentMapTexture
})

const createSphere = (radius, position) =>
{
    //THREE.JS MESH
    const mesh = new THREE.Mesh(
       sphereGeometry,
       sphereMaterial
    )
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    //CANNON JS BODY
    const shape = new CANNON.Sphere(radius)

    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0,3,0),
        shape: shape,
        material:defaultMaterial
    })
    body.addEventListener('collide', playHitSound)
    body.position.copy(position)

    world.addBody(body)

    //save in objects to update
    objectsToUpdate.push({
        mesh,
        body
    // same name can do the above
    //    mesh: mesh,
    //    body: body
    })
}

createSphere(.5,{x:0,y:3,z:0})
createSphere(.5,{x:2,y:3,z:2})

/**
 * BOX
 */

const boxGeometry =  new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({
    metalness: .3,
    roughness: .4,
    envMap: environmentMapTexture
})

const createBox = (width, height, depth, position) =>
{
    //THREE.JS MESH
    const mesh = new THREE.Mesh(
       boxGeometry,
       boxMaterial
    )
    mesh.scale.set(width, height, depth)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    //CANNON. JS BODY
    const shape = new CANNON.Box(new CANNON.Vec3(width * .5, height  * .5, depth  * .5))

    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0,3,0),
        shape: shape,
        material:defaultMaterial
    })
    body.position.copy(position)
    world.addBody(body)

    //save in objects to update
    objectsToUpdate.push({
        mesh,
        body
    // same name can do the above
    //    mesh: mesh,
    //    body: body
    })
}

createSphere(.5,{x:0,y:3,z:0})
createSphere(.5,{x:2,y:3,z:2})


/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    //update physics world

    for (const object of objectsToUpdate)
    {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }

    sphereBody.applyForce(new CANNON.Vec3(-.5, 0, 0), sphereBody.position)
    world.step( 1/60, deltaTime, 3)
    sphere.position.copy(sphereBody.position)
  /** instead of the three, you can do above  
    sphere.position.x = sphereBody.position.x
    sphere.position.y = sphereBody.position.y
    sphere.position.z = sphereBody.position.z
  */  

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()