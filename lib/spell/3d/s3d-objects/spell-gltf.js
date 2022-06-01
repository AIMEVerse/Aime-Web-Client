import * as THREE from 'three'
import { SpellCamera, SpellGeometry, SpellLight, SpellMaterial, SpellMesh,SpellGroup } from './spell3d-basics.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Spell3dObject from '../spell3d-object.js';
import Spell3d from '../spell3d.js';


export class SpellGLTFLoader {
    static load(file_name) {

        const load_onload = (gltf) => {

            //to-do fix group loading position
            
            gltf.scene.children.forEach(child => {
                let spell_object;
                if (child.type == "Mesh") {
                    spell_object = SpellMesh.get_from_three_object(child)
                }
                else if (child.type == "Group") {
                    spell_object = SpellGroup.get_from_three_object(child)
                }
                else if (child.type == "Object3D") {
                    spell_object = Spell3dObject.get_from_three_object(child)
                }
                Spell3d.add(spell_object)
            })
                
            
            
            
        }

        const load_onprogress = (data) => {
            //console.log(data);
            // this.loading=false

        }

        const load_onerror = (error) => {
            console.log(error);
            this.loading = false

        }

        const loader = new GLTFLoader()
        loader.load(file_name, load_onload, load_onprogress, load_onerror);
    }

    

}

export default SpellGLTFLoader 