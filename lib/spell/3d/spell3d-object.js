import SpellUtils from "../spell-utils.js"
import SpellParser from "../spell-parser.js"

const reserved_words = {
    "spells": "child spells"
}
const spell_object_html_fields_mapping = {
    "_id": "id",
};
import * as THREE from 'three'
import {
    Quaternion
} from "three";
import SpellData from "../spell-data.js";

class Spell3dObject {

    static get_from_three_object(three_obj, defaults) {
        const _spell_data = {
            _id: three_obj.name,
            _type: "spell3d-object",
            _three_obj: three_obj,
            name: three_obj.name,
            _position: three_obj.position,
            _rotation: three_obj.rotation,
            _scale:three_obj.scale,
        }
        if (defaults) {
            SpellUtils.merge_defaults_with_data(_spell_data, defaults)
        }
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
        this._position = {
            x: 0,
            y: 0,
            z: 0
        }
        this._rotation = {
            x: 0,
            y: 0,
            z: 0
        }
        this._scale = {
            x: 1,
            y: 1,
            z: 1
        },
            this.visible = true
        this._type = "spell3d-object";
        this._spells = [];
        this._animation = true
        this._animation_clips = {}
        this._fade_duration = 0.2
        this._ignore = reserved_words
        this._clock = new THREE.Clock();
        this._fraction = 0
        this._threes_class_args = []

        if (data) {
            if (data.hasOwnProperty("_ignore")) {
                this._ignore = SpellUtils.create_ignore_list(data["_ignore"])
            }
            this.parse(data, this._ignore);
        }
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
            this._three_obj.visible = this.visible
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

    /**
     * @override
     */
    async get_three() {

        if (!this._three_obj) {
            this._three_obj = new this._three_class(...this._threes_class_args)
            this._three_obj.name = this.name
            // this._three_obj.DefaultUp = new THREE.Vector3(0, 0, 1)
        }


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
        this._clock.start()
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
     * execute spell command in the local 3d object
     * @param {JSON} spell command (json format)
     */
    async execute(jcmd) {

        //limited spell 


        const get_param = (pos, name, cmd) => {
            return (cmd.params[name]) ? cmd.params[name] : cmd.params[pos]
        }


        /**
         * change axis value
         * @param {axis root/parent} root -> this._position / this._rotation / this._scale
         * @param {JSON} scmd - spell command 
         * 
         * spell command parameters: 
         * - axis -> the axis to change (x/y/z)
         * - dir -> change direction (up/down)
         * - step -> step to move
         */
        const change_axis = (root, scmd) => {
            const axis = get_param(0, "axis", scmd) // (scmd.params.axis) ? scmd.params.axis : scmd.params[0]
            const direction = get_param(1, "dir", scmd).toLowerCase()
            const step = parseFloat(get_param(2, "step", scmd))
            if (direction == "up") {
                root[axis] += step
            } else if (direction == "down") {
                root[axis] -= step
            }
        }



        const set_axis = (root, axis, param) => {

            if (param) {
                if (param.startsWith("++")) {
                    param = param.substring(1)
                    // console.log("changing ++",param)
                    root[axis] += parseFloat(param)
                } else if (param.startsWith("--")) {

                    param = param.substring(1)
                    // console.log("changing --",param)
                    root[axis] -= parseFloat(param) * (-1)
                } else {
                    // console.log("no changing")
                    root[axis] = parseFloat(param)
                }

            }

        }


        //ops - add commands here
        const of_ops = {
            "move": (scmd) => {
                //move axis direction 1 
                // axis x,y,z
                // direction up (+) / down (-)
                // step 1-100
                change_axis(this._position, scmd)
            },
            "position": (scmd) => {
                //position x:0.01 y:++0.01 z:--0.01
                set_axis(this._position, "x", get_param(0, "x", scmd))
                set_axis(this._position, "y", get_param(1, "y", scmd))
                set_axis(this._position, "z", get_param(2, "z", scmd))
            },
            "scale": (scmd) => {
                //position x:0.01 y:++0.01 z:--0.01
                set_axis(this._scale, "x", get_param(0, "x", scmd))
                set_axis(this._scale, "y", get_param(1, "y", scmd))
                set_axis(this._scale, "z", get_param(2, "z", scmd))
            },
            "rotation": (scmd) => {
                //rotation x:0.01 y:++0.01 z:--0.01
                const x = get_param(0, "x", scmd)

                if (x) { set_axis(this._rotation, "x", x, true) }

                const y = get_param(1, "y", scmd)
                if (y) { set_axis(this._rotation, "y", y, true) }

                const z = get_param(2, "z", scmd)
                set_axis(this._rotation, "z", z, true)
            },
            "spin": (scmd) => {
                const x = get_param(0, "x", scmd)
                const x_str = (x) ? "x:++" + x : ""

                const y = get_param(0, "y", scmd)
                const y_str = (y) ? "y:++" + y : ""

                const z = get_param(0, "z", scmd)
                const z_str = (z) ? "z:++" + z : ""

                this.onframe = `rotation ${x_str} ${y_str} ${z_str}`
            },
            "stop-spin": (scmd) => {
                this.onframe = ""
            },
            "log": (scmd) => {
                console.log(this)
            },
            "rotate": (scmd) => {
                // transfer positioning control to THREE from Spell
                this._disable_frame_3d_state = true;
                this._rotation_dir = Math.PI / 2
                this.onframe = `rotate-toward dir:${this._rotation_dir}`
                this._three_obj.up = new THREE.Vector3(0, 1, 0);
                this._rotation_angle = new THREE.Vector3(1, 0, 0)
                this._quaternion = new THREE.Quaternion(1, 0, 0);
            },
            "rotate-toward": (scmd) => {
                //this._rotation.z
                console.log(this._three_obj.rotation.x - parseFloat(this._rotatation_dir))
                if (this._three_obj.rotation.x == this._rotatation_dir) {
                    this._disable_frame_3d_state = false
                    this._quaternion = null
                    this._rotation.x = this._three_obj.rotation._x
                    this._rotation.y = this._three_obj.rotation._y
                    this._rotation.z = this._three_obj.rotation._z
                    this.onframe = ""
                } else {
                    this._quaternion.setFromAxisAngle(this._rotation_angle, this._rotation_dir)
                    this._three_obj.quaternion.rotateTowards(this._quaternion, 0.1)
                }


            },
            "play": (scmd) => {
                console.log(scmd);

                if (this._animation_mixer) {
                    const clip = get_param(1, "clip", scmd)

                    if (clip) {
                        const anim = this._animation_clips[clip]
                        if (anim) {
                            if (this._current_action) {
                                this._animation_clips[this._current_action].fadeOut(this._fade_duration)
                                anim.reset().fadeIn(this._fade_duration).play();
                            } else {
                                anim.play()
                            }
                            //this._disable_frame_3d_state = true
                            this._current_action = clip
                        }
                    }
                }
            },
            "follow-joystick": (scmd) => {
                const jm = SpellData.objects["joy-move"]
                if (jm) {

                    let power = 0.25
                    let lvector = this._three_obj.position
                    let tempVector = new THREE.Vector3();
                    const upVector = new THREE.Vector3(0, 1, 0);
                    //   // move the player
                    const angle = SpellData.variables["control-azimuth"]
                    if (jm.forward > 0) {
                        tempVector.set(0, 0, -jm.forward * power).applyAxisAngle(upVector, angle)
                        lvector.addScaledVector(tempVector, 1)
                    }

                    if (jm.backward > 0) {
                        tempVector.set(0, 0, jm.backward * power).applyAxisAngle(upVector, angle)
                        lvector.addScaledVector(tempVector, 1)
                    }

                    if (jm.left > 0) {
                        tempVector.set(-jm.left * power, 0, 0).applyAxisAngle(upVector, angle)
                        lvector.addScaledVector(tempVector, 1)
                    }

                    if (jm.right > 0) {
                        tempVector.set(jm.right * power, 0, 0).applyAxisAngle(upVector, angle)
                        lvector.addScaledVector(tempVector, 1)
                    }

                    //let tv = new THREE.Vector3(this._position.x, this._position.y, this._position.z)
                    //tv.addScaledVector(lvector, 1)
                    this._position = lvector


                    this._three_obj.updateMatrixWorld()
                    //console.log("ct")
                    SpellData.objects["control-target"] = lvector
                    SpellData.objects["joystick-vector"] = lvector
                    SpellData.variables["joystick-position"] = `x:${lvector.x} y:${lvector.y} z:${lvector.z}`
                    //console.log(SpellData.variables["joystick-position"])
                    //   //controls.target.set( mesh.position.x, mesh.position.y, mesh.position.z );
                    //   // reposition camera
                    //   camera.position.sub(controls.target)
                    //   controls.target.copy(mesh.position)
                    //   camera.position.add(mesh.position)


                    // };
                }
            },
            "follow-landmark": (scmd) => {

                if(scmd.params) {
                    
                    const lm = SpellData.objects["landmarks"] 
                    if(lm) {
                        this._disable_frame_3d_state = false
                        this._position.x = lm[0]/200
                        this._position.y = lm[1]/200
                        this._position.z = lm[2]/100
                        console.log(this._position)
                    }
                }
            },
            "follow-path": (scmd) => {
                const cp = SpellData.objects["cam-path"]
                if (cp) {

                    const tangent = cp.getTangent(this._fraction);

                    if (!this._follow_axis_path) {
                        this._up = new THREE.Vector3(0, 1, 0);
                        this._follow_axis_path = new THREE.Vector3()
                    }

                    const newPosition = cp.getPoint(this._fraction);
                    this._follow_axis_path.crossVectors(this._up, tangent).normalize();
                    const radians = Math.acos(this._up.dot(tangent));
                    // console.log("radians " + radians);

                    this._three_obj.quaternion.setFromAxisAngle(this._follow_axis_path, radians);
                    // console.log(this._follow_axis_path,tangent);
                    this._fraction += 0.001;
                    if (this._fraction > 1) { this._fraction = 0 }

                    this._three_obj.updateMatrixWorld()
                    //console.log("ct")
                    SpellData.objects["cam-path-pos"] = newPosition
                    SpellData.objects["cam-path-rotation"] = this._three_obj.quaternion
                    //console.log(SpellData.variables["joystick-position"])
                    //   //controls.target.set( mesh.position.x, mesh.position.y, mesh.position.z );
                    //   // reposition camera
                    //   camera.position.sub(controls.target)
                    //   controls.target.copy(mesh.position)
                    //   camera.position.add(mesh.position)


                    // };
                }
            },
            //hover - hover up 0.1 and down 0.1 (y-axis) for 60 frames (1 sec)
            "hover": (scmd) => {
                const axis = get_param(0, "axis", scmd)
                const step = get_param(1, "step", scmd)
                const radius = get_param(2, "radius", scmd)
                scmd.params["dir"] = this._hover_move_direction
                scmd.params["axis"] = axis
                scmd.params["step"] = step
                if (!this._hovering) {
                    this._disable_frame_3d_state = false;
                    this._hovering = true
                    this._hover_start_frame = this._frame_number
                    this._hover_move_direction = "up" // 1 = up , 0 = down
                    this._hover_axis_start_value = this._position[axis]

                    this.onframe = `hover axis:${axis} dir:${this._hover_move_direction} step:${step} radius:${radius}`
                }
                else {
                    change_axis(this._position, scmd)
                    const diff = (this._position[axis] - this._hover_axis_start_value)
                    if (Math.abs(diff) > radius) {
                        this._hover_move_direction = (this._hover_move_direction == "up") ? "down" : "up"
                        this._hover_axis_start_value = this._position[axis]
                        this.onframe = `hover axis:${axis} dir:${this._hover_move_direction} step:${step} radius:${radius}`
                    }
                }


            }

        }


        if (of_ops[jcmd.op]) {
            of_ops[jcmd.op](jcmd)
        } else throw this.name + " has no op name " + jcmd.op
    }

    append(spell3d_object) {
        this._spells.push(spell3d_object);
    }


    show() {
        this.visible = true
    }

    hide() {
        this.visible = false
    }
}

export default Spell3dObject