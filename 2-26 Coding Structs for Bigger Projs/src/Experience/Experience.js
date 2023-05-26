import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'

let instance = null

export default class Experience
{
    constructor(canvas)
    {   
        if(instance)
        {
            return instance
        }
        
        instance = this
        
        //forcing the window to take this class and be able to use it via console
        //global access
        window.experience = this

        //options
        this.canvas = canvas

        //setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        //sizes resize event
        this.sizes.on('resize', ()=> {
            this.resize()
        })

        //time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })

    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.renderer.update()
    }


}