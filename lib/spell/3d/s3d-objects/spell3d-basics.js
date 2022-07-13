import Spell3dObject from '../spell3d-object'
import * as THREE from 'three'
import * as _SC from "../../spell-consts"

const three_cameras = {
    "perspective-camera": THREE.PerspectiveCamera
}

const three_lights = {
    "ambient": THREE.AmbientLight,
    "directional": THREE.DirectionalLight
}

const three_geometries = {
    // 2D
    "plane-geometry": THREE.PlaneGeometry,
    "circle-geometry": THREE.CircleBufferGeometry,
    // 3D
    "box-geometry": THREE.BoxGeometry,
    "sphere-geometry": THREE.SphereGeometry,
    "cylinder-geometry": THREE.CylinderBufferGeometry,
    "torus-geometry": THREE.TorusBufferGeometry,
    "cone-geometry": THREE.ConeBufferGeometry,


}


const three_materials = {
    "standard-material": THREE.MeshPhysicalMaterial,
    "basic-material": THREE.MeshBasicMaterial,
    "shader-material": THREE.ShaderMaterial

}


export class SpellCamera extends Spell3dObject {
    constructor(data, defaults) {
        if (!defaults) {
            defaults = {
                [_SC.NODES.type]: "perspective-camera",
                _three_class: three_cameras[data[_SC.NODES.type]],
                _three_obj: null,
                _is_camera: true,
                fov: 20,
                ratio: window.innerWidth / window.innerHeight,
                _clipping: {
                    far: 5000,
                    close: 0.01
                }

            }
        }
        super(data, defaults)
        this._threes_class_args = [this.fov, this.ratio, this._clipping.close, this._clipping.far]
    }


}


export class SpellLight extends Spell3dObject {
    constructor(data, defaults) {
        if (!defaults) {
            defaults = {
                [_SC.NODES.type]: "light",
                _light: "ambient",
                _three_obj: null,
                color: 0xffffff,
                intensity: 1.0,
                _is_light: true,
            }
        }
        super(data, defaults)

        this._three_class = three_lights[data._light]
        this._threes_class_args = [this.color, this.intensity]
    }
}

export class SpellGeometry extends Spell3dObject {
    constructor(data, defaults) {
        if (!defaults) {
            defaults = {
                [_SC.NODES.type]: "geometry",
                _three_class: three_geometries[data[_SC.NODES.type]],
                _three_obj: null,
                width: data.width,
                height: data.height,
                depth: data.depth,
                _threes_class_args: [data.width, data.height, data.depth]
            }
        }
        super(data, defaults)
    }
}



export class SpellMaterial extends Spell3dObject {
    constructor(data) {
        const defaults = {
            _three_class: three_materials[data[_SC.NODES.type]],
            color: (data.color) ? data.color : 0xffffff,
            side: THREE.DoubleSide,
            // roughness: (data.roughness) ? data.roughness : 1,
        }


        super(data, defaults)

        //Spell 2 Three
        const s2t = {
            "_normal_map": "normalMap",
            "_dp_map": "displacementMap",
            "_texture_map": "map"
        }

        let tca_params = {
            color: this.color,
            side: this.side,
            // roughness: this.roughness
        }

        const add_map = (spell_name) => {
            const lmap = data[spell_name]
            if (lmap /*check file*/ ) {
                const keys = Object.keys(lmap)
                keys.forEach(key => {
                    if (key == "texture") {
                        try {
                            //console.log("loading texture " + lmap.texture)
                            tca_params[s2t[spell_name]] = new THREE.TextureLoader().load(lmap.texture);
                        } catch (e) {
                            console.error("SpellMaterial unable to load texture for " + spell_name + " reason:" + e)
                        }
                    } else {
                        if (typeof lmap[key] == "string" && lmap[key].startsWith("$")) { // spell value
                            const ks = lmap[key].split(" ")
                            if (ks[0] == "$v2") { //create vector 2
                                tca_params[key] = new THREE.Vector2(ks[1], ks[2])
                            }
                        } else {
                            tca_params[key] = lmap[key]
                        }

                    }
                })


            }

        }

        add_map("_normal_map")
        add_map("_dp_map")
        add_map("_texture_map")

        //dp_map

        this._threes_class_args = [tca_params]

    }

    load_texture(image_texture) {

        return texture
    }
}


export class SpellMesh extends Spell3dObject {

    static get_from_three_object(three_obj) {
        let mesh_spell = {
            _id: three_obj.name,
            [_SC.NODES.type]: "mesh",
            _three_obj: three_obj,
            name: three_obj.name,
            _position: three_obj.position,
            _rotation: three_obj.rotation,
            _geometry: three_obj.geometry,
            _material: three_obj.material,
        }
         //load animations
        if(mesh_spell._three_obj?.animations.length>0){
            console.log(mesh_spell._three_obj.animations);
        }
        return new SpellMesh(mesh_spell)
    }

    constructor(data, defaults = {
        [_SC.NODES.type]: "mesh",
        _three_class: THREE.Mesh,
        _three_obj:null,
        _geometry: null,
        _material: null
    }) {
        super(data, defaults)
        if(!this._three_obj) {
            this._geometry = new SpellGeometry(data._geometry)
            this._material = new SpellMaterial(data._material)
        }

    }

    async get_three() {
        if(!this._three_obj) {
            this._threes_class_args = [await this._geometry.get_three(), await this._material.get_three()]
        }
        return super.get_three()
    }
}


export class SpellGroup extends Spell3dObject {

    static get_from_three_object(three_obj) {
        const mesh_spell = {
            _id: three_obj.name,
            [_SC.NODES.type]: "group",
            _three_obj: three_obj,
            name: three_obj.name,
            _position: three_obj.position,
            _rotation: three_obj.rotation,
        }

         //load animations
         if(mesh_spell._three_obj?.animations){
            console.log(mesh_spell._three_obj.animations);
        }
        return new SpellGroup(mesh_spell)
    }

    constructor(data, defaults = {
        [_SC.NODES.type]: "group",
        _three_class: THREE.Group,
        _three_obj:null,
    }) {
        super(data, defaults)
    }

   

}



export class SpellSkeleton extends Spell3dObject {


    constructor(data, defaults = {
        [_SC.NODES.type]: "bone",
        _three_class: THREE.SkinnedMesh,
        _three_obj:null,
        _geometry: null,
        _material: null
    }) 
    
    {
        super(data, defaults)
        
        this._bones = [];

        const shoulder = new THREE.Bone();
        const elbow = new THREE.Bone();
        const hand = new THREE.Bone();

        shoulder.add( elbow );
        elbow.add( hand );

        this._bones.push( shoulder );
        this._bones.push( elbow );
        this._bones.push( hand );

        shoulder.position.y = -5;
        elbow.position.y = 0;
        hand.position.y = 5;
        this._skeleton = new THREE.Skeleton(this._bones)
        


        if(!this._three_obj) {
            this._geometry = new SpellGeometry(data._geometry)
            this._material = new SpellMaterial(data._material)
        }


        //this._threes_class_args = [this._skeleton]

    }

     /**
    * this method triggered after the THREE 3d object has been created
    * override to implement
    */
    async on_create() {
        //console.log("skeleton created");
        //this.
    }
    
}

