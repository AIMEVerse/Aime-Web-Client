/*
import * as THREE from 'three'

import {FBXLoader} from '/public/libs/three137/modules/jsm/loaders/FBXLoader.js';
import Spell3dObject from '../spell3d-object.js';


class SpellFBXMesh extends Spell3dObject {
 constructor(data) {

  const file_name = data._file


  super(data)
  this.loading = true
  const sthis = this //strong this

  const load_onload = (fbx) => {
   console.log(fbx);
   sthis._three_obj = fbx.children[0];
   sthis.bounding_box = new THREE.Box3().setFromObject(sthis._three_obj);
   sthis._three_obj.name = sthis.name
   if (fbx.animations && fbx.animations.length > 0) {
    //sthis._clip_animations = fbx.animations
    sthis._animation_mixer = new THREE.AnimationMixer(sthis._three_obj)
    fbx.animations.forEach(__anim => {
     sthis._animation_clips[__anim.name] = this._animation_mixer.clipAction(__anim)
    })
    console.log(sthis._animation_clips)

   }
   this.loading = false
  }

  const load_onprogress = (data) => {
   // console.log(data);
   // this.loading=false

  }

  const load_onerror = (error) => {
   console.log(error);
   this.loading = false

  }

  SpellFBX.loader.load(file_name, load_onload, load_onprogress, load_onerror);
 }

 async get_three() {
  while (this.loading) {
   await new Promise(r => setTimeout(r, 100));
  }
  // const wait = new Promise((resolve, reject) => {
  //     setTimeout(() => {console.log("resolve");resolve()}, 6000);
  //   });

  return this._three_obj
 }

}

class SpellFBXClass {
 constructor() {
  this.loader = new FBXLoader();
 }

 get_objects() {
  return {
   "fbx-mesh": SpellFBXMesh
  }
 }
}


const SpellFBX = new SpellFBXClass()

export default SpellFBX
export {SpellFBX, SpellFBXMesh}*/
