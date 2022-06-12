/**
 * Spell3d.JS
 * @description Universal User Interface (UI) Engine for Javascript supporting devices & browsers
 * Wrapper for THREE.JS engine
 * @author Tamir Fridman <tamirf@yahoo.com>
 * @since  03/09/2020
 * @copyright AIMEVerse Web3 Technologies 2022, all right reserved
 *
 *      This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License
 *  as published by the Free Software Foundation; either version
 *  3 of the License, or (at your option) any later version.
 *
 *  change-log:
 *  - events
 */

//import SpellUI from "../ui/spell-ui.js"
import * as THREE from 'three'
import SpellModule from "../spell-module.js"
import SpellObjectManager from "../spell-object-manager.js";
import SpellUtils from "../spell-utils.js";

import Spell3dObject from "./spell3d-object.js"
import { SpellEventManager, SpellEvents } from "../spell-event-manager.js"
import Spell3dWorld from "./spell3d-world.js"
import SpellPrimitives from "./s3d-objects/spell3d-primitives.js"
import SpellGLTFLoader from "./s3d-objects/spell-gltf.js"
/*import SpellFBXmodels from "./s3d-objects/spell-fbx.js"*/
import SpellData from "../spell-data.js";
import { CubeTextureLoader } from 'three';

const Spell3dEngineStatus = {
  New: 0,
  Ready: 1,
  Running: 2,
  Stopped: 3
}

class Spell3dEngine {

  constructor() {
    this.engine_id = SpellUtils.guid()
    this.status = Spell3dEngineStatus.New
    this.om = new SpellObjectManager()
    this.om.register_objects(SpellPrimitives.get_objects())

    /*  this.om.register_objects(SpellFBXmodels.get_objects())*/
    //SpellObjects.load(this)
    SpellData.objects["spell3d-om"] = this.om
    this.world = null
    this.s3d_objects = {}
    SpellEventManager.fire(SpellEvents.engine3d_init)
  }


  async load_world(spell3d_world, auto_run = true) {

    this.world = new Spell3dWorld(spell3d_world, this)
    this.status = Spell3dEngineStatus.Ready

    

    window.addEventListener('resize', () => {
      Spell3d.on_window_resize()
    }, false);

    if (auto_run) {
      await this.run()
    }
  }


  //get spell3d object
  create(data) {

    if (this.om.has_object_class(data._type)) {
      const spell_class = this.om.get_object_class(data._type)
      const obj = new spell_class(data)
      this.om.add_object(obj)
      return obj
    } else return null
  }

  //get spell3d object
  add(spell3d_object) {
    this.world.add_spell3d_object(spell3d_object)
    this.om.add_object(spell3d_object)
  }


  /**
   * plays  Spell program
   * @param spell_program - program to be loaded
   */
  play(spell_program) {
    let cmd = SpellCLIParser.parse_spell(spell_program);
    //console.log(JSON.stringify(cmd));
  }


  on_window_resize() {
    this.world.on_window_resize()
  }

  //being called by requestAnimationFrame (different "this" scope)
  async on_frame(frame_number) {
    if (this.status == Spell3dEngineStatus.Running) {
      //console.log("running frame " + this.frame_number);
      this.world.on_frame(this.frame_number)
      // Spell.on_frame(this.frame_number)
      this.frame_number = frame_number
      //requestAnimationFrame(() => {Spell3d.on_frame()})

    }

  }

  async run() {
    console.log("Running 3d engine");
    this.status = Spell3dEngineStatus.Running
    await this.world.run()
    this.frame_number = 0
    //this.on_frame()
    SpellEventManager.fire("spell3d-world-load")
  }

  get_objects_available() {
    const rejected_words = ["material", "geometry", "mesh"];
    const obj_names = Object.keys(SpellPrimitives.get_objects());
    let shapes_list = [];

    shapes_list = obj_names.filter((el) => !rejected_words.includes(el));
    return shapes_list
    // console.log(shapes_list);
  }


  raycast(e) {
    const cam = this.world.default_camera;
    const mouse = { x: 0, y: 0 }

    const div = e.target


    if (div.tagName.toLowerCase() != this.world.renderer.domElement.tagName.toLowerCase()) return

    if (e.which != 1) return;


    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;


    this.world.raycaster.setFromCamera(mouse, cam);


    const intersects = this.world.raycaster.intersectObjects(this.world.scene.children);
    if (intersects[0]?.object) {
      //to-do add op for 
      let obj = intersects[0].object
      if (intersects[0].object.parent.parent) {
        obj = intersects[0].object.parent
      }
      
      document.getElementById("spell-command").value = obj.name + " "
      //this.set_world_control_target(intersects[0].object.position)
    }
  }

  set_world_control_target(cameraTarget) {

    if (this.world.controls) {
      //console.log('lock')
      //const cameraTarget = new THREE.Vector3(0.2,0.2,0)
      //this.world.controls.target = cameraTarget
      this.world.default_camera.position.set(cameraTarget.x, cameraTarget.y + 0.5, cameraTarget.z + 3)
    }
  }
  
  // To Move
  // Add environment_map
  add_environment_map(path, images) {
    document.addEventListener('keydown', (event) => {
      // const world = this.world;
    
      switch (event.code) {
        case 'KeyG':
          this.world.widgetControlls.setMode('translate')
          console.log("trans");
          break
        case 'KeyR':
          this.world.widgetControlls.setMode('rotate')
          console.log("rota");
          break
        case 'KeyS':
          this.world.widgetControlls.setMode('scale')
          console.log("scale");
          break
      }
    })
    



    const loader = new THREE.CubeTextureLoader();
    const environmentMap = loader
      .setPath(path)
      .load(images)
    // console.log(environmentMap);

    // Add Fog
    // const color = 0xeeaaaa;
    // const near = 10;
    // const far = 100;
    // this.world.scene.fog = new THREE.Fog(color, near, far);

    this.world.scene.background = environmentMap;
  }

  set_camera_path(data) {
    console.log("building path");

    
    
    const pointsPath = new THREE.CatmullRomCurve3(this.world.cam_path,true);
    console.log(pointsPath);


    const material = new THREE.MeshBasicMaterial({
      color: 0x9132a8
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(pointsPath.getPoints(50));


    const path_line = new THREE.Line(geometry, material);

    this.world.scene.add(path_line)

    SpellData.objects["cam-path"] = pointsPath
    //console.log(path_line);

  }

  set_camera_path_point(data) {
    const po = SpellData.objects["joystick-vector"].clone() //push object
    if(!this.world.cam_path) {
      this.world.cam_path = []
    } 
    this.world.cam_path.push(po)
    


  }

}


export class Spell3dModule extends SpellModule {
  constructor(data) {
    const defaults = { name: "spell3d" }
    super(data, defaults)
    this.engine = Spell3d
  }


  _create(scmd) {
    return this.engine.create(scmd)
  }

  _add(scmd) {
    const oparams = scmd.params
    const so = this._create(oparams)
    this.engine.world.add_spell3d_object(so)
    //console.log(so)
  }

  _info(scmd) {
    // if(scmd.params) {
    //     const prms = Object.keys(scmd.params)
    //     prms.forEach(key => {
    //         const v = scmd.params[prms]

    //     })
    // }
    return this.engine.engine_id
  }

  _move(scmd) {
    const world = this.engine.world;
    if (world.controls) {
      if (scmd.params.dir == 'r') {
        world.controls.moveRight(scmd.params.step)
      }
      else if (scmd.params.dir == 'f') {
        world.controls.moveForward(scmd.params.step)
      }
    }
  }

  _log(scmd) {
    console.log(this.engine)
  }

  _world_lock_controls(scmd) {
    const world = this.engine.world;
    if (world.controls) {
      //console.log('lock')
      world.controls.lock()
    }
  }

  _world_control_set_target(scmd) {
    const world = this.engine.world;
    if (world.controls) {
      //console.log('lock')
      const cameraTarget = new THREE.Vector3(0.2, 0.2, 0)
      world.controls.target = cameraTarget
    }
  }

  _load_gltf(scmd) {
    //console.log(scmd.params.file)
    SpellGLTFLoader.load(scmd.params.file)
  }

  //expose on_frame method to spell engine
  on_frame(frame_number) {
    this.engine.on_frame(frame_number)
  }


}

let Spell3d = new Spell3dEngine()

export default Spell3d
export { Spell3d, Spell3dEngineStatus, Spell3dObject }