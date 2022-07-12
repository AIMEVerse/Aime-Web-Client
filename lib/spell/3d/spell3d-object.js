import SpellUtils from "../spell-utils.js"
import SpellParser from "../spell-parser.js"
import * as _SC from "../spell-consts.js"


const reserved_words = {}
const spell_object_html_fields_mapping = {
    "_id": "id",
};
import * as THREE from 'three'

import nano_spell from './nano-spells/s3do-nano-spells.js'



class Spell3dObject {

    static get_spell_data(three_obj, defaults) {
        let _spell_data = {
            _id: three_obj.name,
            _type: "spell3d-object",
            _three_obj: three_obj,
            name: three_obj.name,
            _position: three_obj.position,
            _rotation: three_obj.rotation,
            _scale: three_obj.scale,
        }
        if (defaults) {
            SpellUtils.merge_defaults_with_data(_spell_data, defaults)
        }
        return _spell_data
    }

    static get_from_three_object(three_obj, defaults) {
        let _spell_data = Spell3dObject.get_spell_data(three_obj, defaults)
        return new Spell3dObject(_spell_data)
    }

    static descriptor() {
        return {
            name: null,
            description: null
        }

    }

    constructor(data, defaults) {
        if (defaults) {
            SpellUtils.merge_defaults_with_data(data, defaults)
        }
        this._id = (data && data._id) ? data._id : "s3do-" + SpellUtils.guid();
        this._three_class = null
        this._three_obj = null
        this._position = { x: 0, y: 0, z: 0 }
        this._rotation = { x: 0, y: 0, z: 0 }
        this._scale = { x: 1, y: 1, z: 1 },
            this._visible = true
        this._type = "spell3d-object";
        this[_SC.NODES.child_spells] = [];
        this._animation = true
        this._animation_clips = {}
        this._fade_duration = 0.2
        this._ignore = reserved_words
        this._clock = new THREE.Clock();
        this._fraction = 0
        this._threes_class_args = []

        reserved_words[_SC.NODES.child_spells] = "child spells"
        
        if (data) {
            if (data.hasOwnProperty("_ignore")) {
                this._ignore = SpellUtils.create_ignore_list(data["_ignore"])
            }
            this.parse(data, this._ignore);
        }


        this._nano_spells = nano_spell
    }


    /**
     * occurs on Spell.init
     * @override 
     */
    init() {
        // console.log("init " + this._type ) //DEBUG
    }


    set_3d_state() {
        if (this._three_obj) {
            this._three_obj.position.set(this._position.x, this._position.y, this._position.z)
            this._three_obj.rotation.set(this._rotation.x, this._rotation.y, this._rotation.z)
            this._three_obj.scale.set(this._scale.x, this._scale.y, this._scale.z)
            this._three_obj.visible = this._visible
        }
    }

    parse(data, ignore = reserved_words) {
        let cdata = Object.keys(data);
        cdata.forEach(field => {
            if (!ignore.hasOwnProperty(field) && data.hasOwnProperty(field)) {
                this[field] = data[field];
            }
        });
        if (!this.name) {
            this.name = this._id
        }
    }


    load() { }



    async load_animations() {
        const anim = this._three_obj.animations
        if(this._three_obj && anim?.length>0) {
            console.log(anim);
            this._animation_mixer = new THREE.AnimationMixer(this._three_obj)
            anim.forEach(__anim => {
                this._animation_clips[__anim.name] = this._animation_mixer.clipAction(__anim)
                console.log("animation " + __anim.name + " loaded");
            })
        }
        
    }

    /**
     * @override
     */
    async get_three() {

        if (!this._three_obj) {
            this._three_obj = new this._three_class(...this._threes_class_args)
            this._three_obj.name = this.name
            this._clock.start()
            this.on_create()
            const keys = Object.keys(this)

            const s2t_props = [""]
            keys.forEach(key => {
                if (!key.startsWith("_")) {
                    if (key == "color") {
                        this._three_obj[key] = new THREE.Color(this[key]);
                    } else {
                        this._three_obj[key] = this[key]
                    }

                    /* FIELD Checker - debug only unmark and add fields
                    const flds = ["name","height","width","visible","side","roughness"]
                    if(this[key] && flds.includes(key)){
                        this._three_obj[key] = this[key]
                    }
                    */
                }
            })
            
        }




        return this._three_obj
    }



    /**
     * on_frame function for spell3d-object
     * - parse textual command to SpellCommand and cache
     * - set 3d-state (position, rotation & scale) if Spell in control
     * - update animation mixer if exists
     * @param {number} frame_number 
     */
    async on_frame(frame_number) {

        this._frame_number = frame_number
        if (this.onframe) {
            //const cmd = this.onframe.split(" ")
            const cmd_txt = this.name + " " + this.onframe
            let jcmd = (this._cache_cmd_txt && this._cache_cmd_txt == cmd_txt) ? this._cache_jcmd : SpellParser.parse(cmd_txt)

            //cache command to prevent parsing in every frame
            this._cache_cmd_txt = cmd_txt
            this._cache_jcmd = jcmd

            this.execute(jcmd)


        }
        //check if _disable_frame_3d_state is in the Spell object
        // _disable_frame_3d_state disables on_frame positioning by Spell (for external controllers like Orbit Controls)
        if (!this._disable_frame_3d_state) {
            this.set_3d_state()
        } else {
            //set 3d state once for inital poistion/rotation
            // to override this set "_3d_set_once":false on Spell object input data
            if (!this._3d_set_once) {
                this.set_3d_state()
                this._3d_set_once = true
            }
        }




        if (this._animation_mixer && this._current_action) {
            const diff = this._clock.getDelta()
            this._animation_mixer.update(diff)
        }

    }


    /**
    * this method triggered after the THREE 3d object has been created
    * override to implement
    */
    async on_create() {
    }


    /**
     * execute spell command in the local 3d object
     * @param {JSON} spell command (json format)
     */
    async execute(jcmd) {

        //limited spell 





        if (this._nano_spells[jcmd.op]) {
            jcmd.s3d_object = this
            this._nano_spells[jcmd.op](jcmd)
        } else throw this.name + " has no op name " + jcmd.op
    }

    append(spell3d_object) {
        this[_SC.NODES.child_spells].push(spell3d_object);
    }


    show() { this._visible = true }

    hide() { this._visible = false }
}

export default Spell3dObject