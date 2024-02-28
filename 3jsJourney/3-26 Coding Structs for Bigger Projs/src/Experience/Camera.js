import * as THREE from 'three'
import Experience from "./Experience.js"
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols.js'


export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()

    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width/ this.sizes.height, .1, 100)
        this.instance.position.set(6,4,8)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width/this.sizes.height
        this.instance.updateProjectionMatrix()
    }
    
    update()
    {
        this.controls.update()
    }

}

    // #1 
    //  Global variable 
    //
    // this code from the script allows for data to be send around
    // const exp = new Experience(document.querySelector('canvas.webgl'))
    // 
    //
    //  #2 
    //  parameter
    //
    // sending a parameter for which is the object
    // but needs a bunch of gets and sets to function
    //
    // constructor(experience)
    // {
    //     this.experience = experience
    // }
    //
    //
    // #3
    // Singleton class
    // 
    // The one we are actively using
    //
    //








