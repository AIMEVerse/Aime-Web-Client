/**
 * SpellDashboard
 * @description spell-ui package for spell-dashboard 
 * @author Tamir Fridman <tamirf@yahoo.com>
 * @since  03/05/2022
 * @Copyright AIME Web3 Technologies 2022, all right reserved
 *
 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
 *
 */

import Spell from "../spell.js"
import SpellUtils from "../spell-utils.js";
import SpellUIObject from "./spell-ui-object.js";
import {
    SpellButton,
    SpellLabel,
    SpellView,
    SpellTextField,
    SpellWebcam
} from "./spell-core-objects.js"

export class SpellObjectManagerList extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "spell-om-list",
            _html_tag: "div",
            class: "d-flex flex-column spell-om-list",
            _title: "",
            _om: null,
            _id: "som-" + ids,
            _show_cameras: true,
            _show_lights: false
        }
        super(data, defaults);

        const title = new SpellLabel({
            _id: "som-title-" + ids,
            text: this.title,
            class: "view-title"
        })
        this.append(title)
        const accordion = new SpellView({
            _id: "som-acc-" + ids,
            class: "d-flex flex-column spell-om-acc"
        })


        if (this._om) {
            this.event_listener = document.addEventListener("spell-on-change", (event) => {
                // TO do update the ui with the changes of the event manger
                //console.log(event)
            }, false)

            const lst = this._om.spell_objects
            Object.keys(lst).forEach(key => {
                const so = lst[key]
                if (
                    (this._show_cameras && so._is_camera) ||
                    (this._show_lights && so._is_light) ||
                    (!so._is_light && !so._is_camera)) {

                    const sv = {
                        _id: "eo-" + so._id,
                        _type: "view",
                        text: so.name,
                        class: "spell-om-list-item",
                        onclick: "displayModal('" + so._id + "')"
                        // onclick: "console.log('" + so._id + "')"
                    }
                    const si = new SpellView(sv)
                    //console.log(so)
                    accordion.append(si)
                }

            })
        }

        this.append(accordion)
    }
}



export class SpellObjectManagerInventory extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "spell-om-inventory",
            _html_tag: "div",
            class: "d-flex flex-column spell-object-prop",
            _title: "",
            _om: null,
            _id: "som-" + ids,
            _show_cameras: true,
            _show_lights: false
        }
        super(data, defaults);




        const title = new SpellLabel({
            _id: "som-title-" + ids,
            text: this.title,
            class: "view-title"
        })
        this.append(title)
        const accordion = new SpellView({
            _id: "som-acc-" + ids,
            class: "d-flex flex-column spell-om-acc"
        })

        if (this._om) {
            const lst = this._om.object_classes
            Object.keys(lst).forEach(key => {
                const so = lst[key]
                if (
                    (this._show_cameras && so._is_camera) ||
                    (this._show_lights && so._is_light) ||
                    (!so._is_light && !so._is_camera)) {
                    const ssname = (so.descriptor().name) ? so.descriptor().name : so.name
                    const sv = {
                        _id: "eo-" + so._id,
                        _type: "view",
                        text: ssname,
                        class: "spell-om-list-item",
                        onclick: "add_object('" + JSON.stringify(so.descriptor()) + "')"
                    }
                    const si = new SpellView(sv)
                    accordion.append(si)
                }

            })
        }

        this.append(accordion)
    }
}


export class SpellPropsPair extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "spell-props",
            class: "d-flex flex-row sop-row",
            _id: "sop-" + ids,
            _title: "",
            _value: ""

        }
        super(data, defaults);

        const title = new SpellLabel({
            _id: "sop-lbl-" + ids,
            text: this._title,
            class: "sop-label"
        })
        this.append(title)
        const sv = {
            _id: "sop-txt-" + ids,
            _type: "text",
            value: this._value,
            class: "sop-text"
        }
        const si = new SpellTextField(sv)
        this.append(si)
    }
}




export class SpellDashboard extends SpellUIObject {
    constructor(data) {

        const ids = SpellUtils.guid()
        const defaults = {
            _type: "spell-dashboard",
            class: "spell-dashboard",
            style: "display:none",
            _id: "spell-dashboard-" + ids,
            _webcam: null

        }
        super(data, defaults);


        this.append(new SpellLabel({
            _id: "fps-label",
            _type: "label",
            _data_source: "fps",
            _format: "FPS $fps",
            style: "color:white;position:fixed;left:20px;top:20px"
        }))


        this.append(new SpellLabel({
            _id: "pos-label",
            _type: "label",
            _data_source: "joystick-position",
            style: "color:white;position:fixed;left:220px;top:20px",
        }))



        this._cam_buttom = new SpellButton({
            _id: "cam-button",
            _type: "button",
            text: "cam",
            style: "position:fixed;right:20px;top:20px;width:100px;height:100px;background-color:green"
        })

        this._webcam = new SpellWebcam({
            _id: "spell-webcam",
            _type: "webcam",
            style: "position:fixed;top:50px;left:50px;background-color:red;width:320px;height:280px;transform: scale(-1, 1);filter: FlipH;"
        })

        this.append(this._cam_buttom)
        this.append(this._webcam)

        this.append(new SpellTextField({

            _id: "spell-command",
            _type: "text",
            placeholder: "write spell here",
            value: "box rotate",
            class: "terminal-line"
        }

        ))

    }



    toggle_camera() {
        if (this._webcam.is_available()) {
            const video_elem = this._webcam.dom_element
            if (!this._webcam.is_playing) {
                //console.log(video_elem);

                this._webcam.set_source(video_elem)
                // Activate the webcam stream.
                // navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                //     video_elem.srcObject = stream;
                //     // input_video.addEventListener('loadeddata',async  () => {
                //     //     video_playing = true;

                //     //     await load_hands_model()
                //     //     //ENABLE_CAM_BUTTON.classList.add('removed');
                //     //     //detect()
                //     // });
                // });
            }
            else {                
                video_elem.pause()
            }
        } else {
            console.warn('getUserMedia() is not supported by your browser');
        }
    }



    /**
     * this method triggered after the HTML DOM object has been created and added to the parent element
     */
    async on_create() {
        //console.log("dashboard created")
        const sthis = this //strong this
        const player = $("#" + this._id)
        document.addEventListener('keydown', async (event) => {

            if (event.key.toLocaleLowerCase() == "~" && event.shiftKey) {
                event.preventDefault()
                event.stopPropagation()
                sthis._is_active = true

                player.toggle()
                if (player.is(":visible")) {
                    $("#spell-command").focus();
                }
                return

            }
            else if ((event.key == "Enter") && sthis._is_active) {
                event.preventDefault()
                event.stopPropagation()
                sthis._is_active = false
                const cmnd_line = $("#spell-command")
                const scmd = cmnd_line.val()
                if (scmd && scmd.length > 1) {
                    let res = Spell.get_module('spell3d').run(scmd)   //run from module directly
                }
                return;
            }
        }

        )
        const cam_button = this._cam_buttom.dom_element //document.getElementById("cam-button")



        cam_button.addEventListener('click', (event) => { sthis.toggle_camera() })


    }



}









export class SpellDashboardObjects {
    static get_objects() {
        return {
            "spell-om-list": SpellObjectManagerList,
            "spell-props-pair": SpellPropsPair,
            "spell-om-inventory": SpellObjectManagerInventory,
            "spell-dashboard": SpellDashboard
        }
    }
}





export default SpellDashboardObjects