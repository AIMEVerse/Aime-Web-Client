

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'



import SpellUtils from '../spell-utils';
import SpellData from '../spell-data';



/**
 * Spell3dWorld
 */


const SpellWorldStatus = {
    New: 0,
    Running: 1,
    Paused: 2
}


const get_renderer = (renderer) => {

    const renderers = {
        "webgl": THREE.WebGLRenderer
    }

    let rv = new renderers[renderer._type](renderer.settings)
    return rv
}



const world_defaults = {
    "html-wrapper": "body",
    renderer: {
        _type: "webgl",
        settings: { antialias: true, alpha: true }
    },
    scene: {
        lights: {
            "main": {
                _type: "ambient",
                color: 0x444477
            }
        },
        cameras: {
            "main": {
                _type: "perspective",
                fov: 20,
                ratio: window.innerWidth / window.innerHeight,
                clipping: {
                    far: 5000,
                    close: 0.01
                },
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 }
            }
        }
    }

}



class Spell3dWorld {

    constructor(spell_world, engine) {

        SpellUtils.mergeDefaultsWithData(spell_world, world_defaults)

        this.status = SpellWorldStatus.New
        this.world_raw_data = spell_world
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.renderer = get_renderer(spell_world.renderer)
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setClearColor(0x000000, 1); // the default color
        this.frame_number = 0
        this.spell3d = engine
        this.raycaster = new THREE.Raycaster()
        this.widgetControlls = {}
        
        this.lights = {}
        this.spell3d_objects = {}
        this.default_camera = null







    }


    async run() {
        console.log("Running 3d World")
        this.status = SpellWorldStatus.Running

        const spell_world = this.world_raw_data

        //get cameras

        let idx = 0

        // this.default_camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.01, 5000 );
        // this.default_camera.position.set(0,0,55)
        // this.scene.add(this.default_camera)

        if (spell_world.scene.cameras) {
            const keys = Object.keys(spell_world.scene.cameras)
            for (let i = 0; i < keys.length; ++i) {
                const camera = spell_world.scene.cameras[keys[i]]
                camera.name = keys[i]
                let cam = this.spell3d.create(camera)


                this.default_camera = await this.add_spell3d_object(cam)



            }
        } else {
            console.log("Spell3d world -> no Cameras defined")
        }

        //get lights
        if (spell_world.scene.lights) {
            Object.keys(spell_world.scene.lights).forEach(light_name => {
                const lgt = spell_world.scene.lights[light_name]
                let light = this.spell3d.create(lgt)//get_light(spell_world.scene.lights[light_name])
                light.name = light_name
                this.add_spell3d_object(light)
                // if (spell_world.scene.lights[light_name]._helper && light.type == "DirectionalLight") {
                //     const helper = new THREE.DirectionalLightHelper(light)
                //     this.scene.add(helper)
                // }
                // else {
                //     this.scene.add(light);
                // }
            })
        } else {
            console.log("Spell3d world -> no Lights defined")
        }


        //get spell3d-objects
        Object.keys(spell_world["spell3d-objects"]).forEach(async s3dobj => {
            let ob = spell_world["spell3d-objects"][s3dobj]
            ob.name = s3dobj
            let obj = this.spell3d.create(ob)
            await this.add_spell3d_object(obj)
        })


        document.getElementById(spell_world["html-wrapper"]).appendChild(this.renderer.domElement);

        //this.gui = new dat.GUI();

        // Helpers
        this.scene.add(new THREE.AxesHelper(5))


        if (spell_world.scene.controls) {
            Object.keys(spell_world.scene.controls).forEach(async ctrl => {
                let control = spell_world.scene.controls[ctrl]
                if (control._type == "orbit" && control._active) {
                    this.controls = new OrbitControls(this.default_camera, this.renderer.domElement);
                    if (control._damp) {
                        this.controls.enableDamping = true;

                    }


                    if (control._params) {
                        Object.keys(control._params).forEach(key => {
                            this.controls[key] = control._params[key]
                        })
                    }
                    // this.controls.minPolarAngle = Math.PI/2.5
                    // this.controls.maxPolarAngle = Math.PI/1.5
                    // this.controls.minDistance = 2
                    // this.controls.maxDistance = 10
                    // this.controls.rotateSpeed = 0.3

                }
                else if (control._type == "pointer" && control._active) {
                    this.controls = new PointerLockControls(this.default_camera, this.renderer.domElement);
                }
                else if (control._type == "first-person" && control._active) {
                    this.controls = new FirstPersonControls(this.default_camera, this.renderer.domElement);
                    this.controls.activeLook = true
                    this.controls.lookSpeed = 0.3;
                    this.controls.movementSpeed = 50;
                    this.controls.lookVertical = true;
                    this.controls.constrainVertical = true;
                    this.controls.verticalMin = Math.PI / 2;
                    this.controls.verticalMax = 1.5;
                    this.controls.autoForward = false;
                }
            })
        }



        this.render();

    }

    on_window_resize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.default_camera.aspect = w / h;
        this.default_camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    async add_spell3d_object(obj) {

        if (obj && !obj._ignore_world) {
            //if(!obj._is_light) {console.log("SpellWorld adding ", obj)}
            this.spell3d_objects[obj.name] = obj
            const tobj = await obj.get_three()

            // if (tobj.name == "cube") {
            //     this.create_transform_controls(tobj)
            // }



            this.scene.add(tobj)

            return tobj
        }


    }



    create_transform_controls(obj) {
        this.widgetControlls = new TransformControls(this.default_camera, this.renderer.domElement)
        this.widgetControlls.addEventListener("dragging-changed", (e) => {

            this.controls.enabled = ! e.value
        })
        this.widgetControlls.attach(obj)
        this.scene.add(this.widgetControlls)
    }

    // being called on every frame 
    onFrame(frame_number) {

        if (this.status == SpellWorldStatus.Running) {
            this.clock.start()
            this.frame_number = frame_number
            Object.keys(this.spell3d_objects).forEach(obj_name => {

                const off = this.spell3d_objects[obj_name].onFrame
                if (off && (typeof off === 'function')) {
                    this.spell3d_objects[obj_name].onFrame(frame_number)
                }
            })
            //update object move
            this.render()
            if (this.controls && this.controls.update) {
                this.controls.update(this.clock.getDelta());
                SpellData.variables["control-azimuth"] = this.controls.getAzimuthalAngle()
                const tv = SpellData.objects["control-target"]
                const cp = SpellData.objects["cam-path-pos"]

                if (tv) {
                    //console.log(tv)
                    //this.controls.target.set(tv)
                    this.default_camera.position.sub(this.controls.target)
                    this.controls.target.copy(tv)
                    this.default_camera.position.add(tv)
                    delete SpellData.objects["control-target"]
                }
                else if (cp) {
                    //const tv = SpellData.objects["control-target"] 
                    // console.log(this.controls.target)
                    // this.default_camera.position.sub(this.controls.target)
                    // //console.log(cp);
                    // this.controls.target.copy(cp)
                    this.default_camera.position.add(cp)
                    // console.log(SpellData.objects["cam-path-rotation"]);
                    this.default_camera.lookAt(new THREE.Vector3(0,0,0))
                    // this.default_camera.rotation.set(SpellData.objects["cam-path-rotation"])
                }
            }




            this.clock.stop()
            this.frame_process_time = this.clock.getElapsedTime()

            //console.log(this.frame_process_time)


        }
    }

    //draw screen
    render() {
        if (this.default_camera) {
            this.renderer.render(this.scene, this.default_camera);
        }

    }




}


export default Spell3dWorld