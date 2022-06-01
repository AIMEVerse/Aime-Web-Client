/**
 * SpellMoveControls
 * @description spell-move-controls for 3D/2D navigation controls
 * @author Tamir Fridman <tamirf@yahoo.com>
 * @since  01/04/2022
 * @Copyright AIME Web3 Technologies 2022, all right reserved
 *
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
 *
 */

import SpellUtils from "../../spell-utils.js"
import SpellUIObject from "./../spell-ui-object.js"
import * as SpellUICoreObjects from "../spell-core-objects.js"
import SpellData from "../../spell-data.js"
import nipplejs from 'nipplejs' //NippleJS Joystick Controller



/**
 * SpellJoyStick - on-screen joystick controller 
 * based on NippleJS - https://github.com/yoannmoinet/nipplejs
 * 
 */

export class SpellJoyStick extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "joystick",
            _html_tag: "div",
            class: "spell-joystick",
            _title: "",
            _id: "som-" + ids,
            _parent_element:"spell-controls",
            _joy_manager: null,
            _joy_options: {
                size: 120,
                multitouch: true,
                maxNumberOfNipples: 1,
                mode: 'static',
                restJoystick: true,
                shape: 'circle',
                position: { bottom: '80px', left: '80px' },
                dynamicPage: true,
            }
        }
        super(data, defaults);
        


    }

    load_controls() {
        const dom_object = super.get_dom_object() //create dom element for fist time 
        if (!this._joy_manager) {
            //console.log('init js lib',this["_id"])
            this._joy_options.zone = document.getElementById(this._id) 
            //console.log(this._joy_options);
            this.joy_manager = nipplejs.create(this._joy_options);
            this.joy_manager['0'].on('move', function (evt, data) {
                const forward = data.vector.y
                const turn = data.vector.x

                const joy_move = {forward: 0,backward: 0,left: 0,right: 0}

                if (forward > 0) {
                    joy_move.forward = Math.abs(forward)
                    joy_move.backward = 0
                } else if (forward < 0) {
                    joy_move.forward = 0
                    joy_move.backward = Math.abs(forward)
                }

                if (turn > 0) {
                    joy_move.left = 0
                    joy_move.right = Math.abs(turn)
                } else if (turn < 0) {
                    joy_move.left = Math.abs(turn)
                    joy_move.right = 0
                }
                SpellData.objects["joy-move"] = joy_move
            })

            this.joy_manager['0'].on('end', function (evt) {
                const joy_move = {forward: 0,backward: 0,left: 0,right: 0}
                SpellData.objects["joy-move"] = joy_move
            })

            const sthis = this //strong this
            this._keyboard_down_listener = document.addEventListener('keydown', async (event) => {
                sthis._key_down = true
                const joy_move = {forward: 0,backward: 0,left: 0,right: 0}
                const vel = 0.3
                const pwr = (event.shiftKey) ? vel*2 : vel
                switch (event.key.toLowerCase()) {
                    case 'w':
                        joy_move.forward = pwr
                        break;
                    case 's':
                        joy_move.backward = pwr
                        break;
                    case 'a':
                        joy_move.left = pwr
                        break;
                    case 'd':
                        joy_move.right = pwr
                        break;
    
                }
                SpellData.objects["joy-move"] = joy_move
    
    
            }, false);

            this._keyboard_up_listener = document.addEventListener('keyup', async (event) => {
                if(sthis._key_down) {
                    sthis._key_down = false
                    const joy_move = {forward: 0,backward: 0,left: 0,right: 0}
                    SpellData.objects["joy-move"] = joy_move
                }
            }, false);



        }
        return dom_object
    }


}



export class SpellMoveControls {
    static get_objects() {
        return {
            "joystick": SpellJoyStick
        }
    }
}





export default SpellMoveControls